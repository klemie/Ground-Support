use std::sync::{Arc, Mutex};
use std::process::{Command, Stdio, ChildStdout};
use std::io::{self, BufReader, BufRead};
use crate::state::State;
use std::io::Read;
use std::io::prelude::*;
use std::string::FromUtf8Error;
use std::thread::spawn;
use std::collections::HashMap;

use crate::data::DataPacket;

use std::time::Duration;
use std::thread::sleep;

/// Takes one line of a packet as a Vec<u8>
/// Updates the state with information in that line
async fn extract_packets(state_ref: Arc<Mutex<State>>, received_line: Vec<u8>) {
    let line = String::from_utf8_lossy(&received_line);
    let words: Vec<&str> = line.split_whitespace().collect();

    // Extract the callsign
    let callsign = if let Some(pos) = words.iter().position(|&word| word.contains("audio")) {
        words.get(pos - 1).unwrap_or(&"").split('>').next().unwrap_or("")
    } else {
        ""
    };

    // Search for the word "alt" in the words
    if let Some(alt_index) = words.iter().position(|&word| word == "alt") {
        // Extract numbers after "alt" until a non-number is hit
        let mut altitude = String::new();
        for word in &words[(alt_index + 1)..] {
            if let Some(_) = word.chars().next().unwrap().to_digit(10) {
                altitude.push_str(word);
                altitude.push(' ');
            } else {
                break;
            }
        }

        // Extract latitude and longitude values after 'N' and 'W'
        let mut latitude = String::new();
        let mut longitude = String::new();
        if let Some(n_index) = words.iter().position(|&word| word.ends_with('N')) {
            latitude = words.get(n_index).unwrap_or(&"").trim_end_matches('N').to_string();
        }
        if let Some(w_index) = words.iter().position(|&word| word.ends_with('W')) {
            longitude = words.get(w_index).unwrap_or(&"").trim_end_matches('W').to_string();
        }

        let mut packet_data: HashMap<String, String> = HashMap::new();
        packet_data.insert("callsign".to_string(), callsign.to_string());
        packet_data.insert("altitude".to_string(), altitude.trim().to_string());
        packet_data.insert("latitude".to_string(), latitude.clone());
        packet_data.insert("longitude".to_string(), longitude.clone());

        let packet_id: u64 = match state_ref.lock().unwrap().last_packet_id {
            Some(id) => id.checked_add(1).unwrap_or(1), // Add 1 if possible, otherwise set to 1
            None => 1, // If None, set to 1
        };

        let packet = DataPacket {
            id: packet_id,
            data: packet_data,
        };
        state_ref.lock().unwrap().append_packet(packet);

        println!("Callsign: {}", callsign);
        println!("Altitude: {}", altitude.trim());
        println!("Latitude: {}", latitude);
        println!("Longitude: {}", longitude);
    } else {
        // prints here and above are for logging
        println!("{}", line);
    }
}
/// starts telemetry by calling decode.sh which in turn calls linux direwolf and rtl_fm binaries
///
/// calls extract_packets when new data received from rocket
pub async fn start_telemetry(state_ref: Arc<Mutex<State>>) -> io::Result<()> {
    let frequency = state_ref.lock().unwrap().frequency;
    println!("Starting telemetry on {}", frequency);

    let mut decode_aprs = Command::new("sh")
        .arg("./tools/decode_test.sh")
        // .arg(frequency.to_string())
        .stdout(Stdio::piped())
        .spawn()
        .expect("failed to start decoder");
    
    let mut child_out = BufReader::new(decode_aprs.stdout.as_mut().unwrap());
    let mut readbuf = vec![0; 256];

    loop {
        // read() blocks until data is available. This makes this not polling.
        let mut b = child_out.read(&mut readbuf);
        extract_packets(Arc::clone(&state_ref), readbuf.clone()).await;
    }
    Ok(())
}

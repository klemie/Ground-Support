use std::sync::{Arc, Mutex};
use std::process::{Command, Stdio, ChildStdout};
use std::io::{self, BufReader, BufRead};
use crate::state::State;
use std::io::Read;
use std::io::prelude::*;
use std::string::FromUtf8Error;
use std::thread::spawn;
use std::collections::HashMap;
use regex::Regex;
use std::str;

use crate::data::DataPacket;

use std::time::Duration;
use std::thread::sleep;

/// Takes one line of a packet as a Vec<u8>
/// Updates the state with information in that line
async fn extract_packets(state_ref: Arc<Mutex<State>>, received_line: Vec<u8>) {
    let data = match str::from_utf8(&received_line) {
        Ok(v) => v,
        Err(e) => panic!("Invalid UTF-8: {}", e)
    };

    let callsign_regex = Regex::new(r"([A-Z0-9]+)-\d").unwrap();
    let lat_long_regex = Regex::new(r"(\d{4}\.\d{2}N)/(\d{5}\.\d{2}W)").unwrap();
    let altitude_regex = Regex::new(r"/A=(\d{6})\*").unwrap();
    if let Some(callsign_caps) = callsign_regex.captures(data) {
        let callsign = &callsign_caps[1];
        println!("Callsign: {}", callsign);
    } else {
        println!("Failed to get callsign");
    }

    // Extract the latitude and longitude
    if let Some(lat_long_caps) = lat_long_regex.captures(data) {
        let latitude = &lat_long_caps[1];
        let longitude = &lat_long_caps[2];
        println!("Latitude: {}", latitude);
        println!("Longitude: {}", longitude);
    } else {
        println!("failed to get lat long")
    }

    // Extract the altitude
    if let Some(altitude_caps) = altitude_regex.captures(data) {
        let altitude = &altitude_caps[1];
        println!("Altitude: {}", altitude);
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
        let mut bytes_read = child_out.read(&mut readbuf);
        match bytes_read {
            Ok(value) => {
                let int_bytes_read: i32 = value as i32;
                if (int_bytes_read > 0) {
                    extract_packets(Arc::clone(&state_ref), readbuf.clone()).await;
                }
            }
            Err(e) => {
                println!("An error occurred: {}", e);
            }
        }
    }
    Ok(())
}

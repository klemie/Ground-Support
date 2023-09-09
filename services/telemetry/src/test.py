import sys
import time

def process_data(data):
    # Your data processing logic here
    for line in data:
        print("Received data:", line)
        print("Processing data...")
        # Simulate processing time
        time.sleep(1)  # Simulate processing for 1 second
        print("Data processing complete!")

def main():
    data = []
    try:
        while True:
            line = sys.stdin.readline().strip()
            if not line:
                if data:
                    process_data(data)
                    data = []
            else:
                data.append(line)
    except KeyboardInterrupt:
        pass  # Handle Ctrl+C gracefully

if __name__ == "__main__":
    main()
import json
import time

import rpi_rf_receive
from firebaseService import FirebaseService


def main():
    service = FirebaseService()
    with open("config.json", "r") as f:
        data = json.load(f)
    rfdevice = rpi_rf_receive.get_rf_device()
    rfdevice.enable_rx()
    timestamp = None
    while True:
        if rfdevice.rx_code_timestamp != timestamp:
            timestamp = rfdevice.rx_code_timestamp
            if rfdevice.rx_code == data['rf_code']:
                print("Signal received")
                service.send_to_topic()
        time.sleep(0.01)
    # rfdevice.cleanup()


if __name__ == "__main__":
    main()

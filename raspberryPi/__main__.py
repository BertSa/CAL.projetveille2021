import json
import time

import rpi_rf_receive


def main():
    f = open("config.json", "r")
    data = json.load(f)
    rfdevice = rpi_rf_receive.get_rf_device()
    rfdevice.enable_rx()
    timestamp = None
    while True:
        if rfdevice.rx_code_timestamp != timestamp:
            timestamp = rfdevice.rx_code_timestamp
            if rfdevice.rx_code == data['rf_code2']:
                print("Signal received")
        time.sleep(0.01)
    # rfdevice.cleanup()
    # f.close


if __name__ == "__main__":
    main()

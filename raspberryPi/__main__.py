import time
import json
import rpi_rf_receive


def main():
    f = open("config.json", "r")
    data = json.load(f)
    print(data)

    print(data['ddd'])

    rfdevice = rpi_rf_receive.get_rf_device()
    rfdevice.enable_rx()
    timestamp = None
    while True:
        if rfdevice.rx_code_timestamp != timestamp:
            timestamp = rfdevice.rx_code_timestamp
            if rfdevice.rx_code == 5592334:
                print("Signal received")
        time.sleep(0.01)
    # rfdevice.cleanup()
    f.close


if __name__ == "__main__":
    main()

import json
import time

import rpi_rf_receive
from firebaseService import FirebaseService
import rpi_rf_send


def main():
    service = FirebaseService()
    with open("config.json", "r") as f:
        data = json.load(f)

    def my_listener(event):
        print(event.event_type)  # can be 'put' or 'patch'
        print(event.path)
        print(event.data)
        if event.data:
            rpi_rf_send.sendSignal(data['rf_code_send'])
        else:
            rpi_rf_send.sendSignal(data['rf_code_send2'])

    service.startListener(my_listener)
    rfdevice = rpi_rf_receive.get_rf_device()
    rfdevice.enable_rx()
    print("poui")
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

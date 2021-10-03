#!/usr/bin/python3
import json
import time
import threading

from firebaseService import FirebaseService
from rpi_rf_send import MyRf


def main():
    service = FirebaseService()
    myrf = MyRf()
    receive_device = myrf.get_rfdevice_receive()
    with open("config.json", "r") as f:
        data = json.load(f)

    def my_listener(event):
        print(event.event_type)  # can be 'put' or 'patch'
        print(event.path)
        print(event.data)
        if event.data:
            myrf.send_signal(data['rf_code_send'])
        else:
            myrf.send_signal(data['rf_code_send2'])

    def my_thread():
        timestamp = None
        while True:
            if receive_device.rx_code_timestamp != timestamp:
                timestamp = receive_device.rx_code_timestamp
                if receive_device.rx_code == data['rf_code']:
                    print("Signal received")
                    service.send_to_topic()
            time.sleep(0.01)

    t1 = threading.Thread(target=my_thread)
    t1.start()
    service.startListener(my_listener)

    print("poui")

    # rfdevice.cleanup()


if __name__ == "__main__":
    main()

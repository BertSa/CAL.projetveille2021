import json
import time

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

    service.startListener(my_listener)

    print("poui")
    timestamp = None
    while True:
        if receive_device.rx_code_timestamp != timestamp:
            timestamp = receive_device.rx_code_timestamp
            if receive_device.rx_code == data['rf_code']:
                print("Signal received")
                service.send_to_topic()
        time.sleep(0.01)
    # rfdevice.cleanup()


if __name__ == "__main__":
    main()

#!/usr/bin/python3
import threading
import time

from conf import config
from firebaseService import FirebaseService, FirebaseMessagingData
from custom_rpi_rf import CustomRpiRf


def main():
    service = FirebaseService()
    myrf = CustomRpiRf()
    receive_device = myrf.get_rfdevice_receive()

    def my_listener(event):
        print(event.event_type)  # can be 'put' or 'patch'
        print(event.path)
        print(event.data)
        rf_code_water_leak = config.rf_codes['water_leak']
        if event.data:
            myrf.send_signal(rf_code_water_leak['valve_on'])
        else:
            myrf.send_signal(rf_code_water_leak['valve_off'])

    def my_thread():
        timestamp = None
        while True:
            if receive_device.rx_code_timestamp != timestamp:
                timestamp = receive_device.rx_code_timestamp
                if receive_device.rx_code == config.rf_codes['water_leak']['valve_off']:
                    print("Signal received")
                    service.send_to_topic(FirebaseMessagingData(
                        channel_id=config.firebase['channel_ids']["water_leak"],
                        title='Oops!',
                        text='Water leak detected!'))
                    service.setValve(False)
                    time.sleep(0.5)

                    t1 = threading.Thread(target=my_thread)
                    t1.start()
                    service.startListenerValve(my_listener)


if __name__ == "__main__":
    main()

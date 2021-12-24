#!/usr/bin/python3
from rpi_rf import RFDevice


class CustomRpiRf:
    def __init__(self):
        self.rfdevice_send = RFDevice(17)
        self.rfdevice_send.enable_tx()
        self.rfdevice_send.tx_repeat = 10

        self.rfdevice_receive = RFDevice(27)
        self.rfdevice_receive.enable_rx()

    def get_rfdevice_receive(self):
        return self.rfdevice_receive

    def send_signal(self, code):
        self.rfdevice_send.tx_code(code, 1, 350, 24)

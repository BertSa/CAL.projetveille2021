#!/usr/bin/env python3
# Original credit: https://github.com/milaq/rpi-rf
# Copyright (c) 2016 Suat Özgür, Micha LaQua
import argparse
import logging

from rpi_rf import RFDevice

rfdevice = RFDevice(17)
rfdevice.enable_tx()
rfdevice.tx_repeat = 10


def sendSignal(code):
    rfdevice.tx_code(code, 1, 350, 24)
    rfdevice.cleanup()


if __name__ == "__main__":
    sendSignal(6125504)

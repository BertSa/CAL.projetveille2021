#!/usr/bin/env python3
# Original credit: https://github.com/milaq/rpi-rf
# Copyright (c) 2021 Samuel Bertrand
import argparse
import signal
import sys
import time

from rpi_rf import RFDevice

parser = argparse.ArgumentParser(description='Receives a decimal code via a 433/315MHz GPIO device')
parser.add_argument('-g', dest='gpio', type=int, default=27,
                    help="GPIO pin (Default: 27)")
args = parser.parse_args()

rfdevice = RFDevice(args.gpio)
rfdevice.enable_rx()
timestamp = None
logging.info("Listening for codes on GPIO " + str(args.gpio))
while True:
    if rfdevice.rx_code_timestamp != timestamp:
        timestamp = rfdevice.rx_code_timestamp
        if rfdevice.rx_code == 5592334:
            print("Signal received")
    time.sleep(0.01)
# rfdevice.cleanup()
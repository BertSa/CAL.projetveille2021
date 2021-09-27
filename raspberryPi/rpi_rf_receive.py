#!/usr/bin/env python3
# Original credit: https://github.com/milaq/rpi-rf
# Copyright (c) 2016 Suat Özgür, Micha LaQua
import argparse
import logging
import time

from rpi_rf import RFDevice

parser = argparse.ArgumentParser(description='Receives a decimal code via a 433/315MHz GPIO device')
parser.add_argument('-g', dest='gpio', type=int, default=27,
                    help="GPIO pin (Default: 27)")
args = parser.parse_args()

print("Listening for codes on GPIO " + str(args.gpio))
rfdevice = RFDevice(args.gpio)


def get_rf_device():
    return rfdevice

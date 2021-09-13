import time

import rpi_rf_receive

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

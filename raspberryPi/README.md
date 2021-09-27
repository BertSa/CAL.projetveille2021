## Installation

### Libraries

#### rpi_rf

If pip isn't already installed:`apt-get install python3-pip`

Install [rpi_rf](https://github.com/milaq/rpi-rf):

```
pip install rpi-rf
```
Install [Firebase](https://github.com/milaq/rpi-rf):
```
pip install firebase-admin
```
You will need to generate a new private key in your firebase project for this you need to open Setting > Service Accounts then click Generate New Private Key. Now that you have your new key you need to set it as an environement variable. For this you will need to enter this command:
```
```
```
                       RPI GPIO HEADER
                              _____________
                          ____|__         |
                         |    |  |        |
                       01|  . x  |02      |
                         |  . .  |        |     RX
                         |  . .  |        |   ________
                         |  . .  |        |  |        |
        TX               |  . .  |        |__|VCC     |
     _______             |  ._.__|______     |        |
    |       |            |  x x_ |     |_____|DATA    |
    |    GND|            |  . .|_|__         |        |
    |       |            |  . .  | |         |        |
    |    VCC|            |  . .  | |         |        |
    |       |            |  . .  | |_________|GND     |
    |   DATA|            |  . .  |           |________|
    |_______|            |  . .  |
                         |  . .  |
                         |  . .  |
                         |  . .  |
                         |  . .  |
                         |  . .  |
                         |  . .  |
                       39|  . .  |40
                         |_______|
```

TX:
GND > PIN XX (GND)
VCC > PIN XX (5V)
DATA > PIN XX (GPIO17)

RX:

- VCC > PIN 02 (5V)
- DATA > PIN 13 (GPIO27)
- GND > PIN 14 (GND)

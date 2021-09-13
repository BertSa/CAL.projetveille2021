## Installation
### Libraries
#### rpi_rf
If pip isn't already installed:`apt-get install python3-pip`

Install [rpi_rf](https://github.com/milaq/rpi-rf):
```
pip3 install rpi-rf
```
```
                       RPI GPIO HEADER
                              _____________
                          ____|__         |
                         |    |  |        |
                       01|  . x  |02      |
                         |  . x  |        |     RX
                         |  . x__|______  |   ________
                         |  . .  |      | |  |        |
        TX           ____|__x .  |      | |__|VCC     |
     _______        |  __|__x .  |      |    |        |
    |       |       | |  |  x____|______|____|DATA    |
    |    GND|_______| |  |  . .  |      |    |        |
    |       |         |  |  . .  |      |    |        |
    |    VCC|         |  |  . .  |      |    |        |
    |       |         |  |  . .  |      |____|GND     |
    |   DATA|_________|  |  . .  |           |________|
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
|        | Pins           | Cool  |
| ------------- |:-------------:| -----:|
| TX    | right-aligned | $1600 |
| ----- |:-------------:| -----:| -----:|
|       | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
TX:
GND > PIN 09 (GND)
VCC > PIN 02 (5V)
DATA > PIN 11 (GPIO17)

RX:
VCC > PIN 04 (5V)
DATA > PIN 13 (GPIO27)
GND > PIN 06 (GND)
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

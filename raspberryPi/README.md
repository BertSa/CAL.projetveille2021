# Water Leak BackEnd
This part of the project serve to send notification to the topic `leak` of your firebase app when there's a water leak.
## Installation

### Libraries

#### rpi_rf

If pip isn't already installed:`apt-get install python3-pip`

Install [rpi_rf](https://github.com/milaq/rpi-rf):

```
pip install rpi-rf
```
#### Firebase Admin (Python)
Install [firebase-admin](https://github.com/firebase/firebase-admin-python):
```
pip install firebase-admin
```
You will need to generate a new private key in your firebase project for this you need to open Setting > Service Accounts then click Generate New Private Key. 
Now you will paste the file in the project.Then rename the file for `GOOGLE_APPLICATION_CREDENTIALS.json`
### Raspberry Pi
For this project I'm using a Raspberry Pi 4 MobelB+. As long as you use the same GPI0 you wont have any change to do.
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

[comment]: <> (TX:)

[comment]: <> (GND > PIN XX &#40;GND&#41;)

[comment]: <> (VCC > PIN XX &#40;5V&#41;)

[comment]: <> (DATA > PIN XX &#40;GPIO17&#41;)

RX:

- VCC > PIN 02 (5V)
- DATA > PIN 13 (GPIO27)
- GND > PIN 14 (GND)

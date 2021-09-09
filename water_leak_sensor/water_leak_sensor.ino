#include <RCSwitch.h>
RCSwitch mySwitch = RCSwitch();

const byte buzzer1 = 0;
const byte buzzer2 = 1;
const byte statLED = 4;
const byte waterSensor = A1;

int waterAvg = 0;
int maxDifference = 100;


void setup()
{
  pinMode(buzzer1, OUTPUT);
  pinMode(buzzer2, OUTPUT);
  pinMode(statLED, OUTPUT);

  pinMode(2, INPUT); //When setting the pin mode we have to use 2 instead of A1
  digitalWrite(2, HIGH); //Hack for getting around INPUT_PULLUP
  mySwitch.setProtocol(1);
  mySwitch.setPulseLength(300);
  mySwitch.enableTransmit(3);
  waterAvg = 0;
  for (int x = 0 ; x < 8 ; x++)
  {
    waterAvg += analogRead(waterSensor);
    delay(550);
  }
  waterAvg /= 8;

  buzz();
  delay(100);
  buzz();

  digitalWrite(buzzer1, LOW);
  digitalWrite(buzzer2, LOW);
  digitalWrite(statLED, LOW);

}

void loop()
{
  int waterDifference = abs(analogRead(waterSensor) - waterAvg);

  if (waterDifference > maxDifference)
  {
    long startTime = millis();
    long timeSinceSignalSend = millis();

    do
    {
      if ((millis() % 2000 == 0))
        buzz();
      if (millis() - timeSinceSignalSend > 5000)
      {
        timeSinceSignalSend = millis();
        digitalWrite(statLED, HIGH);
        mySwitch.send(5592334, 24);
        digitalWrite(statLED, LOW);
      }
      waterDifference = abs(analogRead(waterSensor) - waterAvg);
    } while (waterDifference > maxDifference || (millis() - startTime) < 2000)

      digitalWrite(buzzer1, LOW);
    digitalWrite(buzzer2, LOW);

  }


}

void buzz(void)
{
  for (byte x = 250 ; x > 80 ; x--)
  {
    for (byte y = 0 ; y < 3 ; y++)
    {
      digitalWrite(buzzer2, HIGH);
      digitalWrite(buzzer1, LOW);
      delayMicroseconds(x);

      digitalWrite(buzzer2, LOW);
      digitalWrite(buzzer1, HIGH);
      delayMicroseconds(x);
    }
  }
}

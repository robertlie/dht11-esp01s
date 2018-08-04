# Send DHT11 sensor data using ESP-01S ESP8266 and MQTT to IOTA Tangle using Masked Authenticated Messaging (MAM)

This is a tutorial how to send DHT11 sensor data using ESP-01S ESP8266, MQTT and Raspberry Pi 3 to IOTA Tangle using Masked Authenticated Messaging (MAM).

## Requirements

All hardware requirements and how to wire the ESP-01S (ESP8266) is explained at:  
[https://www.mobilefish.com/developer/iota/iota\_quickguide\_esp01s\_mam.html][1]

[1]: https://www.mobilefish.com/developer/iota/iota_quickguide_esp01s_mam.html "Mobilefish.com"
[2]: https://youtu.be/qZg-3OTrMKE "YouTube video"
[3]: https://www.esp8266.com/wiki/doku.php
[4]: https://www.esp8266.com/wiki/doku.php?id=esp8266-module-family
[5]: http://wiki.ai-thinker.com/_media/esp8266/esp8266_module_list.png
[6]: https://www.espressif.com/sites/default/files/documentation/4a-esp8266_at_instruction_set_en.pdf
[7]: http://wiki.aprbrother.com/en/Firmware_For_ESP8266.html
[8]: http://wiki.ai-thinker.com/_media/esp8266/esp8266_series_modules_user_manual_v1.1.pdf

![alt text](https://www.mobilefish.com/images/developer/esp01s_ftdi_dht11.jpg "DHT11 sensor connected to Raspberry Pi 3")

## Documents

More information about the ESP-01S can be found at:  
[https://www.esp8266.com/wiki/doku.php][3]<br/>
[https://www.esp8266.com/wiki/doku.php?id=esp8266-module-family][4]<br/>
[http://wiki.ai-thinker.com/\_media/esp8266/esp8266\_module\_list.png][5]<br/>
[http://wiki.ai-thinker.com/\_media/esp8266/esp8266\_series\_modules\_user\_manual\_v1.1.pdf][8]<br/>
[https://www.espressif.com/sites/default/files/documentation/4a-esp8266\_at\_instruction\_set\_en.pdf][6]<br/>

## ESP8266 firmware
The ESP8266 firmware can be found at this location:
[http://wiki.aprbrother.com/en/Firmware\_For\_ESP8266.html][7]

Note: A copy of this firmware ai-thinker-0.9.5.2.bin (115000 baud) is also stored in this project.


## Features

The project consists of multiple Arduino sketches and NodeJS files.<br/>
The most important files are:<br/>

- DHT\_mqtt2.ino: This sketch is uploaded to the ESP-01s module which reads the DHT11 sensor data and publishes it to the MQTT broker running on a Raspberry Pi 3.  

- dht\_mqtt\_mam.js: This NodeJS file subscribes to a MQTT topic and reads the published DHT11 sensor data. This data is processed and published to the Tangle using MAM.

- mam\_receive.js: Extract the stored data from the Tangle using MAM and display the data.

## Installation

```
npm install
```

## Usage

How to use the scripts see:  
[https://www.mobilefish.com/developer/iota/iota\_quickguide\_esp01s\_mam.html][1]

or watch this YouTube video:
[https://youtu.be/qZg-3OTrMKE][2]


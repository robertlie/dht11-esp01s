/*
Author: Robert Lie (mobilefish.com)

A DHT11 sensor module is connected to the ESP-01S module.
The sketch DHT_mqtt2.ino is uploaded to the ESP-01S.
The dht_mqtt.js file reads DHT11 sensor data (temperature and humidity) and displays it on the console.

Usage:
1)  Change the DHT11_TOPIC, BROKER_URL, MQTT username and password according to your situation.
2)  Do not forget to type: npm install
3)  Start the app: node dht_mqtt.js

More information:
https://www.mobilefish.com/developer/iota/iota_quickguide_esp01s_mam.html
*/

const mqtt = require('mqtt');
const moment = require('moment');

const DHT11_TOPIC = "sensor/dht11";

const BROKER_URL = "mqtt://192.168.1.70";

const options = {
    port: 1883,
    clientId: 'dht_mqtt.js',
    username: 'Your_MQTT_Username',
    password: 'Your_MQTT_Password'
    //keepalive: 1000,
    //reconnectPeriod: 1000,
    //protocolId: 'MQIsdp',
    //protocolVersion: 3,
    //clean: false,
    //encoding: 'utf8'
};

const client = mqtt.connect(BROKER_URL, options);

client.on("connect", onConnected);
client.on("message", onMessageReceived)

function onConnected() {
    client.subscribe(DHT11_TOPIC);
}

function onMessageReceived(topic, message) {
    if (topic == DHT11_TOPIC) {
        const dateTime = moment().utc().format('DD/MM/YYYY hh:mm:ss');
        console.log(`${dateTime}, ${message}`);
    }
}

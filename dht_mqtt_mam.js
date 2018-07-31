/*
Author: Robert Lie (mobilefish.com)

A DHT11 sensor module is connected to the ESP-01S module.
The sketch DHT_mqtt2.ino is uploaded to the ESP-01S.
The dht_mqtt_mam.js file publishes DHT11 sensor data (temperature and humidity) on the tangle using MAM.
The interval in which the sensor data is stored in the Tangle is set in the DHT_mqtt2.ino file (see MEASUREMENT_TIMEINTERVAL).

The published data can be viewed using the mam_receive.js file or
https://www.mobilefish.com/services/cryptocurrency/mam.html (Select option: Data receiver)

Usage:
1)  Do not forget to type: npm install
2)  You can change the default settings: MODE, SIDEKEY OR SECURITYLEVEL
    If you do, make the same changes in mam_receive.js file.
3)  Change the DHT11_TOPIC, BROKER_URL, MQTT username and password according to your situation.
4)  Start the app: node dht_mqtt_mam.js

More information:
https://www.mobilefish.com/developer/iota/iota_quickguide_esp01s_mam.html
*/

const mqtt = require('mqtt');
const moment = require('moment');
const Mam = require('./lib/mam.client.js');
const IOTA = require('iota.lib.js');

const MODE = 'restricted';  // public, private or restricted
const SIDEKEY = 'mysecret'; // Enter only ASCII characters. Used only in restricted mode
const SECURITYLEVEL = 3; // 1, 2 or 3

const DHT11_TOPIC = "sensor/dht11";

const BROKER_URL = "mqtt://192.168.1.70";

const options = {
    port: 1883,
    clientId: 'dht_mqtt.js',
    username: 'Your_MQTT_Username',
    password: 'Your_MQTT_Password'
    //keepalive: 60,
    //reconnectPeriod: 1000,
    //protocolId: 'MQIsdp',
    //protocolVersion: 3,
    //clean: true,
    //encoding: 'utf8'
};

const iota = new IOTA({ provider: 'https://nodes.testnet.iota.org:443' });

// Initialise MAM State
let mamState = Mam.init(iota, undefined, SECURITYLEVEL);

// Set channel mode
if (MODE == 'restricted') {
    const key = iota.utils.toTrytes(SIDEKEY);
    mamState = Mam.changeMode(mamState, MODE, key);
} else {
    mamState = Mam.changeMode(mamState, MODE);
}

// Publish to tangle
const publish = async function(packet) {
    // Create MAM Payload
    const trytes = iota.utils.toTrytes(JSON.stringify(packet));
    const message = Mam.create(mamState, trytes);

    // Save new mamState
    mamState = message.state;
    console.log('Root: ', message.root);
    console.log('Address: ', message.address);

    // Attach the payload.
    await Mam.attach(message.payload, message.address);

    return message.root;
}

const client = mqtt.connect(BROKER_URL, options);

client.on("connect", onConnected);
client.on("message", onMessageReceived)

function onConnected() {
    client.subscribe(DHT11_TOPIC);
}

async function onMessageReceived(topic, message) {
    if (topic == DHT11_TOPIC) {
        const dateTime = moment().utc().format('DD/MM/YYYY hh:mm:ss');
        const data = `{${message}}`;
        const json = {"data": data, "dateTime": dateTime};

        const root = await publish(json);
        console.log(`dateTime: ${json.dateTime}, data: ${json.data}, root: ${root}`);
    }
}

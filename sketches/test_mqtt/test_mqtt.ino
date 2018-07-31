#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char* wifi_ssid = "Your_WIFI_SSID";
const char* wifi_password = "Your_WIFI_PASSWORD";

const char* mqtt_server = "192.168.1.70";
const int mqtt_port = 1883;
const char* mqtt_user = "Your_MQTT_Username";
const char* mqtt_password = "Your_WIFI_PASSWORD";

#define sensor_topic "sensor/test"
#define message "Hello World"

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
    Serial.begin(115200);
    WiFi.begin(wifi_ssid, wifi_password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.println("Connecting to WiFi..");
    }
    Serial.println("Connected to the WiFi network");

    client.setServer(mqtt_server, mqtt_port);
    client.setCallback(callback);

    while (!client.connected()) {
        Serial.println("Connecting to MQTT...");

        if (client.connect("ESP8266Client", mqtt_user, mqtt_password)) {
            Serial.println("connected");
        } else {
            Serial.print("failed with state ");
            Serial.print(client.state());
            delay(2000);
        }
    }

    client.publish(sensor_topic, message);
    client.subscribe(sensor_topic);
}

void callback(char* topic, byte* payload, unsigned int length) {
    Serial.print("Message arrived in topic: ");
    Serial.println(topic);

    Serial.print("Message:");
    for (int i = 0; i < length; i++) {
        Serial.print((char)payload[i]);
    }

    Serial.println();
    Serial.println("-----------------------");
}

void loop() {
    client.loop();
}

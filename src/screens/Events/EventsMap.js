// Setup
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

// Vendor
import MapView, { Callout, Marker } from "react-native-maps";
import { Toast } from "native-base";

// Redadalertas
import orgApi from "utils/orgApi";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

export default class EventsMap extends Component {
  static navigationOptions = () => ({ title: "Event Map" });

  state = { events: [] };

  async componentDidMount() {
    try {
      const response = await orgApi.get("/events");
      this.setState({ events: response.data }, () => {
        const { events } = this.state;
        // setTimeout(this.map.fitToSuppliedMarkers(events.map(event => event.id)), 1000);
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        buttonText: "OK",
        text: "Error rendering map.",
        type: "danger"
      });
    }
  }

  render() {
    const { events } = this.state;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          ref={ref => {
            this.map = ref;
          }}
          region={{
            latitude: 37.7620375,
            longitude: -122.4369478,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}
        >
          {events.map(event => {
            console.log("EventsMap event: ", event);
            const { location } = event;
            const latitude = parseFloat(location.latitude);
            const longitude = parseFloat(location.longitude);
            let address2 = location.address_2 ? (<Text>{location.address_2}</Text>) : <></>;

            return (
              <Marker
                coordinate={{ latitude, longitude }}
                identifier={event.id}
                key={event.id}
              >
                <Callout>
                  <View>
                    <Text>{event.description || 'Test'}</Text>
                    <Text>{location.address_1}</Text>
                    {address2}
                  </View>
                </Callout>
              </Marker>
            );
          })}
        </MapView>
      </View>
    );
  }
}

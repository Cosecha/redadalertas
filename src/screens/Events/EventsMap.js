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
        this.map.fitToSuppliedMarkers(events.map(event => event.id));
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        buttonText: "OK",
        text: "An error occurred.",
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
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}
        >
          {events.map(event => {
            console.log(event);
            const { location } = event;
            const { latitude, longitude } = location;

            return (
              <Marker
                coordinate={{ latitude, longitude }}
                identifier={event.id}
                key={event.id}
              >
                <Callout>
                  <View>
                    <Text>Hi</Text>
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

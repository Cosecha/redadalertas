// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

// Vendor
import MapView from "react-native-maps";

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

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}
        />
      </View>
    );
  }
}

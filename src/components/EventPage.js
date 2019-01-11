// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

// Vendor
import { Button, Text } from "native-base";

// Redadalertas
import { colors } from "styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    color: "#000000"
  }
});

export default class EventPage extends Component {
  static navigationOptions = () => ({ title: "Event Page" });
  state = {
    event: this.props.navigation.state.params.event
  };

  render() {
    const { event } = this.state;
    const { location } = event;
    return (
      <View style={styles.container}>
        <Text>{location.description}</Text>
        <Text>{location.address_1}</Text>
        <Text>{location.city}</Text>
        <Text>{location.state}</Text>
        <Text>{location.zipcode}</Text>
      </View>
    );
  }
}

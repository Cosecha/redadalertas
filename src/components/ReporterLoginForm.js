// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

// Vendor
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

export default class ReporterLoginForm extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <FormLabel>EMAIL</FormLabel>
        <FormInput onChangeText={() => {}} />
        <FormLabel>PASSWORD</FormLabel>
        <FormInput onChangeText={() => {}} />
        <Button
          onPress={() => navigation.navigate("ReportForm")}
          title="Sign In"
        />
      </View>
    );
  }
}

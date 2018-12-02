// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

// Vendor
import { Button, Text } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

export default class ReportForm extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Button
          borderRadius={5}
          onPress={() => navigation.navigate("ReporterLoginForm")}
          title="Sign Out"
        />
      </View>
    );
  }
}

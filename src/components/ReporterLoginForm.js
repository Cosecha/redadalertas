// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

// Vendor
import { Button, Text } from "native-base";

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
        <Button onPress={() => navigation.navigate("ReportForm")}>
          <Text>Sign In</Text>
        </Button>
      </View>
    );
  }
}

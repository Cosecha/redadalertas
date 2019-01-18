// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

// Vendor
import {
  Container, Header, Content, H1, H2, H3, Button, Text,
} from 'native-base';

// Redadalertas
import { colors } from "styles";

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#F5FCFF",
    color: "#000000"
  },
  content: {
    padding: 20
  }
});

const types = [
  { label: "Raid", value: "sweep" },
  { label: "Individual", value: "targeted" },
  { label: "Traffic Stop", value: "traffic" },
  { label: "I-9 Audit", value: "i9" },
  { label: "Checkpoint", value: "checkpoint" },
  { label: "Action", value: "action" },
  { label: "False Alarm", value: "falsealarm" },
  { label: "Other", value: "other" },
];

export default class EventPage extends Component {

  render() {
    return (
      <View style={styles.view}>
        <Container>
          <Content style={styles.content}>
            <Text>Event Edit Page</Text>
          </Content>
        </Container>
      </View>
    );
  }
}

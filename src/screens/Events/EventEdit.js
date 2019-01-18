// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

// Vendor
import {
  Container, Header, Body, Title, Content, H1, H2, H3, Button, Text,
} from 'native-base';

// Redadalertas
import { colors } from "styles";
import eventServices from "services/event";
import EventForm from "components/EventForm";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
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

export default class EventEdit extends Component {
  static navigationOptions = () => ({ title: "Edit Event" });

  render() {
    const { navigation } = this.props;
    const { event } = navigation.state.params || null;
    return (
      <Container style={styles.container}>
        <Content>
          <EventForm
            eventToEdit={event}
            nav={navigation}
            newEvent={false}
          />
        </Content>
      </Container>
    );
  }
}

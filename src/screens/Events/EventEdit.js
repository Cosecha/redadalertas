// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

// Vendor
import {
  Container, Header, Body, Title, Content, H1, H2, H3, Button, Text,
} from 'native-base';

// Redadalertas
import { colors } from "styles";
import EventForm from "components/EventForm";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

export default class EventEdit extends Component {
  static navigationOptions = ({screenProps}) => ({
    title: screenProps.translate("event.edit")
  });

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

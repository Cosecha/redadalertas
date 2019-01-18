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
  static navigationOptions = () => ({ title: "Event Page" });
  state = {
    event: this.props.navigation.state.params.event
  };

  getEventLabel(eventType) {
    return types.find((type)=> {
      return type.value == eventType;
    }).label;
  }

  render() {
    const { event } = this.state;
    const { location } = event;
    const agencies = event.present && event.present.length > 0 ? (
      <View>
        <Text style={{paddingTop: 15, color: "gray"}}>Agencies:</Text>
        <Text>{event.present.map((item)=> {return item.agency}).join(", ")}</Text>
      </View>
    ) : <></>

    return (
      <View style={styles.view}>
        <Container>
          <Content style={styles.content}>
            <H1 style={{paddingBottom: 15}}>{this.getEventLabel(event.type)}</H1>
            <Text>{new Date(event.created.at).toLocaleString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric',
              hour: '2-digit', minute: '2-digit', timeZoneName: 'short'
            })}</Text>
            <Text>{location.address_1}</Text>
            <Text>{location.city}, {location.state} {location.zipcode}</Text>
            {agencies}
            <Text style={{paddingTop: 15, color: "gray"}}>Details:</Text>
            <Text>{event.description}</Text>
          </Content>
        </Container>
      </View>
    );
  }
}

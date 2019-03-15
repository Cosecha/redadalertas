// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

// Vendor
import {
  Container, Header, Content, H1, H2, H3, Button, Text,
} from 'native-base';

// Redadalertas
import { colors } from "styles";
import { checkIfLoggedIn } from "utils/user";

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: colors.lightGray,
    color: colors.black
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

  constructor(props) {
    super(props);
    this.state = {
      event: this.props.navigation.state.params.event,
      user: null
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    this.willFocusSub = navigation.addListener('willFocus',
      async payload => this.setState({ user: await checkIfLoggedIn() })
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state != nextState;
  }

  componentWillUnmount() {
    this.willFocusSub.remove();
    this.setState({ user: null });
  }

  getEventLabel(eventType) {
    return types.find((type)=> {
      return type.value == eventType;
    }).label;
  }

  render() {
    const { event, user } = this.state;
    const { navigation } = this.props;
    const { location } = event;
    const agencies = event.present && event.present.length > 0 ? (
      <View>
        <Text style={{paddingTop: 15, color: "gray"}}>Agencies:</Text>
        <Text>{event.present.map((item)=> {return item.agency}).join(", ")}</Text>
      </View>
    ) : <></>
    const editButton = (user) ? (
      <Button block
        style={{ backgroundColor: colors.primary, margin: 15, marginTop: 25 }}
        onPress={()=> navigation.navigate("EventEdit", { event })}
      >
        <Text>Edit Event</Text>
      </Button>
    ) : <></>;

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
            {editButton}
          </Content>
        </Container>
      </View>
    );
  }
}

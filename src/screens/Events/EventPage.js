// Setup
import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";
import { Translate, withLocalize } from "react-localize-redux";

// Vendor
import {
  Container, Header, Content, H1, H2, H3, Button, Text,
} from 'native-base';

// Redadalertas
import { colors } from "styles";
import { checkForUserLogin } from "utils/user";

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

class EventPage extends Component {

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
      async payload => this.setState({ user: await checkForUserLogin() })
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state != nextState;
  }

  componentWillUnmount() {
    this.willFocusSub.remove();
    this.setState({ user: null });
  }

  render() {
    const { event, user } = this.state;
    const { navigation } = this.props;
    const language = this.props.activeLanguage.code;
    const { location, description } = event;

    const agencies = event.present && event.present.length > 0 ? (
      <View>
        <Text style={{paddingTop: 15, color: "gray"}}>
          <Translate id="event.agencies" />:
        </Text>
        <Text>{event.present.map((item)=> {return item.agency}).join(", ")}</Text>
      </View>
    ) : <></>
    const editButton = (user) ? (
      <Button block
        style={{ backgroundColor: colors.primary, margin: 15, marginTop: 25 }}
        onPress={()=> navigation.navigate("EventEdit", { event })}
      >
        <Text><Translate id="event.edit" /></Text>
      </Button>
    ) : <></>;

    return (
      <Translate>
      {({ translate }) => (
      <View style={styles.view}>
        <Container>
          <Content style={styles.content}>
            <H1 style={{paddingBottom: 15}}>
              {translate("event.type." + event.type)}
            </H1>
            <Text>{new Date(event.created.at).toLocaleString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric',
              hour: '2-digit', minute: '2-digit', timeZoneName: 'short'
            })}</Text>
            <Text>{location.address_1}</Text>
            <Text>{location.city}, {location.state} {location.zipcode}</Text>
            {agencies}
            <Text style={{paddingTop: 15, color: "gray"}}>
              {translate("event.details")}:
            </Text>
            <Text>{event.description[language] || event.description.en}</Text>
            {editButton}
          </Content>
        </Container>
      </View>
      )}
      </Translate>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});


export default connect(
  mapStateToProps,
  null
)(withLocalize(EventPage));

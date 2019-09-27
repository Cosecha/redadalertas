// Setup
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

// Vendor
import MapView, { Callout, Marker } from "react-native-maps";
import { Toast, Fab, Icon, Button } from "native-base";

// Redadalertas
import { colors } from "styles";
import { getEvents } from "reducers/event";
import { Notification } from "utils/notification";
import { checkForUserLogin } from "utils/user";
import { saveUserToken } from "reducers/user";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  icon: {
    backgroundColor: colors.primary
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
  { label: "Other", value: "other" }
];
const initialRegion = {
  latitude: 37.7620375,
  longitude: -122.4369478,
  latitudeDelta: 0.15,
  longitudeDelta: 0.15
}

class EventsMap extends Component {
  static navigationOptions = () => ({ title: "Event Map" });

  constructor(props) {
    super(props);
    this.map = null;
    this.markers = {};
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const user = await checkForUserLogin();
    if (user) await this.props.saveUserToken(user);
    await this.populateMap();
    this.willFocusSub = navigation.addListener(
      "willFocus",
      async payload => await this.handleWillFocus(payload)
    );
    this.willBlurSub = navigation.addListener(
      "willBlur",
      async payload => await this.handleWillBlur(payload)
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state != nextState || this.props != nextProps;
  }

  componentDidUpdate(prevProps) {
    const {
      props: { events: fetchedEvents }
    } = this;
    const previousEventIds = prevProps.events.map(event => event.id);
    const newEvents = fetchedEvents.filter(
      event => !previousEventIds.includes(event.id)
    );

    if (newEvents.length > 1) {
      new Notification({
        data: { route: "EventsMap" },
        id: "newEvents",
        title: `${newEvents.length} New Events`,
        body: "New events have been reported."
      }).display();
    } else if (newEvents.length === 1) {
      const event = newEvents[0];
      const typeLabel = this.getEventLabel(event.type);
      new Notification({
        data: { route: "EventPage", params: { event }},
        id: "newEvent",
        title: `${typeLabel} Reported`,
        body: `${typeLabel} reported at ${event.location.address_1}`
      }).display();
    }
  }

  componentWillUnmount() {
    this.willFocusSub.remove();
    this.willBlurSub.remove();
  }

  async handleWillFocus(payload) {
    const params =
      payload.action && payload.action.params ? payload.action.params : null;
    if (params && params.refresh === true) await this.populateMap(params.event);
  }

  handleWillBlur() {
    this.markers = {};
  }

  focusMarker(event) {
    this.map.animateToRegion(
      {
        latitude: event.location.latitude,
        longitude: event.location.longitude,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025
      },
      500
    );
    setTimeout(() => {
      this.markers[event.id].showCallout();
    }, 1500);
  }

  async populateMap(newEvent) {
    try {
      await this.props.getEvents();
      if (this.props.errors.event) throw this.props.errors.event;
      if (newEvent) this.focusMarker(newEvent);
      Toast.show({
        buttonText: "OK",
        text: "Events fetched successfully.",
        type: "success"
      });
    } catch (error) {
      console.log("Error rendering map: ", error);
      Toast.show({
        buttonText: "OK",
        text: "Error rendering map.",
        type: "danger"
      });
    }
  }

  getEventLabel(eventType) {
    return types.find(type => type.value == eventType).label;
  }

  render() {
    const { navigation, events } = this.props;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          ref={ref => {
            this.map = ref;
          }}
          region={initialRegion}
        >
          {events.map(event => {
            const { location } = event;
            const latitude = parseFloat(location.latitude);
            const longitude = parseFloat(location.longitude);
            const address2 = location.address_2 ? (
              <Text>{location.address_2}</Text>
            ) : (
              <></>
            );
            const cityStateZip = `${location.city}, ${location.state} ${location.zipcode}`;

            return (
              <Marker
                coordinate={{ latitude, longitude }}
                identifier={event.id}
                key={event.id}
                ref={ref => {
                  this.markers[event.id] = ref;
                }}
                onCalloutPress={() => {
                  navigation.navigate("EventPage", { event });
                }}
              >
                <Callout tooltip={false}>
                  <View>
                    <Text style={{ maxWidth: 200, fontWeight: "bold" }}>
                      {this.getEventLabel(event.type)}
                    </Text>
                    <Text>{location.address_1}</Text>
                    <Text>{cityStateZip}</Text>
                    {address2}
                  </View>
                </Callout>
              </Marker>
            );
          })}
        </MapView>
        <Fab
          style={styles.icon}
          position="bottomRight"
          onPress={async () => {
            await this.populateMap();
            this.map.animateToRegion(initialRegion);
          }}
        >
          <Icon name="refresh" />
        </Fab>

      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  events: state.events,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  saveUserToken: (user) => dispatch(saveUserToken(user)),
  getEvents: () => dispatch(getEvents())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsMap);

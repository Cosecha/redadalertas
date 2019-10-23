// Setup
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { Translate, withLocalize, setActiveLanguage } from "react-localize-redux";

// Vendor
import MapView, { Callout, Marker } from "react-native-maps";
import { Toast, Fab, Icon, Button } from "native-base";

// Redadalertas
import EventsList from "./EventsList";
import { colors } from "styles";
import { getEvents } from "reducers/event";
import { saveDevice } from "reducers/device";
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
  fabIcon: {
    backgroundColor: colors.primary
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.darkGray,
    backgroundColor: 'gray',
  },
  markerIcon: {
    fontSize: 25,
    textAlign: "center",
    color: "white"
  },
  callout: {
    zIndex: 5,
    width: 200,
    maxHeight: 200,
    maxWidth: 200,
  },
  calloutText: {
    fontWeight: "bold"
  }
});

const types = [
  { label: "Raid", value: "sweep",
    markerColor: "red", markerIcon: "radio"
  },
  { label: "Individual", value: "targeted",
    markerColor: "orange", markerIcon: "man"
  },
  { label: "Traffic Stop", value: "traffic",
    markerColor: "yellow", markerIcon: "car"
  },
  { label: "I-9 Audit", value: "i9",
    markerColor: "green", markerIcon: "business"
  },
  { label: "Checkpoint", value: "checkpoint",
    markerColor: "blue", markerIcon: "pin"
  },
  { label: "Action", value: "action",
    markerColor: "indigo", markerIcon: "megaphone"
  },
  { label: "False Alarm", value: "falsealarm",
    markerColor: "violet", markerIcon: "close-circle"
  },
  { label: "Other", value: "other",
    markerColor: "gray", markerIcon: "today" }
];
const initialRegion = {
  latitude: 37.7620375,
  longitude: -122.4369478,
  latitudeDelta: 0.15,
  longitudeDelta: 0.15
}

class EventsMap extends Component {
  static navigationOptions = ({ screenProps }) => ({
    title: screenProps.translate("events.map")
  });

  constructor(props) {
    super(props);
    this.map = null;
    this.markers = {};
  }

  async componentDidMount() {
    const { navigation } = this.props;
    await this.initializeState();
    await this.populateMap();
    this.willFocusSub = navigation.addListener(
      "willFocus",
      async payload => await this.handleWillFocus(payload)
    );
  }

  async initializeState() {
    const user = await checkForUserLogin();
    if (user) await this.props.saveUserToken(user);
    const deviceSettings = await deviceServices.get();
    if (deviceSettings) {
      // If there are settings in device storage, set them
      if (deviceSettings.language) {
        // Set language in react-localize-redux
        this.props.setActiveLanguage(deviceSettings.language);
      }
      // Save settings in redux store
      await this.props.saveDevice(deviceSettings);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state != nextState || this.props != nextProps;
  }

  componentDidUpdate(prevProps) {
    const {
      props: { events: fetchedEvents }
    } = this;
    const previousEventIds = prevProps.events.map(event => event._id);
    const newEvents = fetchedEvents.filter(
      event => !previousEventIds.includes(event._id)
    );
    const { translate } = this.props;

    if (newEvents.length > 1) {
      new Notification({
        data: { route: "EventsMap" },
        id: "newEvents",
        title: `${newEvents.length} ${translate("events.newEvents")}`,
        body: `${translate("events.newReports")}`
      }).display();
    } else if (newEvents.length === 1) {
      const event = newEvents[0];
      const typeLabel = this.getEventLabel(event.type);
      new Notification({
        data: { route: "EventPage", params: { event }},
        id: "newEvent",
        title: `${typeLabel} ${translate("events.reported")}`,
        body: `${typeLabel} ${translate("events.reportedAddress")} ${event.location.address_1}`
      }).display();
    }
  }

  componentWillUnmount() {
    this.willFocusSub.remove();
  }

  async handleWillFocus(payload) {
    const params =
      payload.action && payload.action.params ? payload.action.params : null;
    if (params && params.refresh === true) await this.populateMap(params.event);
  }

  focusMarker(context, event) {
    context.map.animateToRegion(
      {
        latitude: event.location.latitude,
        longitude: event.location.longitude,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025
      },
      500
    );
    setTimeout(() => {
      context.markers[event._id].showCallout();
    }, 1500);
  }

  async populateMap(newEvent) {
    try {
      const screenProps = this.props.screenProps;
      await this.props.getEvents();
      if (this.props.errors.event) throw this.props.errors.event;
      if (newEvent) this.focusMarker(this, newEvent);
      Toast.show({
        buttonText: "OK",
        text: screenProps.translate("events.fetchSuccess"),
        type: "success"
      });
    } catch (error) {
      console.log("Error rendering map: ", error);
      Toast.show({
        buttonText: "OK",
        text: screenProps.translate("events.fetchError"),
        type: "danger"
      });
    }
  }

  getEventLabel(eventType) {
    return this.props.screenProps.translate("event.type." + eventType);
  }

  getEventColor(eventType) {
    return types.find(type => type.value == eventType).markerColor;
  }

  getEventIcon(eventType) {
    return types.find(type => type.value == eventType).markerIcon;
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
            const markerColor = this.getEventColor(event.type);
            const markerIcon = this.getEventIcon(event.type);

            return (
              <Marker
                coordinate={{ latitude, longitude }}
                identifier={event._id}
                key={event._id}
                ref={ref => {
                  this.markers[event._id] = ref;
                }}
                onCalloutPress={() => {
                  navigation.navigate("EventPage", { event });
                }}
              >
                <View
                  style={[styles.marker, { backgroundColor: markerColor }]}
                >
                  <Icon name={markerIcon} style={styles.markerIcon} />
                </View>
                <Callout style={styles.callout} tooltip={false}>
                  <View>
                    <Text style={styles.calloutText}>
                      <Translate id={"event.type." + event.type} />
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
        <EventsList
          events={events}
          navigation={navigation}
          parent={this}
        />
        <Fab
          style={styles.fabIcon}
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
  setActiveLanguage: (language) => dispatch(setActiveLanguage(language)),
  saveUserToken: (user) => dispatch(saveUserToken(user)),
  saveDevice: (settings) => dispatch(saveDevice(settings)),
  getEvents: () => dispatch(getEvents())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLocalize(EventsMap));

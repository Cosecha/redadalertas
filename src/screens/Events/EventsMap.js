// Setup
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

// Vendor
import MapView, { Callout, Marker } from "react-native-maps";
import { Toast, Fab, Icon } from "native-base";

// Redadalertas
import { colors } from "styles";
import eventServices from "services/event";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
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

export default class EventsMap extends Component {
  static navigationOptions = () => ({ title: "Event Map" });

  constructor(props) {
    super(props);
    this.state = { events: [] };
    this.map = null;
    this.markers = {};
  }

  async componentDidMount() {
    const { navigation } = this.props;
    await this.getEvents();
    this.willFocusSub = navigation.addListener('willFocus',
      async payload => await this.handleWillFocus(payload)
    );
    this.willBlurSub = navigation.addListener('willBlur',
      async payload => await this.handleWillBlur(payload)
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state != nextState;
  }

  componentWillUnmount() {
    this.willFocusSub.remove();
    this.willBlurSub.remove();
  }

  async handleWillFocus(payload) {
    const params = (payload.action && payload.action.params) ? payload.action.params : null;
    if (params && params.refresh === true) await this.getEvents(params.event || null);
  }

  handleWillBlur() {
    this.markers = {};
  }

  focusMarker(event) {
    this.map.animateToRegion({
        latitude: event.location.latitude,
        longitude: event.location.longitude,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025
      }, 500);
    setTimeout(()=> {
      this.markers[event.id].showCallout();
    }, 1500);
  }

  focusMap(events) {
    setTimeout(()=> {
      this.map.fitToSuppliedMarkers(events.map(event => event.id));
    }, 1000);
  }

  async getEvents(newEvent) {
    try {
      const response = await eventServices.gets();
      if (response instanceof Error) throw response;
      this.setState({ events: response.data }, () => {
        const { events } = this.state;
        if (newEvent) this.focusMarker(newEvent);
        else this.focusMap(events);
      });
      Toast.show({
        buttonText: "OK",
        text: "Events fetched successfully.",
        type: "success"
      });
    } catch (error) {
      console.error("Error rendering map: ", error);
      Toast.show({
        buttonText: "OK",
        text: "Error rendering map.",
        type: "danger"
      });
    }
  }

  getEventLabel(eventType) {
    return types.find((type)=> {
      return type.value == eventType;
    }).label;
  }

  render() {
    const { navigation } = this.props;
    const { events } = this.state;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          ref={ref => { this.map = ref; }}
          initialRegion={{
            latitude: 37.7620375,
            longitude: -122.4369478,
            latitudeDelta: 0.15,
            longitudeDelta: 0.15
          }}
        >
          {events.map(event => {
            const { location } = event;
            const latitude = parseFloat(location.latitude);
            const longitude = parseFloat(location.longitude);
            let address2 = location.address_2 ? (<Text>{location.address_2}</Text>) : <></>;

            return (
              <Marker
                coordinate={{ latitude, longitude }}
                identifier={event.id}
                key={event.id}
                ref={ref => { this.markers[event.id] = ref; }}
                onCalloutPress={() => {
                  navigation.navigate("EventPage", { event })
                }}
              >
                <Callout tooltip={false}>
                  <View>
                    <Text style={{ maxWidth: 200, fontWeight: "bold" }}>
                      {this.getEventLabel(event.type)}
                    </Text>
                    <Text>{location.address_1}</Text>
                    <Text>{location.city}, {location.state} {location.zipcode}</Text>
                    {address2}
                  </View>
                </Callout>
              </Marker>
            );
          })}
        </MapView>
        <Fab
          style={{ backgroundColor: colors.primary }}
          onPress={async ()=> {await this.getEvents()}}
        >
          <Icon name="refresh" />
        </Fab>
      </View>
    );
  }
}

// Setup
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

// Vendor
import MapView, { Callout, Marker } from "react-native-maps";
import { Toast, Fab, Icon } from "native-base";

// Redadalertas
import { colors } from "styles";
import eventServices from "services/event";
import { getEvents } from "reducers/event";

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

class EventsMap extends Component {
  static navigationOptions = () => ({ title: "Event Map" });

  constructor(props) {
    super(props);
    this.map = null;
    this.markers = {};
  }

  async componentDidMount() {
    const { navigation } = this.props;
    await this.populateMap();
    this.willFocusSub = navigation.addListener('willFocus',
      async payload => await this.handleWillFocus(payload)
    );
    this.willBlurSub = navigation.addListener('willBlur',
      async payload => await this.handleWillBlur(payload)
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state != nextState) || (this.props != nextProps);
  }

  componentWillUnmount() {
    this.willFocusSub.remove();
    this.willBlurSub.remove();
  }

  async handleWillFocus(payload) {
    const params = (payload.action && payload.action.params) ? payload.action.params : null;
    if (params && params.refresh === true) await this.props.getEvents(params.event || null);
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

  async populateMap(newEvent) {
    try {
      await this.props.getEvents();
      if (this.props.errors.event) throw this.props.errors.event;
      this.props.events.forEach(event => {
        if (newEvent) this.focusMarker(newEvent);
      });
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
    return types.find((type)=> {
      return type.value == eventType;
    }).label;
  }

  render() {
    const { navigation, events } = this.props;

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
          onPress={async ()=> {await this.populateMap()}}
        >
          <Icon name="refresh" />
        </Fab>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.events.map(event => ({ ...event })),
    errors: state.errors
  };
}

const mapDispatchToProps = (dispatch)=> {
  return {
    getEvents: () => dispatch(getEvents())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsMap);

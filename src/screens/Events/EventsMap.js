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

export default class EventsMap extends Component {
  static navigationOptions = () => ({ title: "Event Map" });

  state = { events: [] };

  async componentDidMount() {
    await this.getEvents();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state != nextState;
  }

  async getEvents() {
    try {
      const response = await eventServices.gets();
      if (response instanceof Error) throw response;
      this.setState({ events: response.data }, () => {
        const { events } = this.state;
        setTimeout(()=> {
          this.map.fitToSuppliedMarkers(events.map(event => event.id))  
        }, 1000);
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

  render() {
    const { navigation } = this.props;
    const { events } = this.state;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          ref={ref => {
            this.map = ref;
          }}
          region={{
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
              >
                <Callout
                  onPress={() => {
                    navigation.navigate("EventPage", { event })
                  }}
                >
                  <View>
                    <Text>{event.description || 'Test'}</Text>
                    <Text>{location.address_1}</Text>
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

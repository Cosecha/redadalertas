// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

// Vendor
import {
  Button,
  Container,
  Content,
  Header,
  Icon,
  Item,
  Input,
  Text,
  Toast
} from "native-base";
import Geocoder from "react-native-geocoder";
import MapView, { Callout, Marker } from "react-native-maps";

// Redadalertas
import IconBase from "ui/IconBase";
import { colors } from "styles";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

const AddLocationCallout = () => (
  <Button iconRight full transparent>
    <Text>Add Location</Text>
    <Icon name="add-circle" />
  </Button>
);

class EditLocation extends Component {
  state = { inputValue: "", results: [] };

  displayAddress = async address => {
    try {
      const results = await Geocoder.geocodeAddress(address);
      this.setState(
        {
          results: results.map((result, index) => {
            const { lat, lng } = result.position;
            return {
              address_1: result.feature,
              city: result.locality,
              latitude: lat,
              coordinate: { latitude: lat, longitude: lng },
              longitude: lng,
              identifier: `${index}`,
              state: result.adminArea,
              zipcode: result.postalCode
            };
          })
        },
        () => {
          const markerIds = this.state.results.map(result => result.identifier);
          setTimeout(() => {
            this.map.fitToSuppliedMarkers(markerIds);
          }, 1000);
        }
      );
    } catch (error) {
      console.log("Error geocoding location: ", error);
      Toast.show({
        buttonText: "OK",
        text: `Error geocoding location: ${error.message || error}`,
        type: "danger"
      });
    }
  };

  sendLocation(location) {
    try {
      const { address_1, city, state, zipcode, latitude, longitude } = location;
      // Basic location validation
      if (!address_1) throw new Error("No street address.");
      if (!city) throw new Error("No city.");
      if (!state) throw new Error("No state.");
      if (!zipcode) throw new Error("No zipcode.");
      if (!latitude) throw new Error("No latitude.");
      if (!longitude) throw new Error("No longitude.");

      const { navigation } = this.props;
      const setLocation = navigation.getParam("setLocation");
      setLocation(location);
      navigation.goBack();
    } catch (error) {
      console.log("Error setting location: ", error);
      Toast.show({
        buttonText: "OK",
        text: `Error setting location: ${error.message || error}`,
        type: "danger"
      });
    }
  }

  render() {
    const { navigation } = this.props;
    const { inputValue, results } = this.state;

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <IconBase color="black" name="search" size={20} />
            <Input
              returnKeyType="search"
              onChangeText={address => this.setState({ inputValue: address })}
              onSubmitEditing={() => this.displayAddress(inputValue)}
              placeholder="Enter Street Address"
              value={inputValue}
            />
          </Item>
          <Button transparent onPress={() => navigation.goBack()}>
            <Text style={{ color: colors.primary }}>Cancel</Text>
          </Button>
        </Header>

        <View style={styles.container}>
          <MapView
            style={styles.map}
            ref={ref => {
              this.map = ref;
            }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.15,
              longitudeDelta: 0.15
            }}
          >
            {results.map(result => (
              <Marker
                coordinate={result.coordinate}
                identifier={result.identifier}
                key={result.identifier}
              >
                <Callout
                  onPress={() => {
                    const {
                      address_1,
                      city,
                      coordinate,
                      state,
                      zipcode
                    } = result;
                    const { latitude, longitude } = coordinate;
                    this.sendLocation({
                      address_1,
                      city,
                      latitude,
                      longitude,
                      state,
                      zipcode
                    });
                  }}
                >
                  <Content>
                    <Text>{result.address_1}</Text>
                    <Text>{result.city}, {result.state} {result.zipcode}</Text>
                  </Content>
                  <AddLocationCallout />
                </Callout>
              </Marker>
            ))}
          </MapView>
        </View>
      </Container>
    );
  }
}

export default EditLocation;

// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

// Vendor
import {
  Button,
  Container,
  Header,
  Icon,
  Item,
  Input,
  Text
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

  geocode = async address => {
    try {
      const results = await Geocoder.geocodeAddress(address);
      this.setState(
        {
          results: results.map(result => {
            const { lat, lng } = result.position;
            return {
              address_1: result.feature,
              city: result.locality,
              latitude: lat,
              coordinate: { latitude: lat, longitude: lng },
              longitude: lng,
              identifier: `{lat}{lng}`,
              state: result.adminArea,
              zipcode: result.postalCode
            };
          })
        },
        () => {
          const markerIds = this.state.results.map(result => result.identifier);
          this.map.fitToSuppliedMarkers(markerIds);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { navigation } = this.props;
    const { inputValue, results } = this.state;
    const setLocation = navigation.getParam("setLocation");

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <IconBase color="black" name="search" size={20} />
            <Input
              returnKeyType="search"
              onChangeText={address => this.setState({ inputValue: address })}
              onSubmitEditing={() => this.geocode(inputValue)}
              placeholder="Enter Street Address"
              value={inputValue}
            />
          </Item>
          <Button transparent onPress={() => navigation.goBack()}>
            <Text>Cancel</Text>
          </Button>
        </Header>

        <View style={styles.container}>
          <MapView
            style={styles.map}
            ref={ref => {
              this.map = ref;
            }}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1
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
                    setLocation({
                      address_1,
                      city,
                      latitude,
                      longitude,
                      state,
                      zipcode
                    });
                    navigation.goBack();
                  }}
                >
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

// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

// Vendor
import {
  Body,
  Button,
  CheckBox,
  Container,
  Content,
  Form,
  Header,
  Icon,
  Item,
  Input,
  Label,
  Left,
  Picker,
  Right,
  Text,
  Title
} from "native-base";
import Geocoder from "react-native-geocoder";
import MapView, { Marker } from "react-native-maps";

// Redadalertas
import IconBase from "ui/IconBase";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

class EditLocation extends Component {
  state = { inputValue: "", results: [] };

  geocode = async address => {
    try {
      const results = await Geocoder.geocodeAddress(address);
      this.setState(
        {
          results: results.map((result, index) => {
            const { lat, lng } = result.position;
            return {
              address: result.formattedAddress,
              coordinate: { latitude: lat, longitude: lng },
              identifier: `{lat}{lng}`
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
            <IconBase name="search" size={20} />
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
            ref={ref => (this.map = ref)}
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
                title={result.address}
              />
            ))}
          </MapView>
        </View>
      </Container>
    );
  }
}

export default EditLocation;

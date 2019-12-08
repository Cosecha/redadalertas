// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { withLocalize } from "react-localize-redux";

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
  container: { flex: 1 },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1
  },
  addLocView: {
    ...StyleSheet.absoluteFillObject
  },
  addButtonView: {
    ...StyleSheet.absoluteFillObject,
    padding: 15,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  addButton: {
    position: "relative",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center"
  },
  addButtonText: {
    position: "relative",
    alignItems: "center",
    textAlign: "center"
  }
});

class EditLocation extends Component {
  state = { inputValue: "", results: [] };
  markers = {};

  displayAddress = async address => {
    const { translate } = this.props;
    try {
      const results = await Geocoder.geocodeAddress(address);
      this.displayResults(results);
    } catch (error) {
      Toast.show({
        buttonText: "OK",
        text: `${translate("geo.error")}: ${error.message || error}`,
        type: "danger"
      });
    }
  };

  displayCoordinates = async coordinates => {
    try {
      const results = await Geocoder.geocodePosition(coordinates);
      this.displayResults(results);
    } catch (error) {
      Toast.show({
        buttonText: "OK",
        text: `${translate("geo.coordError")}: ${error.message || error}`,
        type: "danger"
      });
    }
  };

  displayResults = results => {
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
          setTimeout(() => {
            this.markers[markerIds[0]].showCallout();
          }, 1000);
        }, 1000);
      }
    );
  };

  calloutBody({ city, state, zipcode }) {
    return `${city}, ${state} ${zipcode || ""}`;
  }

  sendLocation(location) {
    try {
      const { navigation, translate } = this.props;
      const { address_1, city, state, zipcode, latitude, longitude } = location;
      // Basic location validation
      if (!address_1) throw new Error(`${translate("geo.noStreet")}`);
      if (!city) throw new Error(`${translate("geo.noCity")}`);
      if (!state) throw new Error(`${translate("geo.noState")}`);
      if (!zipcode) throw new Error(`${translate("geo.noZip")}`);
      if (!latitude) throw new Error(`${translate("geo.noLat")}`);
      if (!longitude) throw new Error(`${translate("geo.noLong")}`);

      const setLocation = navigation.getParam("setLocation");
      setLocation(location);
      navigation.goBack();
    } catch (error) {
      Toast.show({
        buttonText: "OK",
        text: `${translate("geo.locError")}: ${error.message || error}`,
        type: "danger"
      });
    }
  }

  updateMarker = event => {
    const {
      coordinate: { latitude: lat, longitude: lng }
    } = event.nativeEvent;

    this.displayCoordinates({ lat, lng });
  };

  render() {
    const { navigation, translate } = this.props;
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
              placeholder={translate("geo.enter")}
              value={inputValue}
            />
          </Item>
          <Button transparent onPress={() => navigation.goBack()}>
            <Text style={{ color: colors.primary }}>{
              translate("geo.cancel")
            }</Text>
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
            <View style={styles.addLocView} key={"view." + result.identifier}>
              <Marker
                draggable
                onDragEnd={this.updateMarker}
                coordinate={result.coordinate}
                identifier={result.identifier}
                key={result.identifier}
                ref={ref=> this.markers[result.identifier] = ref}
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
                    <Text>{this.calloutBody(result)}</Text>
                  </Content>
                </Callout>
              </Marker>
              <View style={styles.addButtonView}>
                <Button style={styles.addButton}
                  block
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
                  <Text style={styles.addButtonText}>{translate("geo.addLoc")}</Text>
                </Button>
              </View>
            </View>
            ))}
          </MapView>
        </View>
      </Container>
    );
  }
}

export default withLocalize(EditLocation);

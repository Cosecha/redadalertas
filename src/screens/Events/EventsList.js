import React, { Component } from 'react';
import {View, Button, Text, Dimensions, Animated} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';

import { colors } from "styles";

const { height } = Dimensions.get("window");

const panelHeaderHeight = 75;
const panelBorderRadius = 20;

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center"
  },
  panel: {
    borderTopLeftRadius: panelBorderRadius,
    borderTopRightRadius: panelBorderRadius,
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },
  panelHeader: {
    borderTopLeftRadius: panelBorderRadius,
    borderTopRightRadius: panelBorderRadius,
    height: panelHeaderHeight,
    backgroundColor: colors.darkGray,
    justifyContent: "flex-end",
    padding: 24
  },
  textHeader: {
    fontSize: 28,
    color: "#FFF"
  }
};

export default class EventsList extends Component {
  static defaultProps = {
    draggableRange: {
      top: height + panelHeaderHeight - 64,
      bottom: panelHeaderHeight
    }
  };

  _draggedValue = new Animated.Value(panelHeaderHeight);

  render() {
    const { events } = this.props;
    const { top, bottom } = this.props.draggableRange;

    const backgoundOpacity = this._draggedValue.interpolate({
      inputRange: [height - 48, height],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });

    const textTranslateY = this._draggedValue.interpolate({
      inputRange: [bottom, top],
      outputRange: [0, 8],
      extrapolate: "clamp"
    });

    const textTranslateX = this._draggedValue.interpolate({
      inputRange: [bottom, top],
      outputRange: [0, -112],
      extrapolate: "clamp"
    });

    const textScale = this._draggedValue.interpolate({
      inputRange: [bottom, top],
      outputRange: [1, 0.7],
      extrapolate: "clamp"
    });

    return (
      <SlidingUpPanel
        ref={c => (this._panel = c)}
        draggableRange={this.props.draggableRange}
        animatedValue={this._draggedValue}
        snappingPoints={[panelHeaderHeight * 2]}
        height={height + panelHeaderHeight}
        friction={0.5}
      >
        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Animated.View
              style={{
                transform: [
                  { translateY: textTranslateY },
                  { translateX: textTranslateX },
                  { scale: textScale }
                ]
              }}
            >
              <Text style={styles.textHeader}>Events List</Text>
            </Animated.View>
          </View>
          <View style={styles.container}>
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
                <View key={event._id}>
                  <Text>{location.address_1}</Text>
                  <Text>{cityStateZip}</Text>
                  {address2}
                </View>
              );
            })}
          </View>
        </View>
      </SlidingUpPanel>
    );
  }
}

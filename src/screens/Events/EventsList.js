import React, { Component } from 'react';
import { View, SafeAreaView, Button, Text, Dimensions, Animated, StatusBar
} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { Card, CardItem, Icon, Right } from 'native-base';
import { Translate } from "react-localize-redux";

import { colors } from "styles";

const { height } = Dimensions.get("window");

const panelHeaderHeight = 60;
const panelBorderRadius = 20;

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.lightGray
  },
  panel: {
    borderTopLeftRadius: panelBorderRadius,
    borderTopRightRadius: panelBorderRadius,
    borderColor: colors.darkGray,
    flex: 1,
    backgroundColor: colors.lightGray,
    position: "relative",
  },
  panelHeader: {
    borderTopLeftRadius: panelBorderRadius,
    borderTopRightRadius: panelBorderRadius,
    height: panelHeaderHeight,
    backgroundColor: colors.lightGray,
    justifyContent: "flex-end",
    padding: 15
  },
  textHeader: {
    fontSize: 20,
    color: colors.darkGray
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
};

export default class EventsList extends Component {
  static defaultProps = {
    draggableRange: {
      top: height - (panelHeaderHeight * 2),
      bottom: panelHeaderHeight
    }
  };

  _draggedValue = new Animated.Value(panelHeaderHeight);

  async componentDidMount() {
    const { navigation } = this.props;
    this.willBlurSub = navigation.addListener(
      "willBlur",
      async payload => await this.handleWillBlur(payload)
    );
  }

  componentWillUnmount() {
    this.willBlurSub.remove();
  }

  handleWillBlur(payload) {
    if (payload.action && payload.action.routeName !== "EventPage") {
      this._panel.hide();
    }
  }

  render() {
    const { events, navigation, parent } = this.props;
    const { top, bottom } = this.props.draggableRange;

    return (
      <Translate>
      {({ translate }) => (
      <SlidingUpPanel
        ref={c => (this._panel = c)}
        draggableRange={this.props.draggableRange}
        animatedValue={this._draggedValue}
        snappingPoints={[panelHeaderHeight * 2, height / 2]}
        height={height + panelHeaderHeight}
        friction={0.5}
      >
        <SafeAreaView style={styles.panel}>
          <View style={styles.panelHeader}>
            <Text style={styles.textHeader}>{translate("events.list")}</Text>
          </View>
          <Card style={styles.container}>
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
              const markerColor = parent.getEventColor(event.type);
              const markerIcon = parent.getEventIcon(event.type);

              return (
                <CardItem
                  key={event._id}
                  bordered
                  button
                  onPress={() => {
                    parent.focusMarker(parent, event);
                    navigation.navigate("EventPage", { event })
                  }}
                >
                  <View>
                    <Icon name={markerIcon} style={{color: markerColor}} />
                  </View>
                  <View>
                    <Text style={{fontWeight: "bold"}}>{location.address_1}</Text>
                    <Text>{cityStateZip}</Text>
                    {address2}
                    <Text>{`${translate("event.type." + event.type)} ${translate("event.at")} ${new Date(event.created.at).toLocaleString('en-US', {
                      hour: 'numeric', minute: '2-digit'
                    })}`}</Text>
                  </View>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </CardItem>
              );
            })}
          </Card>
        </SafeAreaView>
      </SlidingUpPanel>
      )}
      </Translate>
    );
  }
}

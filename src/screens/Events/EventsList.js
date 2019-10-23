import React, { Component } from 'react';
import { View, SafeAreaView, Button, Text, Dimensions, Animated, StatusBar,
 ScrollView, FlatList, TouchableWithoutFeedback } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { Content, Card, CardItem, Icon, Right } from 'native-base';
import { Translate } from "react-localize-redux";

import { colors } from "styles";

const panelHeaderHeight = 60;
const panelBorderRadius = 20;

const styles = {
  container: {
    flex: 1,
    flexGrow: 1,
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
  _draggedValue = new Animated.Value(panelHeaderHeight);

  constructor(props) {
    super(props);
    this.state = {
      touchStart: null
    };
  }

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
      this.hidePanel();
    }
  }

  hidePanel() {
    this._panel.hide();
  }

  handleTouch(touchEnd, height) {
    if (!this.state.touchStart || !touchEnd) return;
    const touchLength = touchEnd - this.state.touchStart;
    if (touchLength > 200) return;
    const panelHeight = this._draggedValue._value;
    const maxHeight = height - (panelHeaderHeight * 2);
    const minHeight = panelHeaderHeight;
    if (panelHeight < (maxHeight / 2)) {
      this._panel.show(maxHeight / 1.5);
    } else if (panelHeight > (maxHeight / 2) && panelHeight < maxHeight) {
      this._panel.show(maxHeight);
    } else if (panelHeight >= maxHeight) {
      this.hidePanel();
    }
    this.setState({ touchStart: null });
  }

  render() {
    const { events, navigation, parent } = this.props;
    const { height } = Dimensions.get("window");

    return (
      <Translate>
      {({ translate }) => (
      <SlidingUpPanel
        ref={c => (this._panel = c)}
        draggableRange={{
          top: height - (panelHeaderHeight * 2),
          bottom: panelHeaderHeight
        }}
        animatedValue={this._draggedValue}
        snappingPoints={[panelHeaderHeight * 2, height / 2, height / 1.5]}
        height={height - (panelHeaderHeight * 2)}
        friction={0.5}
      >{(dragHandlers) => (
        <SafeAreaView style={styles.panel}>
          <View style={styles.panelHeader} {...dragHandlers}
          onTouchStart={(e)=> {
            this.setState({ touchStart: e.nativeEvent.timestamp });
          }}
          onTouchMove={(e)=> this.setState({ touchStart: null })}
          onTouchCancel={(e)=> this.setState({ touchStart: null })}
          onTouchEnd={(e)=> this.handleTouch(e.nativeEvent.timestamp, height)}>
            <Text style={styles.textHeader}>{translate("events.list")}</Text>
          </View>
          <Card style={styles.container} transparent>
          <ScrollView>
            <FlatList
              data={events}
              extraData={this.props.currentCallout}
              keyExtractor={item => item._id}
              renderItem={({ item }) => {
                const { location } = item;
                const latitude = parseFloat(location.latitude);
                const longitude = parseFloat(location.longitude);
                const address2 = location.address_2 ? (
                  <Text>{location.address_2}</Text>
                ) : (
                  <></>
                );
                const cityStateZip = `${location.city}, ${location.state} ${location.zipcode}`;
                const markerColor = parent.getEventColor(item.type);
                const markerIcon = parent.getEventIcon(item.type);
                const calloutItemColor = (item._id === this.props.currentCallout) ? colors.lightGray : "white";

                return (
                  <CardItem
                    key={item._id}
                    bordered
                    button
                    onPress={() => {
                      parent.focusMarker(parent, item);
                      navigation.navigate("EventPage", { event: item })
                    }}
                    style={{ backgroundColor: calloutItemColor }}
                  >
                    <View>
                      <Icon name={markerIcon} style={{color: markerColor}} />
                    </View>
                    <View>
                      <Text style={{fontWeight: "bold"}}>{location.address_1}</Text>
                      <Text>{cityStateZip}</Text>
                      {address2}
                      <Text>{`${translate("event.type." + item.type)} ${translate("event.at")} ${new Date(item.created.at).toLocaleString('en-US', {
                        hour: 'numeric', minute: '2-digit'
                      })}`}</Text>
                    </View>
                    <Right>
                      <Icon name="arrow-forward" />
                    </Right>
                  </CardItem>
                );
              }}
            />
          </ScrollView>
          </Card>
        </SafeAreaView>
      )}</SlidingUpPanel>
      )}</Translate>
    );
  }
}

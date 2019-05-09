// Vendor
import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import firebase from "react-native-firebase";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

// Redadalertas
import rootReducer from "reducers/index";
import Events from "navigation/tabs/Events";
import Report from "navigation/tabs/Report";
import { Root } from "native-base";
import Settings from "navigation/tabs/Settings";
import { colors } from "styles";
import { TabIcon } from "navigation/utils";
import TabBarIcon from "ui/TabBarIcon";
import { persistor, store } from "redux/configureStore";
import { navigate, setNavigator } from "utils/navigation";

const persistenceKey = __DEV__ ? "NavigationState" : null;

export default class App extends Component {
  state = { isReporter: true };

  componentDidMount() {
    this.createNotificationListeners();
    this.checkNotificationPermission();
  }

  componentWillUnmount() {
    // I know this looks like a bug, but it's the way react-native-firebase
    // shows to remove listeners: calling the function again. So weird.
    this.notificationOpenedListener();
  }

  async checkNotificationPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (!enabled) {
      this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
    } catch (error) {
      // User has rejected permissions
    }
  }

  async createNotificationListeners() {
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { data: { route, params } } = notificationOpen.notification;
        navigate(route, params)
      });
  }

  render() {
    const { isReporter } = this.state;
    const tabs = isReporter
      ? {
          Events,
          Report,
          Settings
        }
      : { Events, Settings };
    const AppNavigator = createBottomTabNavigator(tabs, {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
          const { routeName } = navigation.state;
          const iconName = TabIcon[routeName];

          return <TabBarIcon color={tintColor} name={iconName} />;
        }
      }),
      tabBarOptions: { activeTintColor: colors.primary }
    });
    const AppContainer = createAppContainer(AppNavigator);

    return (
      <Provider store={store}>
        <PersistGate
          loading={
            <ActivityIndicator color={colors.primary} size="large" />
          }
          persistor={persistor}
        >
          <Root>
            <AppContainer
              persistenceKey={null}
              ref={navigator => setNavigator(navigator)}
            />
          </Root>
        </PersistGate>
      </Provider>
    );
  }
}

// Vendor
import React, { Component } from "react";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
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

const persistenceKey = __DEV__ ? "NavigationState" : null;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default class App extends Component {
  state = { isReporter: true };

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
        <Root>
          <AppContainer persistenceKey={null} />
        </Root>
      </Provider>
    );
  }
}

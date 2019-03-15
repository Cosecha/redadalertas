// Vendor
import React, { Component } from "react";
import { AsyncStorage, Text, StyleSheet, View } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

// Redadalertas
import EventsTab from "navigation/tabs/Events";
import ReportTab from "navigation/tabs/Report";
import SettingsTab from "navigation/tabs/Settings";
import { colors } from "styles";
import { TabIcon } from "navigation/utils";
import TabBarIcon from "ui/TabBarIcon";

const persistenceKey = __DEV__ ? "NavigationState" : null;
export default class TabsNavigator extends Component {
  render() {
    const { isReporter } = this.props;
    const tabs = isReporter
      ? {
          Events,
          Report,
          SettingsTab
        }
      : { Events, SettingsTab };
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

    return <AppContainer persistenceKey={persistenceKey} />;
  }
}

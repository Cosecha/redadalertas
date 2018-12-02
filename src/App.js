// Vendor
import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Text, StyleSheet, View } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

// Redadalertas
import Events from "navigation/tabs/Events";
import Report from "navigation/tabs/Report";
import Settings from "navigation/tabs/Settings";
import { colors } from "styles";
import { TabIcon } from "navigation/utils";
import TabBarIcon from "ui/TabBarIcon";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

const isReporter = true;
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
const persistenceKey = __DEV__ ? "NavigationState" : null;
const App = () => <AppContainer persistenceKey={null} />;

export default App;

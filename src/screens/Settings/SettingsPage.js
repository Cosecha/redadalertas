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
  DatePicker,
  Fab,
  Form,
  Header,
  Icon,
  Item,
  Input,
  Label,
  Picker,
  Text,
  Title,
  Toast
} from "native-base";
import { Formik } from "formik";

// Redadalertas
import { colors } from "styles";
import eventServices from "services/event";
import { checkIfLoggedIn } from "utils/user";

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

export default class SettingsPage extends Component {
  static navigationOptions = () => ({ title: "Settings" });

  onSubmit = async () => {
    let response;
    try {
      const user = await checkIfLoggedIn();
      if (!user) throw new Error("Not logged in.");

      Toast.show({
        buttonText: "OK",
        text: "User change(s) successful.",
        type: "success"
      });
    } catch (error) {
      Toast.show({
        buttonText: "OK",
        text: "Error submitting changes: " + (error.message || error),
        type: "danger"
      });
    }
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.view}>
        <Content>
        <Button
          style={{ backgroundColor: colors.darkGray, margin: 15, marginTop: 25 }}
          onPress={()=> navigation.navigate("ChangePassword")}
        >
          <Text>Change Password</Text>
        </Button>
        </Content>
      </View>
    );
  }
}

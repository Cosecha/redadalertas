// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";

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
import { getUserToken } from "reducers/user";
import { checkForUserLogin } from "utils/user";
import asyncStore from "utils/asyncstorage";

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  content: {
    padding: 20
  }
});

class SettingsPage extends Component {
  static navigationOptions = () => ({ title: "Settings" });

  async componentDidMount() {
    await this.props.getUserToken();
  }

  onSubmit = async () => {
    let response;
    try {
      const user = await checkForUserLogin();
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
        <Content style={styles.content}>
        <Text>{this.props.user.username}</Text>
        <Button
          style={{ backgroundColor: colors.darkGray, marginTop: 20 }}
          onPress={()=> navigation.navigate("ChangePassword")}
        >
          <Text>Change Password</Text>
        </Button>
        </Content>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  getUserToken: () => dispatch(getUserToken())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);

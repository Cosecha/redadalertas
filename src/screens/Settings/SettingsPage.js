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
  H3,
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
import authServices from "services/auth";
import { deleteUserToken } from "reducers/user";
import asyncStore from "utils/asyncstorage";

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingBottom: 20
  },
  content: {
    padding: 20
  },
  button: {
    backgroundColor: colors.darkGray,
    marginTop: 20
  }
});

class SettingsPage extends Component {
  static navigationOptions = () => ({ title: "Settings" });

  handleLogout = async () => {
    let response;
    try {
      response = await authServices.logout();
      if (response instanceof Error) throw response;

      await this.props.deleteUserToken();
      this.props.navigation.navigate("ReporterLoginForm");
      Toast.show({
        buttonText: "OK",
        text: "User logout successful.",
        type: "success"
      });
    } catch (error) {
      Toast.show({
        buttonText: "OK",
        text: "Error logging out: " + (error.message || error),
        type: "danger"
      });
    }
  };

  render() {
    const { navigation, user } = this.props;
    const userBlock = (user && user.username) ? (
      <View style={styles.view}>
        <H3>User Settings</H3>
        <Text>{user.username}</Text>
        <Button
          style={styles.button}
          onPress={()=> navigation.navigate("ChangePassword")}
        >
          <Text>Change Password</Text>
        </Button>
        <Button
          style={styles.button}
          onPress={this.handleLogout}
        >
          <Text>Logout</Text>
        </Button>
      </View>
    ) : (<></>);

    return (
      <View style={styles.view}>
        <Content style={styles.content}>
          {userBlock}
          <View style={styles.view}>
            <H3>Device Settings</H3>
          </View>
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
  deleteUserToken: () => dispatch(deleteUserToken()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);

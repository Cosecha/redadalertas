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
import authServices from "services/auth";
import { getUserToken, deleteUserToken } from "reducers/user";
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
  },
  button: {
    backgroundColor: colors.darkGray,
    marginTop: 20
  }
});

class SettingsPage extends Component {
  static navigationOptions = () => ({ title: "Settings" });

  async componentDidMount() {
    this.willFocusSub = this.props.navigation.addListener(
      "willFocus",
      async payload => await this.handleWillFocus(payload)
    );
  }

  componentWillUnmount() {
    this.willFocusSub.remove();
  }

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

  async handleWillFocus(payload) {
    const user = await checkForUserLogin();
    if (!user || user instanceof Error) {
      Toast.show({
        buttonText: "OK",
        text: "Not logged in.",
        type: "danger"
      });
      this.props.navigation.navigate("ReporterLoginForm");
    } else {
      await this.props.getUserToken();
    }
  }

  render() {
    const { navigation, user } = this.props;
    if (!user.username) return(<></>);

    return (
      <View style={styles.view}>
        <Content style={styles.content}>
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
  getUserToken: () => dispatch(getUserToken()),
  deleteUserToken: () => dispatch(deleteUserToken())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);

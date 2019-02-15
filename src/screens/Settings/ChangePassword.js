// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

// Vendor
import {
  Container, Content, H1, H2, H3, Button, Text, Item, Label, Input,
} from 'native-base';

import { Formik } from "formik";

// Redadalertas
import { colors } from "styles";
import userServices from "services/user";
import { checkIfLoggedIn } from "utils/user";

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#F5FCFF",
    color: "#000000"
  },
  content: {
    padding: 20
  }
});

const initialValues = {
  password: "",
  newPassword1: "",
  newPassword2: ""
}

export default class ChangePassword extends Component {
  static navigationOptions = () => ({ title: "Change Password" });

  state = { ...initialValues };

  onSubmit = async (values) => {
    let response;
    try {
      if (values.newPassword1 !== values.newPassword2) {
        throw new Error("New passwords don't match.");
      }

      const user = await checkIfLoggedIn();
      if (!user) throw new Error("Not logged in.");

      if (true) throw new Error("Incorrect password.");

      this.props.nav.navigate("SettingsPage", {
        refresh: true
      });
      Toast.show({
        buttonText: "OK",
        text: "Password change successful.",
        type: "success"
      });
    } catch (error) {
      Toast.show({
        buttonText: "OK",
        text: "Error changing password: " + (error.message || error),
        type: "danger"
      });
    }
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.view}>
        <Container>
          <Content style={styles.content}>
            <Formik initialValues={initialValues} onSubmit={this.onSubmit}>
              {props => (
                <Container>
                  <Content>
                    <Item fixedLabel>
                      <Label>Enter Current Password</Label>
                      <Input
                        placeholder="password"
                        secureTextEntry={true}
                        style={styles.input}
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                      />
                    </Item>
                    <Item fixedLabel>
                      <Label>Enter New Password</Label>
                      <Input
                        placeholder="password"
                        secureTextEntry={true}
                        style={styles.input}
                        value={this.state.newPassword1}
                        onChangeText={(password) => this.setState({ newPassword1 })}
                      />
                    </Item>
                    <Item fixedLabel>
                      <Label>Enter New Password Again</Label>
                      <Input
                        placeholder="password"
                        secureTextEntry={true}
                        style={styles.input}
                        value={this.state.newPassword2}
                        onChangeText={(password) => this.setState({ newPassword2 })}
                      />
                    </Item>
                    <Button block
                      style={{ backgroundColor: colors.primary, margin: 15, marginTop: 25 }}
                      onPress={()=> {}}
                    >
                      <Text>Change Password</Text>
                    </Button>
                  </Content>
                </Container>
              )}
            </Formik>
          </Content>
        </Container>
      </View>
    );
  }
}

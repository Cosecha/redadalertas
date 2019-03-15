// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

// Vendor
import {
  Container, Content, H1, H2, H3, Button, Text, Item, Label, Input, Toast
} from 'native-base';
import { Formik } from "formik";

// Redadalertas
import { colors } from "styles";
import authServices from "services/auth";
import userServices from "services/user";
import { checkIfLoggedIn } from "utils/user";

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: colors.lightGray,
    color: colors.black
  },
  content: {
    padding: 20
  },
  input: {
    paddingTop: 15,
    paddingBottom: 15
  }
});

const initialValues = {
  password: "",
  newPassword1: "",
  newPassword2: ""
}

export default class ChangePassword extends Component {
  static navigationOptions = () => ({ title: "Change Password" });

  onSubmit = async (values, { resetForm }) => {
    let response;
    let authResponse;
    try {
      if (values.newPassword1 !== values.newPassword2) {
        throw new Error("New passwords don't match.");
      }
      const user = await checkIfLoggedIn();
      if (!user) throw new Error("Not logged in.");

      // Attempt to login with current password
      authResponse = await authServices.login({
        username: user.credentials.email,
        password: values.password
      });
      if (authResponse instanceof Error) throw new Error("Could not authorize current credentials.");

      let data = {
        _id: authResponse.credentials.id,
        password: values.newPassword1,
        user: authResponse
      }
      response = await userServices.put(data);
      if (response instanceof Error) throw response;

      asyncStore.save("user", JSON.stringify(response));
      this.clearForm(resetForm);
      this.props.navigation.navigate("ReporterLoginForm", {
        refresh: true
      });
      Toast.show({
        buttonText: "OK",
        text: "Password change successful. Please log in again.",
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

  clearForm = resetForm => {
    resetForm(initialValues);
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
                      <Label>Current</Label>
                      <Input
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={change => props.setFieldValue("password", change)}
                        value={props.values.password}
                      />
                    </Item>
                    <Item fixedLabel>
                      <Label>New</Label>
                      <Input
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={change => props.setFieldValue("newPassword1", change)}
                        value={props.values.newPassword1}
                      />
                    </Item>
                    <Item fixedLabel>
                      <Label>New Again</Label>
                      <Input
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={change => props.setFieldValue("newPassword2", change)}
                        value={props.values.newPassword2}
                      />
                    </Item>
                    <Button block
                      style={{ backgroundColor: colors.primary, margin: 15, marginTop: 25 }}
                      onPress={props.handleSubmit}
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

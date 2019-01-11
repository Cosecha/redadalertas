// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

// Vendor
import {
  Container, Content, Header, Form, Item, Input, Label, Button, Text, Toast
} from "native-base";
import { Formik } from "formik";

// Redadalertas
import authServices from "services/auth";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: "#F5FCFF"
  },
  input: {
    paddingTop: 15,
    paddingBottom: 15
  }
});

const initialValues = {
  username: '',
  password: ''
}

export default class ReporterLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialValues }
  }

  handleSubmit = async ()=> {
    try {
      let response = await authServices.login({ ...this.state });
      if (response instanceof Error) throw response;
      // store user details and basic auth credentials in local storage
      // to keep user logged in between page refreshes
      // localStorage.setItem('user', JSON.stringify(response));
      this.resetForm();
      this.props.navigation.navigate("ReportForm");
      Toast.show({
        buttonText: "OK",
        text: "User successfully logged in.",
        type: "success"
      });
    } catch (error) {
      Toast.show({
        buttonText: "OK",
        text: "Error logging in: " + error,
        type: "danger"
      });
    }
  };

  resetForm() {
    this.setState(initialValues);
  }

  render() {

    return (
      <Container
        onSubmit={this.onSubmit}
        style={styles.container}
      >
        <Header />
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>Username</Label>
              <Input
                placeholder="username@mail.com"
                style={styles.input}
                value={this.state.username}
                onChangeText={(username) => this.setState({
                  username: username.toLowerCase()
                })}
              />
            </Item>
            <Item fixedLabel>
              <Label>Password</Label>
              <Input
                placeholder="password"
                secureTextEntry={true}
                style={styles.input}
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
              />
            </Item>
            <Button style={{ marginLeft: 15 }} onPress={this.handleSubmit}>
              <Text>Sign In</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

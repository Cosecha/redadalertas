// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

// Vendor
import {
  Container, Content, Header, Form, Item, Input, Button, Text, Toast
} from "native-base";
import { Formik } from "formik";

// Redadalertas
import orgApi from "utils/orgApi";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  input: {
    width: "100%"
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
      console.log("handleSubmit state: ", this.state);
      await orgApi.put("/auth", this.state);
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
            <Item>
              <Input
                placeholder="Username"
                style={styles.input}
                value={this.state.username}
                onChangeText={(username) => this.setState({
                  username: username.toLowerCase()
                })}
              />
            </Item>
            <Item last>
              <Input
                placeholder="Password"
                secureTextEntry={true}
                style={styles.input}
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
              />
            </Item>
            <Button onPress={this.handleSubmit}>
              <Text>Sign In</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

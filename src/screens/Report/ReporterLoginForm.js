// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

// Vendor
import {
  Container,
  Content,
  Header,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Title,
  Toast
} from "native-base";
import { Formik } from "formik";

// Redadalertas
import { colors } from "styles";
import authServices from "services/auth";
import { checkIfLoggedIn } from "utils/user";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: colors.lightGray
  },
  input: {
    paddingTop: 15,
    paddingBottom: 15
  }
});

const initialValues = {
  username: "",
  password: ""
};

export default class ReporterLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialValues, user: null };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    this.willFocusSub = navigation.addListener("willFocus", async payload =>
      this.setState({ user: await checkIfLoggedIn() })
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state != nextState;
  }

  componentWillUnmount() {
    this.willFocusSub.remove();
    this.setState({ user: null });
  }

  handleSubmit = async () => {
    try {
      const response = await authServices.login({
        username: this.state.username,
        password: this.state.password
      });
      if (response instanceof Error) throw response;
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
        text: `Error logging in: ${error.message || error}`,
        type: "danger"
      });
    }
  };

  resetForm() {
    this.setState(initialValues);
  }

  render() {
    return (
      <Container onSubmit={this.onSubmit} style={styles.container}>
        <Header>
          <Title>Log In</Title>
        </Header>
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>Username</Label>
              <Input
                placeholder="username@mail.com"
                style={styles.input}
                value={this.state.username}
                onChangeText={username =>
                  this.setState({
                    username: username.toLowerCase()
                  })
                }
              />
            </Item>
            <Item fixedLabel>
              <Label>Password</Label>
              <Input
                placeholder="password"
                secureTextEntry
                style={styles.input}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
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

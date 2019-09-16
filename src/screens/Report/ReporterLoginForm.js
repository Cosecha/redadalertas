// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";

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
import { saveUserToken } from "reducers/user";

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

class ReporterLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialValues };
  }

  async componentDidMount() {
    this.willFocusSub = this.props.navigation.addListener(
      "willFocus",
      async payload => await this.handleWillFocus(payload)
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return ((this.state != nextState) || (this.props != nextProps));
  }

  componentWillUnmount() {
    this.willFocusSub.remove();
  }

  handleSubmit = async () => {
    try {
      const response = await authServices.login({
        username: this.state.username,
        password: this.state.password
      });
      if (response instanceof Error) throw response;
      await this.props.saveUserToken(response);
      this.resetForm();
      this.props.navigation.navigate("ReportForm");
      Toast.show({
        buttonText: "OK",
        text: "You will be logged in for 1 week.",
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

  handleWillFocus(payload) {
    const user = this.props.user;
    if (!user || Object.keys(user).length < 1 || user instanceof Error) {
      Toast.show({
        buttonText: "OK",
        text: "Please log in.",
        type: "danger"
      });
    } else {
      this.props.navigation.navigate("ReportForm");
    }
  }

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

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  saveUserToken: (user) => dispatch(saveUserToken(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReporterLoginForm);

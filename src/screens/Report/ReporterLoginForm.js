// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { withLocalize } from "react-localize-redux";

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
    const { translate } = this.props;
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
        text: `${translate("login.success")}`,
        type: "success"
      });
    } catch (error) {
      Toast.show({
        buttonText: "OK",
        text: `${translate("login.error")}: ${error.message || error}`,
        type: "danger"
      });
    }
  };

  handleWillFocus(payload) {
    const { translate, user } = this.props;
    if (!user || Object.keys(user).length < 1 || user instanceof Error) {
      Toast.show({
        buttonText: "OK",
        text: `${translate("login.please")}`,
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
    const { translate } = this.props;

    return (
      <Container onSubmit={this.onSubmit} style={styles.container}>
        <Header>
          <Title>{translate("login.login")}</Title>
        </Header>
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>{translate("login.username")}</Label>
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
              <Label>{translate("login.password")}</Label>
              <Input
                placeholder="password"
                secureTextEntry
                style={styles.input}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
            </Item>
            <Button style={{ marginLeft: 15 }} onPress={this.handleSubmit}>
              <Text>{translate("login.signin")}</Text>
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
)(withLocalize(ReporterLoginForm));

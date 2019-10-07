// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Translate, withLocalize } from "react-localize-redux";

// Vendor
import {
  Container, Content, H1, H2, H3, Button, Text, Item, Label, Input, Toast
} from 'native-base';
import { Formik } from "formik";

// Redadalertas
import { colors } from "styles";
import authServices from "services/auth";
import userServices from "services/user";
import { checkForUserLogin } from "utils/user";
import { saveUserToken } from "reducers/user";

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

class ChangePassword extends Component {
  static navigationOptions = ({ screenProps }) => ({
    title: screenProps.translate("password.change")
  });

  onSubmit = async (values, { resetForm }) => {
    const { translate } = this.props;
    try {
      if (values.newPassword1 !== values.newPassword2) {
        throw new Error("New passwords don't match.");
      }
      // Get user login info to get username
      const user = await checkForUserLogin();
      if (!user) throw new Error("Not logged in.");

      // Attempt to login with supplied current password
      const authResponse = await authServices.login({
        username: user.username,
        password: values.password
      });
      if (authResponse instanceof Error) throw new Error("Error logging in with current credentials.");

      // Update user with new password
      const data = {
        user: { username: authResponse.username },
        password: values.newPassword1
      }
      const response = await userServices.put(data);
      if (response instanceof Error) throw response;

      // Log in with new password to save new auth token on device
      const loginResponse = await authServices.login({
        username: response.data.email,
        password: values.newPassword2
      });
      if (loginResponse instanceof Error) throw new Error("Error logging in with new password.");
      await this.props.saveUserToken(loginResponse);

      this.clearForm(resetForm);
      this.props.navigation.navigate("SettingsPage", {
        refresh: true
      });
      Toast.show({
        buttonText: "OK",
        text: `${translate("password.success")}`,
        type: "success"
      });
    } catch (error) {
      Toast.show({
        buttonText: "OK",
        text: `${translate("password.error")}:` + (error.message || error),
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
    <Translate>
    {({ translate }) => (
      <View style={styles.view}>
        <Container>
          <Content style={styles.content}>
            <Formik initialValues={initialValues} onSubmit={this.onSubmit}>
              {props => (
                <Container>
                  <Content>
                    <Item fixedLabel>
                      <Label>{translate("password.current")}</Label>
                      <Input
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={change => props.setFieldValue("password", change)}
                        value={props.values.password}
                      />
                    </Item>
                    <Item fixedLabel>
                      <Label>{translate("password.new")}</Label>
                      <Input
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={change => props.setFieldValue("newPassword1", change)}
                        value={props.values.newPassword1}
                      />
                    </Item>
                    <Item fixedLabel>
                      <Label>{translate("password.newAgain")}</Label>
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
                      <Text>{translate("password.change")}</Text>
                    </Button>
                  </Content>
                </Container>
              )}
            </Formik>
          </Content>
        </Container>
      </View>
    )}
    </Translate>
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
)(withLocalize(ChangePassword));

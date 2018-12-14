// Setup
import React, { Component } from "react";
import { Picker, StyleSheet, View } from "react-native";

// Vendor
import {
  Button,
  CheckBox,
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
import { Formik } from "formik";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF"
  }
});

const types = [{ label: "Sweep", value: "sweep" }];

export default class ReportForm extends Component {
  render() {
    const { navigation } = this.props;
    const initialValues = {
      expire: {
        deleteOnExpire: false
      }
    };

    return (
      <Formik initialValues={initialValues} onSubmit={this.onSubmit}>
        {props => (
          <View style={styles.container}>
            <FormLabel>Description</FormLabel>
            <FormInput
              multiline
              onChangeText={props.handleChange("description")}
            />

            <Picker
              onValueChange={props.handleChange("type")}
              style={{ height: 50, width: 100 }}
              value={props.values.type}
            >
              {types.map(type => (
                <Picker.Item
                  key={type.value}
                  label={type.label}
                  value={type.value}
                />
              ))}
            </Picker>

            <CheckBox
              checked={props.values.expire.deleteOnExpire}
              onPress={props.handleChange("expire.deleteOnExpire")}
              title="Delete on Expire"
            />
          </View>
        )}
      </Formik>
    );
  }
}

// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

// Vendor
import {
  Body,
  CheckBox,
  Container,
  Content,
  Form,
  Header,
  Icon,
  Item,
  Input,
  Label,
  Left,
  Picker,
  Right,
  Textarea,
  Title
} from "native-base";
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
        deleteOnExpire: true
      },
      description: "test",
      type: types[0].value
    };

    return (
      <Formik initialValues={initialValues} onSubmit={this.onSubmit}>
        {props => (
          <Container>
            <Header>
              <Left />
              <Body>
                <Title>Report Event</Title>
              </Body>
              <Right />
            </Header>

            <Content>
              <Form>
                <Item style={{ marginLeft: 15 }} fixedLabel picker>
                  <Label>Type</Label>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    onValueChange={props.handleChange("type")}
                    placeholder="Select event type"
                    selectedValue={props.values.type}
                  >
                    {types.map(type => (
                      <Picker.Item
                        key={type.value}
                        label={type.label}
                        value={type.value}
                      />
                    ))}
                  </Picker>
                </Item>
                <Item floatingLabel>
                  <Label>Description</Label>
                  <Input
                    multiline
                    onChangeText={props.handleChange("description")}
                    value={props.values.description}
                  />
                </Item>
                <Item fixedLabel style={{ marginTop: 15 }}>
                  <Label>Delete on Expire?</Label>
                  <CheckBox
                    checked={props.values.expire.deleteOnExpire}
                    onPress={props.setFieldValue(
                      "expire.deleteOnExpire",
                      !props.values.expire.deleteOnExpire
                    )}
                    style={{ marginRight: 25, marginBottom: 2 }}
                  />
                </Item>
              </Form>
            </Content>
          </Container>
        )}
      </Formik>
    );
  }
}

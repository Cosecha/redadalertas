// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

// Vendor
import {
  Body,
  Button,
  CheckBox,
  Container,
  Content,
  Form,
  Header,
  Icon,
  Item,
  Input,
  Label,
  Picker,
  Text,
  Title
} from "native-base";
import { Formik } from "formik";

const types = [
  { label: "Checkpoint", value: "checkpoint" },
  { label: "Sweep", value: "sweep" }
];

export default class ReportForm extends Component {
  onSubmit = values => {
    console.log(values);
  };

  render() {
    const { navigation } = this.props;
    const initialValues = {
      expire: {
        deleteOnExpire: true
      },
      description: "",
      location: {
        address: "",
        geo: {
          latitude: "",
          longitude: ""
        }
      },
      type: types[0].value
    };

    return (
      <Formik initialValues={initialValues} onSubmit={this.onSubmit}>
        {props => (
          <Container>
            <Header>
              <Body>
                <Title>Report Event</Title>
              </Body>
            </Header>

            <Content>
              <Form>
                <Item style={{ marginLeft: 15 }} fixedLabel>
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
                <Item>
                  <Label>Location</Label>
                  <Input
                    multiline
                    editable={false}
                    value={props.values.location.address}
                  />
                  <Button
                    bordered
                    onPress={() =>
                      navigation.navigate("EditLocation", {
                        setLocation: location => {
                          const { address, latitude, longitude } = location;

                          props.setFieldValue("location.address", address);
                          props.setFieldValue(
                            "location.geo.latitude",
                            latitude
                          );
                          props.setFieldValue(
                            "location.geo.longitude",
                            longitude
                          );
                        }
                      })
                    }
                    small
                    style={{ marginTop: 10, marginBottom: 10, marginRight: 10 }}
                  >
                    <Text>
                      {props.values.location.address ? "Edit" : "Add"}
                    </Text>
                  </Button>
                </Item>
                <Item fixedLabel style={{ marginTop: 15 }}>
                  <Label style={{ marginBottom: 15 }}>Delete on Expire?</Label>
                  <CheckBox
                    checked={props.values.expire.deleteOnExpire}
                    onPress={() =>
                      props.setFieldValue(
                        "expire.deleteOnExpire",
                        !props.values.expire.deleteOnExpire
                      )
                    }
                    style={{ marginRight: 25, marginBottom: 15 }}
                  />
                </Item>

                <Button onPress={props.handleSubmit}>
                  <Text>Submit</Text>
                </Button>
              </Form>
            </Content>
          </Container>
        )}
      </Formik>
    );
  }
}

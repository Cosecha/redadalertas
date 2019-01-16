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
  DatePicker,
  Fab,
  Form,
  Header,
  Icon,
  Item,
  Input,
  Label,
  Picker,
  Text,
  Title,
  Toast
} from "native-base";
import { Formik } from "formik";

// Redadalertas
import { colors } from "styles";
import eventServices from "services/event";
import asyncStore from "utils/asyncstorage";

const types = [
  { label: "Raid", value: "sweep" },
  { label: "Individual", value: "targeted" },
  { label: "Traffic Stop", value: "traffic" },
  { label: "I-9 Audit", value: "i9" },
  { label: "Checkpoint", value: "checkpoint" },
  { label: "Action", value: "action" },
  { label: "False Alarm", value: "falsealarm" },
  { label: "Other", value: "other" },
];
const initialValues = {
  expire: {
    at: new Date(),
    deleteOnExpire: true
  },
  description: {
    en: "",
    es: ""
  },
  location: {},
  present: [],
  type: types[0].value
};

export default class ReportForm extends Component {
  state = { agencyInputValue: "" };

  onSubmit = async (values, { resetForm }) => {
    try {
      const user = JSON.parse(await asyncStore.retrieve('user'));
      let data = {
        ...values,
        "created.by.user": user.credentials.id,
        user: user
      }
      let response = await eventServices.post(data);
      if (response instanceof Error) throw response;
      this.clearForm(resetForm);
      this.props.navigation.navigate("EventsMap", { refresh: true });
      Toast.show({
        buttonText: "OK",
        text: "Event submitted!",
        type: "success"
      });
    } catch (error) {
      Toast.show({
        buttonText: "OK",
        text: "Error submitting report: " + error,
        type: "danger"
      });
    }
  };

  clearForm = resetForm => {
    resetForm(initialValues);
    this.setState({ agencyInputValue: "" });
  };

  render() {
    const { navigation } = this.props;
    const { agencyInputValue } = this.state;

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
                    iosIcon={<Icon name="ios-arrow-dropdown" />}
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
                <Item>
                  <Label>Present Agencies</Label>
                  <Input
                    onChangeText={value => {
                      const agencies = value
                        .split(",")
                        .map(agency => ({ agency: agency.trim() }));
                      props.setFieldValue("present", agencies);
                      this.setState({ agencyInputValue: value });
                    }}
                    style={{ paddingTop: 15, paddingBottom: 15 }}
                    value={agencyInputValue}
                  />
                </Item>
                <Item>
                  <Label>Description (EN)</Label>
                  <Input
                    multiline
                    onChangeText={props.handleChange("description.en")}
                    style={{ paddingTop: 15, paddingBottom: 15 }}
                    value={props.values.description.en}
                  />
                </Item>
                <Item>
                  <Label>Description (ES)</Label>
                  <Input
                    multiline
                    onChangeText={props.handleChange("description.es")}
                    style={{ paddingTop: 15, paddingBottom: 15 }}
                    value={props.values.description.es}
                  />
                </Item>
                <Item>
                  <Label>Location</Label>
                  <Input
                    multiline
                    editable={false}
                    style={{ paddingTop: 15, paddingBottom: 15 }}
                    value={props.values.location.address_1}
                  />
                  <View style={{ alignItems: "center" }}>
                    <Button
                      bordered
                      onPress={() =>
                        navigation.navigate("EditLocation", {
                          setLocation: location =>
                            props.setFieldValue("location", location)
                        })
                      }
                      small
                      style={{ marginRight: 10 }}
                    >
                      <Text>
                        {props.values.location.address ? "Edit" : "Add"}
                      </Text>
                    </Button>
                  </View>
                </Item>
                <Item>
                  <View>
                    <View
                      style={{
                        alignItems: "center",
                        flexDirection: "row"
                      }}
                    >
                      <Label style={{ paddingTop: 15, paddingBottom: 15 }}>
                        Expires On
                      </Label>
                      <DatePicker
                        animationType="fade"
                        defaultDate={new Date()}
                        formatChosenDate={date => date.toString().substr(4, 12)}
                        onDateChange={date =>
                          props.setFieldValue("expire.at", date)
                        }
                      />
                    </View>
                    <Text style={{ color: colors.lightGray }}>
                      Expires at the end of selected day.
                    </Text>
                  </View>
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
              </Form>
            </Content>
            <Fab
              style={{ backgroundColor: colors.primary }}
              onPress={props.handleSubmit}
            >
              <Icon name="add" />
            </Fab>
          </Container>
        )}
      </Formik>
    );
  }
}
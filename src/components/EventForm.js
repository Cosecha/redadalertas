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
import { checkIfLoggedIn } from "utils/user";
import { addHours } from "utils/formatting";

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
    at: addHours(Date.now(), 12), // 12 hours from now
    deleteOnExpire: false
  },
  description: "",
  // TO-DO: Switch to object when i18n is fixed
  // {
  //   en: "",
  //   es: ""
  // },
  location: {},
  present: [],
  type: types[0].value
};
const initialState = { agencyInputValue: "", expireAt: 12 };

export default class EventForm extends Component {
  state = initialState;

  componentDidMount() {
    const { eventToEdit } = this.props || null;
    if (eventToEdit) {
      const agencyString = eventToEdit.present.map(a=> {return a.agency}).toString();
      this.setState({
        agencyInputValue: agencyString,
        expireAt: null
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state != nextState;
  }

  onSubmit = async (values, { resetForm }) => {
    let response;
    try {
      const user = await checkIfLoggedIn();
      if (!user) throw new Error("Not logged in.");
      let data = {
        ...values,
        user: user
      }
      if (data.updated) delete data["updated"];
      if (this.props.newEvent === true) {
        // If new event, add user info
        data["created.by.user"] = user.credentials.id;
        response = await eventServices.post(data);
      } else {
        // If updating event, add event _id, fix/remove server-generated data
        if (data.created) delete data["created"];
        if (typeof data.description == 'string') {
          // TO-DO: remove this when server i18n is fixed
          const i18nDesc = { en: data.description }
          data.description = i18nDesc;
        }
        data._id = data.id;
        delete data["id"];
        response = await eventServices.put(data);
      }
      if (response instanceof Error) throw response;
      this.clearForm(resetForm);
      this.props.nav.navigate("EventsMap", {
        refresh: true,
        event: response.data[0]
      });
      Toast.show({
        buttonText: "OK",
        text: "Event submitted!",
        type: "success"
      });
    } catch (error) {
      Toast.show({
        buttonText: "OK",
        text: "Error submitting report: " + (error.message || error),
        type: "danger"
      });
    }
  };

  clearForm = resetForm => {
    if (this.props.newEvent) {
      resetForm(initialValues);
      this.setState(initialState);
    }
  };

  render() {
    const { nav } = this.props;
    const { eventToEdit } = this.props || null;
    const { agencyInputValue, expireAt } = this.state;

    return (
      <Formik initialValues={eventToEdit || initialValues} onSubmit={this.onSubmit}>
        {props => (
          <Container>
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
                    onChangeText={(change)=> {
                      props.setFieldValue("description", change);
                    }}
                    style={{ paddingTop: 15, paddingBottom: 15 }}
                    value={props.values.description}
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
                        nav.navigate("EditLocation", {
                          setLocation: location =>
                            props.setFieldValue("location", location)
                        })
                      }
                      small
                      style={{ marginRight: 10 }}
                    >
                      <Text>
                        {props.values.location.address_1 ? "Edit" : "Add"}
                      </Text>
                    </Button>
                  </View>
                </Item>
                <Item style={{ marginLeft: 15 }} fixedLabel>
                      <Label style={{ paddingTop: 15, paddingBottom: 15 }}>
                        Expires
                      </Label>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="ios-arrow-dropdown" />}
                        onValueChange={(change)=>{
                          // Format expire.at to current time + selected # of hours in milliseconds
                          props.setFieldValue(
                            "expire.at",
                            addHours(Date.now(), change)
                          );
                          // Save # of hours to display
                          this.setState({ expireAt: change });
                        }}
                        placeholder={this.props.newEvent ? "Select expiration time" : "Change expiration time"}
                        selectedValue={expireAt}
                      >
                        {[1,2,4,8,12,24,48,72].map(time => (
                          <Picker.Item
                            key={time}
                            label={time + " hour" + (time !== 1 ? "s" : "") + " from now"}
                            value={time}
                          />
                        ))}
                      </Picker>
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
              <Button block
                style={{ backgroundColor: colors.primary, margin: 15 }}
                onPress={props.handleSubmit}
              >
                <Text>{(this.props.newEvent) ? "Submit" : "Submit Changes"}</Text>
              </Button>
            </Content>
          </Container>
        )}
      </Formik>
    );
  }
}

// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Translate, withLocalize } from "react-localize-redux";

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
import TranslationInput from "components/TranslationInput";
import { colors } from "styles";
import eventServices from "services/event";
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
  description: {
    en: "",
    es: "",
    fr: ""
  },
  location: {},
  present: [],
  type: types[0].value
};
const initialState = { agencyInputValue: "", expireAt: 12 };

class EventForm extends Component {
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
    const { translate } = this.props;
    let response;
    try {
      const user = this.props.user;
      if (!user) throw new Error(translate("login.please"));

      let data = { ...values }

      if (this.props.newEvent === true) {
        response = await eventServices.post(data);
      } else {
        // If updating event, remove server-generated data
        if (data.created) delete data["created"];
        if (data.updated) delete data["updated"];

        response = await eventServices.put(data);
      }
      if (response instanceof Error) throw response.response || response;
      this.clearForm(resetForm);
      this.props.nav.navigate("EventsMap", {
        refresh: true,
        event: response.data[0]
      });
      Toast.show({
        buttonText: "OK",
        text: (this.props.newEvent === true) ? translate("report.submitted") : translate("event.updated"),
        type: "success"
      });
    } catch (error) {
      const message = error.data.message || error.message || false;
      Toast.show({
        buttonText: "OK",
        text: `${translate("report.error")}: ` + (message || error),
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
    const { header } = this.props || <></>;
    const { agencyInputValue, expireAt } = this.state;

    return (
      <Translate>
      {({ translate }) => (
      <Formik initialValues={eventToEdit || initialValues} onSubmit={this.onSubmit}>
        {props => (
          <Container>
            {header}
            <Content>
              <Form>
                <Item style={{ marginLeft: 15 }} fixedLabel>
                  <Label>{translate("report.type")}</Label>
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
                        label={translate("event.type." + type.value)}
                        value={type.value}
                      />
                    ))}
                  </Picker>
                </Item>
                <Item>
                  <Label>{translate("report.present")}</Label>
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
                <TranslationInput
                  fieldName={translate("report.description")}
                  fieldValue="description"
                  formikProps={props}
                />
                <Item>
                  <Label>{translate("report.location")}</Label>
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
                        {props.values.location.address_1 ? translate("geo.edit") : translate("geo.add")}
                      </Text>
                    </Button>
                  </View>
                </Item>
                <Item style={{ marginLeft: 15 }} fixedLabel>
                      <Label style={{ paddingTop: 15, paddingBottom: 15 }}>
                        {translate("report.expires")}
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
                        placeholder={this.props.newEvent ? translate("report.selectExpire") :
                        translate("report.changeExpire")}
                        selectedValue={expireAt}
                      >
                        {[1,2,4,8,12,24,48,72].map(time => (
                          <Picker.Item
                            key={time}
                            label={time + " " +
                            translate("report.hours", { s: (time !== 1 ? "s" : "") }) +
                            " " + translate("report.fromNow")}
                            value={time}
                          />
                        ))}
                      </Picker>
                </Item>
              </Form>
              <Button block
                style={{ backgroundColor: colors.primary, margin: 15 }}
                onPress={props.handleSubmit}
              >
                <Text>{
                (this.props.newEvent) ?
                  translate("report.submit") : translate("report.change")
                }</Text>
              </Button>
            </Content>
          </Container>
        )}
      </Formik>
    )}
    </Translate>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  null
)(withLocalize(EventForm));

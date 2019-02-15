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
import EventForm from "components/EventForm";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

export default class ReportForm extends Component {

  render() {
    const { navigation } = this.props;
    const header = (
      <Header>
        <Body>
          <Title>Report Event</Title>
        </Body>
      </Header>
    );

    return (
      <Container style={styles.container}>
        <Content>
          <EventForm
            header={header}
            nav={navigation}
            newEvent={true}
          />
        </Content>
      </Container>
    );
  }
}

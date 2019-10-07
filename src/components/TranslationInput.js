// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Translate, withLocalize, getLanguages } from "react-localize-redux";

// Vendor
import {
  Content,
  Item,
  Input,
  Label
} from "native-base";

// Redadalertas
import { colors } from "styles";

class TranslationInput extends Component {

  render() {
    const { languages, fieldName, fieldValue, formikProps } = this.props;

    return (
      <Content style={{ paddingLeft: 15, paddingRight: 15 }}>
      { languages.map((lang, index) => {
        return (<Item key={"input" + index}>
          <Label>{fieldName} ({lang.code.toUpperCase()})</Label>
          <Input
            multiline
            onChangeText={(change)=> {
              const fieldValTranslate = fieldValue + "." + lang.code;
              formikProps.setFieldValue(fieldValTranslate, change);
            }}
            style={{ paddingTop: 15, paddingBottom: 15 }}
            value={formikProps.values[fieldValue][lang.code]}
          />
        </Item>)
      })}
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  languages: getLanguages(state.localize)
});

export default connect(
  mapStateToProps,
  null
)(withLocalize(TranslationInput));

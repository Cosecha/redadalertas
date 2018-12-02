// Setup
import React, { Component } from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";

// Redadalertas
import IconBase from "ui/IconBase";

const TabBarIcon = ({ color, name }) => {
  const iconName = Platform.select({
    ios: `ios-${name}`,
    android: `md-${name}`
  });
  return <IconBase color={color} name={iconName} size={25} />;
};

TabBarIcon.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default TabBarIcon;

// Setup
import React, { Component } from "react";
import PropTypes from "prop-types";

// Vendor
import { Icon } from "react-native-elements";

const IconBase = ({ color, name, size }) => (
  <Icon name={name} type="ionicon" color={color} size={size} />
);

IconBase.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
};

export default IconBase;

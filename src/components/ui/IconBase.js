// Setup
import React, { Component } from "react";
import PropTypes from "prop-types";

// Vendor
import { Icon } from "native-base";

const IconBase = ({ color, name, size }) => (
  <Icon name={name} type="Ionicons" style={{ color: color, fontSize: size }} />
);

IconBase.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
};

export default IconBase;

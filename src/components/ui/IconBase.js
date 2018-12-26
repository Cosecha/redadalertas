// Setup
import React from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";

// Vendor
import { Icon } from "native-base";

const IconBase = ({ color, name, size }) => {
  const iconName = Platform.select({
    ios: `ios-${name}`,
    android: `md-${name}`
  });
  return (
    <Icon name={iconName} type="Ionicons" style={{ color, fontSize: size }} />
  );
};

IconBase.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.number
};

IconBase.defaultProps = {
  size: 27
};

export default IconBase;

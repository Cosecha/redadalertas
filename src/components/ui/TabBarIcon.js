// Setup
import React from "react";
import PropTypes from "prop-types";

// Redadalertas
import IconBase from "ui/IconBase";

const TabBarIcon = ({ color, name }) => (
  <IconBase color={color} name={name} size={25} />
);

TabBarIcon.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default TabBarIcon;

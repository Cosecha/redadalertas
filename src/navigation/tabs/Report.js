// Setup
import React from "react";

// Vendor
import { createSwitchNavigator } from "react-navigation";

// Redadalertas
import ReportForm from "components/ReportForm";
import ReporterLoginForm from "components/ReporterLoginForm";

const ReportTab = createSwitchNavigator(
  {
    ReportForm: ReportForm,
    ReporterLoginForm: ReporterLoginForm
  },
  {
    initialRouteName: "ReporterLoginForm"
  }
);

export default ReportTab;

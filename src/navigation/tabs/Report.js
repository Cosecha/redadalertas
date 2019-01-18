// Vendor
import { createStackNavigator, createSwitchNavigator } from "react-navigation";

// Redadalertas
import EditLocation from "screens/Shared/EditLocation";
import ReportForm from "screens/Report/ReportForm";
import ReporterLoginForm from "screens/Report/ReporterLoginForm";

const Report = createSwitchNavigator(
  {
    ReportForm,
    ReporterLoginForm
  },
  {
    initialRouteName: "ReporterLoginForm"
  }
);

const ReportTab = createStackNavigator(
  {
    Report,
    EditLocation
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

export default ReportTab;

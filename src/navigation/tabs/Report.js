// Vendor
import { createStackNavigator, createSwitchNavigator } from "react-navigation";

// Redadalertas
import EditLocation from "screens/Report/EditLocation";
import ReportForm from "components/ReportForm";
import ReporterLoginForm from "components/ReporterLoginForm";

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

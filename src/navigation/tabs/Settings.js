// Vendor
import { createStackNavigator } from "react-navigation";

// Redadalertas
import SettingsPage from "screens/Settings/SettingsPage";
import ChangePassword from "screens/Settings/ChangePassword";

const Settings = createStackNavigator(
  {
    SettingsPage,
    ChangePassword
  },
  {
    initialRouteName: "SettingsPage"
  }
);

const SettingsTab = createStackNavigator(
  {
    Settings
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

export default SettingsTab;

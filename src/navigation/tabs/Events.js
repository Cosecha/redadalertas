// Vendor
import { createStackNavigator } from "react-navigation";

// Redadalertas
import EditLocation from "screens/Shared/EditLocation";
import EventsMap from "screens/Events/EventsMap";
import EventPage from "screens/Events/EventPage";
import EventEdit from "screens/Events/EventEdit";

const Events = createStackNavigator(
  {
    EventsMap,
    EventPage,
    EventEdit
  }
);

const EventsTab = createStackNavigator(
  {
    Events,
    EditLocation
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

export default EventsTab;

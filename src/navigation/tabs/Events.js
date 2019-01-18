// Vendor
import { createStackNavigator } from "react-navigation";

// Redadalertas
import EventsMap from "screens/Events/EventsMap";
import EventPage from "screens/Events/EventPage";
import EventEdit from "screens/Events/EventEdit";

const EventsTab = createStackNavigator({
  EventsMap,
  EventPage,
  EventEdit
});

export default EventsTab;

// Vendor
import { createStackNavigator } from "react-navigation";

// Redadalertas
import EventsMap from "screens/Events/EventsMap";
import EventPage from "components/EventPage";

const EventsTab = createStackNavigator({
  EventsMap,
  EventPage
});

export default EventsTab;

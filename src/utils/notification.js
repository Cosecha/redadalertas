import firebase from 'react-native-firebase';

// Use this class to create a local notification, display it, or schedule it to
// display later. You can intialize it with all options at once, or set them
// one by one later.
//
// You can also access the underlying firebase notification with
// this.firebaseNotification, if needed, but try to avoid doing so. If
// possible, add logic to this class to cover the behavior you need so that we
// avoid revealing react-native-firebase API to the rest of our app.
export class Notification {
  constructor(options) {
    const { body, data, id, title } = options;
    this.firebaseNotification = new firebase.notifications.Notification();

    if (id) { this.setId(id) }
    if (body) { this.setBody(body) }
    if (data) { this.setData(data) }
    if (title) { this.setTitle(title) }
  }

  display() {
    firebase.notifications().displayNotification(this.firebaseNotification)
  }

  schedule(date) {
    firebase.notifications().scheduleNotification(this.firebaseNotification, {
      fireDate: date.getTime(),
    })
  }

  setBody(body) {
    this.firebaseNotification.setBody(body);
    this.body = body;
  }

  setData(data) {
    this.firebaseNotification.setData(data);
    this.data = data;
  }

  setId(id) {
    this.firebaseNotification.setNotificationId(id);
    this.id = id;
  }

  setTitle(title) {
    this.firebaseNotification.setTitle(title);
    this.title = title;
  }
}

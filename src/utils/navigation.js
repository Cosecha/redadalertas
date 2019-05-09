// Vendor
import { NavigationActions } from 'react-navigation';

let navigator;

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function setNavigator(navigatorRef) {
  navigator = navigatorRef;
}

// add other navigation functions that you need and export them

export {
  navigate,
  setNavigator,
};

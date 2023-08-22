import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { AppNavigator } from "./src/AppNavigator";
import store from "./src/store";
const App = () => {
 
  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
  );
};

export default App;

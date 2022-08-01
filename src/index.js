import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
const container = document.getElementById("root");
const root = createRoot(container);

//use localStorage to store the state.
// store.subscribe(
//   // we use debounce to save the state once each 800ms
//   // for better performances in case multiple changes occur in a short time

//   localStorage.setItem("todos", JSON.stringify(store.getState()))
// );

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
  // document.getElementById("root")
);

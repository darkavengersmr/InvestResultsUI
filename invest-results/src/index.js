import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./components/app";
import ErrorBoundry from "./components/error-boundry"
import ApiService from "./services/api-service"
import { ApiServiceContext } from "./components/app-contexts";
import store from "./redux-store/store"

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const apiService = new ApiService();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ErrorBoundry>
        <ApiServiceContext.Provider value={apiService}>
            <Router>
              <App />
            </Router>
        </ApiServiceContext.Provider>
    </ErrorBoundry>
  </Provider>,
  
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

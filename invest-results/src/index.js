import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./components/app";
import ErrorBoundry from "./components/error-boundry"
import ApiService from "./services/api-service"
import { InvestResultsServiceProvider } from "./components/invest-results-service-context";
import store from "./redux-store/store"

const apiService = new ApiService();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ErrorBoundry>
      <InvestResultsServiceProvider value={apiService}>
        <Router>
          <App />
        </Router>
      </InvestResultsServiceProvider>
    </ErrorBoundry>
  </Provider>,
  
);
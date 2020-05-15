// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React from 'react';
import './App.css';
import * as microsoftTeams from "@microsoft/teams-js";
import { TeamsIcon } from '@fluentui/react-icons-northstar'; //https://fluentsite.z22.web.core.windows.net/icon-viewer
import { BrowserRouter as Router, Route } from "react-router-dom";

import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import GroupTab from './GroupTab';
import GroupTabConfig from './GroupTabConfig';

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
function App() {
  // Check for the Microsoft Teams SDK object.
  if (microsoftTeams) {

    // Set app routings that don't require microsoft Teams
    // SDK functionality.  Show an error if trying to access the
    // Home page.
    if (window.parent === window.self) {
      return (
        <Router>
          <Route exact path="/privacy" component={Privacy} />
          <Route exact path="/termsofuse" component={TermsOfUse} />
          <Route exact path="/group" component={TeamsHostError} />
          <Route exact path="/config" component={TeamsHostError} />
        </Router>
      );
    }

    // Initialize the Microsoft Teams SDK
    microsoftTeams.initialize(window);

    // Display the app home page hosted in Teams
    return (
      <Router>
        <Route exact path="/group" component={GroupTab} />
        <Route exact path="/config" component={GroupTabConfig} />
      </Router>
    );
  }

  // Error when the Microsoft Teams SDK is not found
  // in the project.
  return (
    <h3>Microsoft Teams SDK not found.</h3>
  );
}

/**
 * This component displays an error message in the
 * case when a page is not being hosted within Teams.
 */
class TeamsHostError extends React.Component {
  render() {
    return (
      <div>
        <TeamsIcon/>
        <h3 className="Error">Teams client host not found.</h3>
      </div>
    );
  }
}

export default App;

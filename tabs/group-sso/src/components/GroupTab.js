// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React from 'react';
import './App.css';
import * as microsoftTeams from "@microsoft/teams-js";
import { TeamsIcon } from '@fluentui/react-icons-northstar'; //https://fluentsite.z22.web.core.windows.net/icon-viewer
import { Avatar } from '@fluentui/react-northstar' //https://fluentsite.z22.web.core.windows.net/components/avatar/definition
import authService from "./../services/auth.service";
import userService from './../services/user.service';

/**
 * The 'GroupTab' component renders the main tab content
 * of your app.
 */
class GroupTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      loading: false,
      userImage: null,
      context: {}
    }
  }

  //React lifecycle method that gets called once a component has finished mounting
  //Learn more: https://reactjs.org/docs/react-component.html#componentdidmount
  componentDidMount() {
    authService
      .login()
      .then(user => {
        if (user) {
          userService
            .getImage(true, user.tid)
            .then(userImage => {

              // Get the user context from Teams and set it in the state
              microsoftTeams.getContext((context, error) => {
                this.setState({
                  user,
                  loading: false,
                  userImage: userImage,
                  context: context
                });
              });

            })
            .catch(error => {
              console.error(error);
              if (
                error.statusCode === 403 &&
                error.statusMessage === "ConsentRequired"
              ) {
                this.props.setConsentRequired && this.props.setConsentRequired(true);
              }
            });

        } else {
          this.setState({ loading: false });
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ loading: false });
      });
    // Next steps: Error handling using the error object
  }

  render() {

    let userName = Object.keys(this.state.context).length > 0 ? this.state.context['upn'] : "";

    return (
      <div>
        <TeamsIcon/>
        <h1>Congratulations {userName}! This is the group tab you made :-)</h1>
        <Avatar
          image={this.state.userImage}
          size="large"
          status="unknown"
        />
      </div>
    );
  }
}
export default GroupTab;
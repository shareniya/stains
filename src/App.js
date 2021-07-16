import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard/DashboardPM/index.js";
import PageTracker from "./utils/PageTracker";
import Auth from "./utils/Auth";
import Callback from "./utils/Callback";
import LandingPage from "./components/LandingPage";
import Profile from "./components/Profile";
import AuditLog from "./components/Dashboard/DashboardAdmin/AuditLog";
import Apps from "./components/Shared/Apps";
import TechStacks from "./components/Shared/TechStacks";
import HistoryApps from "./components/Dashboard/DashboardPM/HistoryApps";
import ActiveApps from "./components/Shared/ActiveApplication";
import Users from "./components/Shared/Users";
import AdminDashboard from "./components/Dashboard/DashboardAdmin/index.js";
import NotFound from "./utils/Error/404";
import EmploymentType from "./components/Dashboard/DashboardAdmin/EmploymentType";
import RolesType from "./components/Dashboard/DashboardAdmin/UserRoles";
import CreateApp from "./components/Shared/CreateApplication"
import LoginHistory from "./components/Shared/LoginHistory";
import ProtectedRoute from "./utils/ProtectedRoute";
import UsersInterface from "./components/HomePage/UsersInterface";
import AppsInterface from "./components/HomePage/AppsInterface";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }

  render() {
    PageTracker();
    return (
      <>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <LandingPage auth={this.auth} {...props} />}
          />
          <Route
            exact
            path="/callback"
            render={(props) => <Callback auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/home"
            render={(props) => <HomePage auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/dashboard"
            render={(props) => <Dashboard auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/profile"
            render={(props) => <Profile auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/auditlog"
            render={(props) => <AuditLog auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/applications"
            render={(props) => <Apps auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/activeapps"
            render={(props) => <ActiveApps auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/historyapps"
            render={(props) => <HistoryApps auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/users"
            render={(props) => <Users auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/techstacks"
            render={(props) => <TechStacks auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/admin"
            render={(props) => <AdminDashboard auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/admin/employmenttypes"
            render={(props) => <EmploymentType auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/admin/userroles"
            render={(props) => <RolesType auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/createapp"
            render={(props) => <CreateApp auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/loginhistory"
            render={(props) => <LoginHistory auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/usersdash"
            render={(props) => <UsersInterface auth={this.auth} {...props} />}
          />
          <ProtectedRoute
            exact
            path="/appsdash"
            render={(props) => <AppsInterface auth={this.auth} {...props} />}
          />
          <Route
            render={(props) => <NotFound auth={this.auth} {...props}  />}/>
        </Switch>
      </>
    );
  }
}

export default App;

import React from "react";
import Admin from "./Admin/index";
import Dashboard from "./Admin/Dashboard";
import RegisterShop from "./Admin/RegisterShop";
import Inventory from "./Admin/Inventory";
import User from "./User";
import Cart from "./User/Cart";
import AdminLogin from "./Admin/Login/AdminLogin";
import Login from "./User/Login/Login";
import Register from "./User/Login/Register";
import AdminRegister from "./Admin/Login/AdminRegister";
import AdminProtectedRoute from "./Admin/ProtectedRoute/AdminProtectedRoute";
import UserProtectedRoute from "./User/ProtectedRoute/UserProtectedRoute";
import Store from "./User/Map/UserProductView";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "leaflet/dist/leaflet.js";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.js";

import { Provider } from "react-redux";
import store from "./redux/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./redux/auth/authActions";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());

    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <AdminProtectedRoute exact path="/admin" component={Admin} />
          <AdminProtectedRoute
            path="/dashboard"
            component={Dashboard}
          ></AdminProtectedRoute>
          <AdminProtectedRoute
            path="/registershop"
            component={RegisterShop}
          ></AdminProtectedRoute>
        </Switch>
        <Switch>
          <AdminProtectedRoute
            path="/inventory"
            component={Inventory}
          ></AdminProtectedRoute>
          <UserProtectedRoute
            path="/user"
            component={User}
          ></UserProtectedRoute>
          <UserProtectedRoute
            path="/cart"
            component={Cart}
          ></UserProtectedRoute>
        </Switch>
        <Route path="/adminlogin" component={AdminLogin}></Route>
        <Route path="/adminregister" component={AdminRegister}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/store/:storeId" component={Store}></Route>
      </Router>
    </Provider>
  );
}

export default App;

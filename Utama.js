import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
// Load Navbar
import Navbar from "./component/Navbar";
// Load halaman
import Produk from "./Client/Produk";
import Cart from "./Client/Cart";
import Products from "./page/Products";
import User from "./page/User";
import Profil from "./page/Profil";
import Login from "./page/Login";
import Register from "./page/Register";
import Order from "./page/Orders";
import Checkout from "./page/Checkout";

class Utama extends Component {
  render = () => {
    return (
      <Switch>
        {/* Load component tiap halaman */}
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>

        <Route path="/products">
          <Navbar />
          <Products />
        </Route>

        <Route path="/user">
          <Navbar />
          <User />
        </Route>

        <Route path="/client">
          <Navbar />
          <Produk />
        </Route>

        <Route path="/cart">
          <Navbar />
          <Cart />
        </Route>

        <Route path="/profil">
          <Navbar />
          <Profil />
        </Route>

        <Route path="/orders">
          <Navbar />
          <Order />
        </Route>

        <Route path="/checkout">
          <Navbar />
          <Checkout />
        </Route>
 

      </Switch>
    );
  }
}

export default Utama;

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from 'pages/App';
import Login from 'pages/Login';
import Register from 'pages/Register';
import NotFound from 'pages/NotFound';
import Cart from 'pages/Cart';
import Contact from 'pages/Contact';
import First from 'pages/First';
<<<<<<< HEAD
import Member from 'pages/Member';
import Detail from 'components/Transaction/Detail';

=======
import AboutUs from 'pages/AboutUs';
import FAQ from 'pages/FAQ';
import Guide from 'pages/Guide';
import Rules from 'pages/Rules';
>>>>>>> 50047671186aacb4ee30fa3b3f0494699ef3ae58

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/cart" component={Cart} />
      <Route path="/contact" component={Contact} />
      <Route path="/first" component={First} />
<<<<<<< HEAD
      <Route path="/member" component={Member} />
      <Route path="/detail" component={Detail} />
      
=======
      <Route path="/aboutus" component={AboutUs} />
      <Route path="/FAQ" component={FAQ} />
      <Route path="/guide" component={Guide} />
      <Route path="/rules" component={Rules} />
>>>>>>> 50047671186aacb4ee30fa3b3f0494699ef3ae58
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;

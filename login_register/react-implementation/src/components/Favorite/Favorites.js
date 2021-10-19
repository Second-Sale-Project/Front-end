import React, { useState } from 'react';
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Favorite from './Favorite';
import { withRouter } from 'react-router-dom';

class Favorites extends React.Component {
  state = {
    products: [],
    sourceProducts: [],
  };
  componentDidMount() {
    if (!global.auth.isLogin()) {
      this.props.history.push("/login")
      return
    }
    const user = global.auth.getUser() || {}
    const UserEmail = user.email
    const isStaff = user.isStaff
    axios.post('http://140.117.71.141:3001/api/favorite',{
      UserEmail,
      isStaff
    }).then(response => {
      console.log(response);
      this.setState({
        products: response.data,
        sourceProducts: response.data
      });
    });
  }



  render() {
    return (
      <div>
        
        <div className="products">
          {/* <div className="columns is-multiline is-mobile"> */}
            <TransitionGroup component={null}>
              {this.state.products.map(p => {
                return (
                  <CSSTransition
                    classNames="product-fade"
                    timeout={300}
                    key={p.pId}
                  >

                    <div className="" key={p.pId}>

                      <Favorite
                        product={p}
                      />
                    </div>

                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          {/* </div> */}
        </div>
        
      </div>
    );
  }
}

export default withRouter(Favorites);
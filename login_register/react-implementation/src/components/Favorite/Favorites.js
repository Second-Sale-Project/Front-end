import React, { useState } from 'react';
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Favorite from './Favorite';

class Favorites extends React.Component {
  state = {
    products: [],
    sourceProducts: [],
  };
  componentDidMount() {
    const user = global.auth.getUser() || {}
    const UserEmail = user.email
    const isStaff = user.isStaff
    console.log(UserEmail);
    axios.post('http://localhost:3001/api/favorite',{
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
                    key={p.id}
                  >

                    <div className="" key={p.id}>

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

export default Favorites;
import React from 'react';
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ToolBox from 'components/ToolBox';
import Product from 'components/Product';
import AddInventory from 'pages/AddInventory';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Products extends React.Component {
  state = {
    products: [],
    sourceProducts: [],
    cartNum: 0,
  }


  componentDidMount() {
    if (!global.auth.isLogin()) {
      axios.get('http://localhost:3001/api/getProducts').then(response => {
        this.setState({
          products: response.data,
          sourceProducts: response.data,
        })
      })
      this.updateCartNum()
    }
    else {
      const user = global.auth.getUser() || {}
      const UserEmail = user.email
      const isStaff = user.isStaff
      axios.post('http://localhost:3001/api/products', {
        UserEmail,
        isStaff
      }).then(response => {
        this.setState({
          products: response.data,
          sourceProducts: response.data,
        })
      })
      this.updateCartNum()
    }
  }

  // search
  search = (text) => {
    // 1. Get New Array
    let _products = [...this.state.sourceProducts]

    // 2. Filter New Array
    _products = _products.filter((p) => {
      // name: Abcd text: ab   ===> ['Ab']
      // text: '' ==> ["", "", "", "", ""]
      const matchArray = p.name.match(new RegExp(text, "gi"))
      return !!matchArray
    })

    // 3. set State
    this.setState({
      products: _products,
    })
  }

 

  add = (product) => {
    const _products = [...this.state.products]
    _products.push(product)
    const _sProducts = [...this.state.sourceProducts]
    _sProducts.push(product)

    this.setState({
      products: _products,
      sourceProducts: _sProducts,
    })
  }

  update = (product) => {
    const _products = [...this.state.products]
    const _index = _products.findIndex((p) => p.id === product.id)
    _products.splice(_index, 1, product)
    const _sProducts = [...this.state.sourceProducts]
    const _sIndex = _products.findIndex((p) => p.id === product.id)
    _sProducts.splice(_sIndex, 1, product)
    this.setState({
      products: _products,
      sourceProducts: _sProducts,
    })
  }

  delete = (id) => {
    const _products = this.state.products.filter((p) => p.id !== id)
    const _sProducts = this.state.sourceProducts.filter((p) => p.id !== id)
    this.setState({
      products: _products,
      sourceProducts: _sProducts,
    })
  }

  updateCartNum = async () => {
    const cartNum = await this.initCartNum()
    this.setState({
      cartNum: cartNum,
    })
  }

  initCartNum = async () => {
    const user = global.auth.getUser() || {}
    const res = await axios.get("http://localhost:3003/carts", {
      params: {
        userId: user.email,
      },
    })
    const carts = res.data || []
    const cartNum = carts
      .map((cart) => cart.mount) // [2, 1,2 ]
      .reduce((a, value) => a + value, 0)
    return cartNum
  }

  render() {
   
    return (
      <div>
        <ToolBox search={this.search} cartNum={this.state.cartNum} />

        <div className="products">
          {/* <div className="columns is-multiline is-desktop"> */}
          <TransitionGroup component={null}>
            {this.state.products.map(p => {
              return (
                <CSSTransition
                  classNames="product-fade"
                  timeout={300}
                  key={p.pId}
                >
                  <div className="" key={p.pId}>
                    <Product
                      product={p}
                      update={this.update}
                      delete={this.delete}
                      updateCartNum={this.updateCartNum}
                    />
                  </div>

                </CSSTransition>
              );
            })}
          </TransitionGroup>

        </div>
      </div>
    )
  }
}

export default withRouter(Products);

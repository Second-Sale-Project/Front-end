import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Panel from 'components/Panel';
import { formatPrice } from 'commons/helper';
import EditInventory from 'components/EditInventory';
import { Link } from 'react-router-dom';
import Heart from "react-heart";
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      isFavorite: this.props.product.isFavorite
    }
  }
  toEdit = () => {
    Panel.open({
      component: EditInventory,
      props: {
        product: this.props.product,
        deleteProduct: this.props.delete
      },
      callback: data => {
        if (data) {
          this.props.update(data);
        }
      }
    });
  };

  addCart = async () => {
    if (!global.auth.isLogin()) {
      this.props.history.push('/login');
      toast.info('Please Login First');
      return;
    }
    try {
      const user = global.auth.getUser() || {};
      const email = user.email;
      const { id, name, image, price } = this.props.product;
      const res = await axios.post('http://localhost:3001/api/carts', { email, id });

      const carts = res.data;
      if (carts) {
        toast.success('Add Cart Success');
      }

    } catch (error) {
      toast.error('Add Cart Failed');
    }
  };

  renderMangerBtn = () => {
    const user = global.auth.getUser() || {};
    if (user.type === 1) {
      return (
        <div className="p-head has-text-right" onClick={this.toEdit}>
          <span className="icon edit-btn">
            <i className="fas fa-sliders-h"></i>
          </span>
        </div>
      );
    }
  };
  addFavorite = () => {
    if (!global.auth.isLogin()) {
      this.props.history.push("/login")
      return
    }
    const user = global.auth.getUser() || {}
    const email = user.email;
    const product = this.props.product;
    axios.post(`http://localhost:3001/api/addFavorite`, { product, email }).then(res => {
      console.log(res);
    })
    this.setState({ isFavorite: (!this.state.isFavorite) })
  }

  deleteFavorite = () => {
    const id = this.props.product.pId;
    axios.delete(`http://localhost:3001/api/deleteFavorite/${id}`).then(res => {
      console.log(res);
    });
    this.setState({ isFavorite: (!this.state.isFavorite) })
  }

  render() {
    const { id, name, image, tags, price, status } = this.props.product;
    const _pClass = {
      available: 'product',
      unavailable: 'product out-stock'
    };
    console.log(this.props.product.isFavorite)
    return (
      <div className={_pClass[status]}>
        <div className="img-wrapper">
          <div className="out-stock-text">Out Of Stock</div>
          <figure className="image is-4by3">
            <img src={image} alt={name} />
          </figure>
        </div>
        <Link to="/productDetail">
          <div className="p-content">
            {this.renderMangerBtn()}

            <p className="p-tags">{tags}</p>
            <p className="p-name">{name}</p>
          </div>
        </Link>
        <div className="p-footer">
          <p className="price">{formatPrice(price)}</p>
          <button
            className="add-cart"
            disabled={status === 'unavailable'}
            onClick={this.addCart}
          >
            <i className="fas fa-shopping-cart"></i>
            <i className="fas fa-exclamation"></i>
          </button>
          <span class="icon mt-3 is-pulled-right ">
            {this.state.isFavorite == true ?
              (
                <Heart isActive={this.state.isFavorite} onClick={this.deleteFavorite} />
              )
              :
              <Heart isActive={this.state.isFavorite} onClick={this.addFavorite} />
            }

          </span>
        </div>
      </div>
    );
  }
}

export default withRouter(Product);
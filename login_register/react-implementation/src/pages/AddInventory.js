import React from "react"
import { toast } from "react-toastify"
import axios from "axios"
import Layout from "Layout"
import "../css/verify.css"

class AddInventory extends React.Component {
  state = {
    name: "",
    price: "",
    tags: "",
    image: "",
    status: "available",
  }

  handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    this.setState({
      [name]: value,
    })
  }

  // submit = e => {
  //   e.preventDefault();
  //   const product = { ...this.state };
  //   axios.post('products', product).then(res => {
  //     this.props.close(res.data);
  //     toast.success('Add Success');
  //   });
  // };
  submit = (e) => {
    e.preventDefault()
    const product = { ...this.state }
    axios.post("http://localhost:3001/api/insert", product).then((res) => {
      console.log(res)
      toast.success("Add Success")
      this.props.history.push("/")
    })
  }

  // showToast = () => {
  //   toast('default');
  //   toast.info('info');
  //   toast.success('success');
  //   toast.warning('warning');
  //   toast.error('error');
  // };

  render() {
    return (
      <Layout>
        <div className="inventory">
          <p className="title has-text-centered">新增商品</p>
          <form onSubmit={this.submit}>
            <div className="field">
              <div className="control">
                <label className="label ">商品名稱</label>
                <textarea
                  className="textarea"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  className="productName"
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label ">商品敘述</label>
                <label className="productBrand">商品品牌</label>
                <select
                  name="brand"
                  value={this.state.brand}
                  onChange={this.handleChange}
                  className="productBrandText"
                >
                  <option>coach</option>
                  <option>gucci</option>
                </select>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="productBrand">商品顏色</label>
                <select
                  name="color"
                  value={this.state.color}
                  onChange={this.handleChange}
                  className="productBrandText"
                >
                  <option>blue</option>
                  <option>green</option>
                </select>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">Price</label>
                <input
                  type="number"
                  className="input"
                  name="price"
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">Tags</label>
                <input
                  type="text"
                  className="input"
                  name="tags"
                  value={this.state.tags}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">Image</label>
                <input
                  type="text"
                  className="input"
                  name="image"
                  value={this.state.image}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">Status</label>
                <div className="select is-fullwidth">
                  <select
                    name="status"
                    value={this.state.status}
                    onChange={this.handleChange}
                  >
                    <option>available</option>
                    <option>unavailable</option>
                  </select>
                </div>
              </div>
            </div>
            <br />
            <div className="field is-grouped is-grouped-centered">
              <div className="control">
                <button className="button is-link">確認上架</button>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    )
  }
}

export default AddInventory

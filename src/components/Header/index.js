import React from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaShoppingCart} from 'react-icons/fa'
import CartContext from '../../context/CartContext'
import './index.css'

class Header extends React.Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickCart = () => {
    const {history} = this.props
    history.push('/cart')
  }

  onClickHome = () => {
    const {history} = this.props
    history.push('/')
  }

  render() {
    const {restaurant} = this.props
    const restaurantName = restaurant
      ? restaurant.restaurant_name
      : 'Restaurant'

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          const cartCount = cartList.reduce(
            (acc, item) => acc + item.quantity,
            0,
          )

          return (
            <header className="header">
              <h1 className="logo" onClick={this.onClickHome}>
                {restaurantName}
              </h1>

              <div
                className="cart-section"
                role="button"
                onClick={this.onClickCart}
              >
                <p className="orders-text">My Orders</p>
                <div className="cart-icon" data-testid="cart">
                  <FaShoppingCart size={20} />
                  <span className="cart-count">{cartCount}</span>
                </div>
              </div>

              <button className="logout-btn" onClick={this.onClickLogout}>
                Logout
              </button>
            </header>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default withRouter(Header)

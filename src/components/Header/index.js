import React from 'react'
import {FaShoppingCart} from 'react-icons/fa'
import './index.css'

class Header extends React.Component {
  render() {
    const {cartCount, restaurant} = this.props
    const restaurantName = restaurant
      ? restaurant.restaurant_name
      : 'Restaurant'

    return (
      <header className="header">
        <h1 className="logo">{restaurantName}</h1>
        <div className="cart-section">
          <p className="orders-text">My Orders</p>
          <div className="cart-icon">
            <FaShoppingCart size={20} />
            <span className="cart-count">
              {cartCount === 0 ? '0' : cartCount}
            </span>
          </div>
        </div>
      </header>
    )
  }
}

export default Header

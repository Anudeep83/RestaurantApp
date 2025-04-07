// Header.js
import React from 'react'
import {FaShoppingCart} from 'react-icons/fa'
import './index.css'

class Header extends React.Component {
  render() {
    const {cartCount} = this.props

    return (
      <header className="header">
        <h1 className="logo">UNI Resto Cafe</h1>
        <div className="cart-section">
          <p className="orders-text">My Orders</p>
          <div className="cart-icon">
            <FaShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </div>
        </div>
      </header>
    )
  }
}

export default Header

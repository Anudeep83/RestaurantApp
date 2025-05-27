import React from 'react'
import CartContext from '../../context/CartContext'
import Header from '../Header'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {
        cartList,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeCartItem,
        removeAllCartItems,
      } = value

      const renderEmptyCart = () => (
        <div className="empty-cart-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
            alt="empty cart"
            className="empty-cart-img"
          />
          <h1 className="empty-cart-msg">Your Cart is Empty</h1>
        </div>
      )

      const renderCartItems = () => (
        <>
          <ul className="cart-items-list">
            {cartList.map(item => {
              const {
                dish_id: dishId,
                dish_name: dishName,
                dish_price: dishPrice,
                dish_image: dishImage,
                dish_currency: dishCurrency,
                quantity,
              } = item

              const onDecreaseQuantity = () => {
                decrementCartItemQuantity(dishId)
              }

              const onIncreaseQuantity = () => {
                incrementCartItemQuantity(dishId)
              }

              return (
                <li key={dishId} className="cart-item">
                  <img
                    src={dishImage}
                    alt={dishName}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{dishName}</h3>
                    <p className="cart-item-price">
                      {dishCurrency} {dishPrice * quantity}
                    </p>
                    <div className="quantity-control">
                      <button
                        type="button"
                        role="button"
                        className="qty-btn"
                        onClick={onDecreaseQuantity}
                      >
                        -
                      </button>
                      <span className="quantity">{quantity}</span>
                      <button
                        type="button"
                        role="button"
                        className="qty-btn"
                        onClick={onIncreaseQuantity}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="button"
                    className="remove-btn"
                    onClick={() => removeCartItem(dishId)}
                  >
                    Remove
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="remove-all-container">
            <button
              type="button"
              role="button"
              className="clear-cart-btn"
              onClick={removeAllCartItems}
            >
              Remove All
            </button>
          </div>
        </>
      )

      return (
        <>
          <Header />
          <div className="cart-container">
            <h1 className="cart-title">Your Cart</h1>
            {cartList.length === 0 ? renderEmptyCart() : renderCartItems()}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart

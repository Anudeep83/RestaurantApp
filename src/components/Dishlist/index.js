import React from 'react'
import Dishcard from '../Dishcard'
import CartContext from '../../context/CartContext'
import './index.css'

const Dishlist = ({items, dishCounts}) => (
  <CartContext.Consumer>
    {({addCartItem, incrementCartItemQuantity, decrementCartItemQuantity}) => (
      <div className="dish-list">
        {items.map(dish => (
          <Dishcard
            key={dish.dish_id}
            dish={dish}
            count={dishCounts[dish.dish_id] || 0}
            addCartItem={addCartItem}
            incrementCartItemQuantity={incrementCartItemQuantity}
            decrementCartItemQuantity={decrementCartItemQuantity}
          />
        ))}
      </div>
    )}
  </CartContext.Consumer>
)

export default Dishlist

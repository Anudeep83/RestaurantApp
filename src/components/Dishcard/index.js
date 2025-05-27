import React, {Component} from 'react'
import './index.css'
import {FaCircle} from 'react-icons/fa'
import CartContext from '../../context/CartContext'

class Dishcard extends Component {
  state = {
    tempCount: 0,
    isAdded: false,
  }

  render() {
    const {dish} = this.props
    const {
      dish_id: dishId,
      dish_name: dishName,
      dish_price: dishPrice,
      dish_description: dishDescription,
      dish_image: dishImage,
      dish_calories: dishCalories,
      dish_Availability: dishAvailability,
      dish_Type: dishType,
      dish_currency: dishCurrency,
      addonCat = [],
    } = dish

    const {tempCount, isAdded} = this.state

    return (
      <CartContext.Consumer>
        {({
          addCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        }) => {
          const onTempIncrement = () => {
            this.setState(prev => ({tempCount: prev.tempCount + 1}))
          }

          const onTempDecrement = () => {
            this.setState(prev => ({
              tempCount: prev.tempCount > 0 ? prev.tempCount - 1 : 0,
            }))
          }

          const handleAddToCart = () => {
            if (tempCount > 0) {
              addCartItem({...dish, quantity: tempCount})
              this.setState({isAdded: true})
            }
          }

          const onIncrement = () => {
            incrementCartItemQuantity(dishId)
          }

          const onDecrement = () => {
            decrementCartItemQuantity(dishId)
          }

          return (
            <div className='dish-card'>
              <div className='dish-header'>
                <FaCircle
                  className={dishType === 2 ? 'icon green' : 'icon red'}
                />
                <h1 className='dish-title'>{dishName}</h1>
              </div>

              <p className='dish-price'>
                {dishCurrency} {dishPrice}
              </p>

              <div className='dish-dis'>
                <p className='dish-desc'>{dishDescription}</p>
                <p className='dish-calories'>{dishCalories} calories</p>
              </div>

              {dishAvailability ? (
                <div className='dish-actions'>
                  {!isAdded ? (
                    <>
                      <div className='dish-counter'>
                        <button
                          type='button'
                          role='button'
                          onClick={onTempDecrement}
                          className='quantity-btn'
                        >
                          -
                        </button>
                        <p>{tempCount}</p>
                        <button
                          type='button'
                          role='button'
                          onClick={onTempIncrement}
                          className='quantity-btn'
                        >
                          +
                        </button>
                      </div>
                      {tempCount > 0 && (
                        <button
                          type='button'
                          role='button'
                          onClick={handleAddToCart}
                          className='add-to-cart'
                        >
                          ADD TO CART
                        </button>
                      )}
                    </>
                  ) : (
                    <div className='dish-counter'>
                      <button
                        type='button'
                        role='button'
                        onClick={onDecrement}
                        className='quantity-btn'
                      >
                        -
                      </button>
                      <p>{tempCount}</p> {/* show tempCount or count */}
                      <button
                        type='button'
                        role='button'
                        onClick={onIncrement}
                        className='quantity-btn'
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <p className='not-available'>Not available</p>
              )}

              {addonCat.length > 0 && (
                <p className='customization'>Customizations available</p>
              )}

              <img src={dishImage} alt={dishName} className='dish-image' />
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Dishcard

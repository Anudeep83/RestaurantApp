import React from 'react'
import './index.css'
import {FaCircle} from 'react-icons/fa'

const Dishcard = ({dish, count, onCountChang}) => {
  const {
    dish_name: dishName,
    dish_price: dishPrice,
    dish_description: dishDescription,
    dish_image: dishImage,
    dish_calories: dishCalories,
    dish_Availability: dishAvailability,
    dish_Type: dishType,
    dish_currency: dishCurrency,
    addonCat,
  } = dish

  return (
    <div className="dish-card">
      <div className="dish-header">
        <FaCircle className={dishType === 2 ? 'icon green' : 'icon red'} />
        <h1 className="dish-title">{dishName}</h1>
      </div>
      <p className="dish-price">
        {dishCurrency} {dishPrice}
      </p>
      <div className="dish-dis">
        <p className="dish-desc">{dishDescription}</p>
        <p className="dish-calories">{dishCalories} calories</p>
      </div>
      {dishAvailability && (
        <div className="dish-actions">
          <div className="dish-counter">
            <button type="button" onClick={() => onCountChang('decrement')}>
              -
            </button>
            <p>{count || '0'}</p>
            <button type="button" onClick={() => onCountChang('increment')}>
              +
            </button>
          </div>
        </div>
      )}

      {addonCat?.length > 0 && (
        <p className="customization">Customizations available</p>
      )}
      {!dishAvailability && <p className="not-available">Not available</p>}
      <img src={dishImage} alt={dishName} className="dish-image" />
    </div>
  )
}

export default Dishcard

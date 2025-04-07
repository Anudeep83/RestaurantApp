import React from 'react'
import './index.css'
import {FaCircle, FaPlus, FaMinus} from 'react-icons/fa'

const Dishcard = ({dish, count, onCountChange}) => {
  const {
    dish_name,
    dish_price,
    dish_description,
    dish_image,
    dish_calories,
    dish_Availability,
    dish_Type,
    addonCat,
  } = dish

  return (
    <div className="dish-card">
      <div className="dish-header">
        <FaCircle className={dish_Type === 2 ? 'icon green' : 'icon red'}  />
        <h3 className="dish-title">{dish_name}</h3>
      </div>
      <p className="dish-price">SAR {dish_price}</p>
      <div className="dish-dis">
        <p className="dish-desc">{dish_description}</p>
        <p className="dish-calories">{dish_calories} calories</p>
      </div>
      <div className="dish-actions">
        <div className="dish-counter">
          <button type="button" onClick={() => onCountChange('decrement')}>
            <FaMinus />
          </button>
          <span>{count}</span>
          <button type="button" onClick={() => onCountChange('increment')}>
            <FaPlus />
          </button>
        </div>
      </div>
      {addonCat?.length > 0 && (
        <p className="customization">Customizations available</p>
      )}
      {!dish_Availability && <p className="not-available">Not available</p>}
      <img src={dish_image} alt={dish_name} className="dish-image" />
    </div>
  )
}

export default Dishcard

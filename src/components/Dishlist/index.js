import React from 'react'
import Dishcard from '../Dishcard'
import './index.css'

const Dishlist = ({items, dishCounts, updateDishCount}) => (
  <div className="dish-list">
    {items.map(dish => (
      <Dishcard
        key={dish.dish_id}
        dish={dish}
        count={dishCounts[dish.dish_id] || 0}
        onCountChang={operation => updateDishCount(dish.dish_id, operation)}
      />
    ))}
  </div>
)

export default Dishlist

import React from 'react'
import './index.css'

const Tabs = ({menuData, activeCategoryId, setActiveCategory}) => (
  <div className="tabs-container">
    {menuData.map(category => (
      <button
        type="button"
        key={category.menu_category_id}
        className={`tab-button ${
          activeCategoryId === category.menu_category_id ? 'active' : ''
        }`}
        onClick={() => setActiveCategory(category.menu_category_id)}
      >
        {category.menu_category}
      </button>
    ))}
  </div>
)

export default Tabs

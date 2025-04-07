// App.js
import React, {Component} from 'react'
import Header from './components/Header'
import Tabs from './components/Tabs'
import Dishlist from './components/Dishlist'
import './App.css'

class App extends Component {
  state = {
    menuData: [],
    activeCategoryId: '',
    cartCount: 0,
    dishCounts: {},
  }

  componentDidMount() {
    this.getMenuData()
  }

  getMenuData = async () => {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    const data = await response.json()
    const categories = data[0]?.table_menu_list || []
    this.setState({
      menuData: categories,
      activeCategoryId: categories[0]?.menu_category_id || '',
    })
  }

  setActiveCategory = id => {
    this.setState({activeCategoryId: id})
  }

  updateDishCount = (dishId, operation) => {
    this.setState(prevState => {
      const prevCount = prevState.dishCounts[dishId] || 0
      const newCount =
        operation === 'increment' ? prevCount + 1 : Math.max(prevCount - 1, 0)
      const newDishCounts = {...prevState.dishCounts, [dishId]: newCount}
      const newCartCount = Object.values(newDishCounts).reduce(
        (a, b) => a + b,
        0,
      )

      return {
        dishCounts: newDishCounts,
        cartCount: newCartCount,
      }
    })
  }

  render() {
    const {menuData, activeCategoryId, cartCount, dishCounts} = this.state
    const activeCategory = menuData.find(
      category => category.menu_category_id === activeCategoryId,
    )

    return (
      <div className="app">
        <Header cartCount={cartCount} />
        <Tabs
          menuData={menuData}
          activeCategoryId={activeCategoryId}
          setActiveCategory={this.setActiveCategory}
        />
        {activeCategory && (
          <Dishlist
            items={activeCategory.category_dishes}
            dishCounts={dishCounts}
            updateDishCount={this.updateDishCount}
          />
        )}
      </div>
    )
  }
}

export default App

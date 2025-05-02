import React, {Component} from 'react'
import Header from './components/Header'
import Tabs from './components/Tabs'
import Dishlist from './components/Dishlist'
import './App.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class App extends Component {
  state = {
    menuData: [],
    activeCategoryId: '',
    restaurant: {},
    cartCount: 0,
    dishCounts: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMenuData()
  }

  getMenuData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )

    if (response.ok) {
      const data = await response.json()
      const restaurantInfo = {
        restaurant_name: data[0]?.restaurant_name,
      }
      const categories = data[0]?.table_menu_list || []

      const dishCounts = categories.reduce((acc, category) => {
        category.category_dishes.forEach(dish => {
          acc[dish.dish_id] = 0
        })
        return acc
      }, {})

      this.setState({
        menuData: categories,
        restaurant: restaurantInfo,
        activeCategoryId: categories[0]?.menu_category_id || '',
        dishCounts,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  setActiveCategory = id => {
    this.setState({activeCategoryId: id})
  }

  updateDishCount = (dishId, operation) => {
    const {menuData} = this.state
    const activeDish = menuData
      .flatMap(category => category.category_dishes)
      .find(dish => dish.dish_id === dishId)

    if (!activeDish || !activeDish.dish_Availability) {
      return
    }

    this.setState(prevState => {
      const prevCount = prevState.dishCounts[dishId] || 0
      let newCount = prevCount

      if (operation === 'increment') {
        newCount += 1
      } else if (operation === 'decrement' && prevCount > 0) {
        newCount -= 1
      }

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

  renderSuccessView = () => {
    const {
      menuData,
      activeCategoryId,
      dishCounts,
      restaurant,
      cartCount,
    } = this.state
    const activeCategory = menuData.find(
      category => category.menu_category_id === activeCategoryId,
    )

    return (
      <>
        <Header cartCount={cartCount} restaurant={restaurant} />
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
      </>
    )
  }

  renderFailureView = () => (
    <div className="error-view">
      <p>Failed to load menu. Please try again.</p>
    </div>
  )

  renderLoader = () => (
    <div className="loader-view" data-testid="loader">
      <p>Loading...</p>
    </div>
  )

  renderAppView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return <div className="app">{this.renderAppView()}</div>
  }
}

export default App

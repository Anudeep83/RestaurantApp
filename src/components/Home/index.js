import React, {Component} from 'react'
import Header from '../Header'
import Tabs from '../Tabs'
import Dishlist from '../Dishlist'
import CartContext from '../../context/CartContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    menuData: [],
    activeCategoryId: '',
    restaurant: {},
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

      this.setState({
        menuData: categories,
        restaurant: restaurantInfo,
        activeCategoryId: categories[0]?.menu_category_id || '',
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  setActiveCategory = id => {
    this.setState({activeCategoryId: id})
  }

  renderSuccessView = () => {
    const {menuData, activeCategoryId, restaurant} = this.state
    const activeCategory = menuData.find(
      category => category.menu_category_id === activeCategoryId,
    )

    return (
      <CartContext.Consumer>
        {value => {
          const {
            cartList,
            addCartItem,
            incrementCartItemQuantity,
            decrementCartItemQuantity,
          } = value

          const dishCounts = cartList.reduce((acc, item) => {
            acc[item.dish_id] = item.quantity
            return acc
          }, {})

          const cartCount = cartList.reduce(
            (sum, item) => sum + item.quantity,
            0,
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
                  addCartItem={addCartItem}
                  incrementCartItemQuantity={incrementCartItemQuantity}
                  decrementCartItemQuantity={decrementCartItemQuantity}
                />
              )}
            </>
          )
        }}
      </CartContext.Consumer>
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

export default Home

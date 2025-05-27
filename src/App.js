import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import Cart from './components/Cart'
import Login from './components/Login'
import CartContext from './context/CartContext'
import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = dish => {
    this.setState(prevState => {
      const dishIndex = prevState.cartList.findIndex(
        item => item.dish_id === dish.dish_id,
      )

      if (dishIndex !== -1) {
        const updatedCartList = [...prevState.cartList]
        updatedCartList[dishIndex].quantity += 1
        return {cartList: updatedCartList}
      } else {
        return {cartList: [...prevState.cartList, {...dish, quantity: 1}]}
      }
    })
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(item => item.dish_id !== id),
    }))
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.dish_id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => {
      const updatedList = prevState.cartList
        .map(item =>
          item.dish_id === id ? {...item, quantity: item.quantity - 1} : item,
        )
        .filter(item => item.quantity > 0)

      return {cartList: updatedList}
    })
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        </Router>
      </CartContext.Provider>
    )
  }
}

export default App

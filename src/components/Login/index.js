import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'
class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}
  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }
  onChangePassword = event => {
    this.setState({password: event.target.value})
  }
  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }
  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }
  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }
  render() {
    const {username, password, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <h1>Restaurant App</h1>
        
        <form className="login-form" onSubmit={this.onSubmitForm}>
          {' '}
          <h1>Login</h1> <label htmlFor="username">USERNAME</label>{' '}
          <input
            type="text"
            id="username"
            value={username}
            onChange={this.onChangeUsername}
            placeholder="Username"
          />{' '}
          <label htmlFor="password">PASSWORD</label>{' '}
          <input
            type="password"
            id="password"
            value={password}
            onChange={this.onChangePassword}
            placeholder="Password"
          />{' '}
          <button type="submit" className="login-btn">
            {' '}
            Login{' '}
          </button>{' '}
          {showError && <p className="error-msg">*{errorMsg}</p>}{' '}
        </form>{' '}
      </div>
    )
  }
}
export default Login

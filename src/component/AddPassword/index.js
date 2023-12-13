import {Component} from 'react'
import {v4 as uuId} from 'uuid'
import './index.css'
import PasswordItem from '../PasswordItem'

class AddPassword extends Component {
  state = {
    passwordList: [],
    isShowPassword: false,
    inputWeb: '',
    inputName: '',
    inputPassword: '',
    passCount: 0,
    userSearch: '',
  }

  onSubmitData = event => {
    const {inputWeb, inputName, inputPassword} = this.state
    event.preventDefault()
    const randomBg = Math.ceil(Math.random() * 5)
    const newPass = {
      id: uuId(),
      website: inputWeb,
      name: inputName,
      password: inputPassword,
      randomColor: randomBg,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPass],
      inputWeb: '',
      inputName: '',
      inputPassword: '',
      isShowPassword: true,
      passCount: prevState.passCount + 1,
    }))
  }

  onUserSearchInput = event => {
    this.setState({userSearch: event.target.value})
  }

  onDeleteItem = id => {
    const {passwordList} = this.state
    const filterDelte = passwordList.filter(each => each.id !== id)
    this.setState(prevState => ({
      passwordList: filterDelte,
      passCount: prevState.passCount - 1,
    }))
  }

  onChangeWeb = event => {
    this.setState({inputWeb: event.target.value})
  }

  onChangeName = event => {
    this.setState({inputName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({inputPassword: event.target.value})
  }

  onChangeisShowPassword = () => {
    this.setState(prevState => ({isShowPassword: !prevState.isShowPassword}))
  }

  isEmptyorNot = passwordList => {
    if (passwordList.length > 0) {
      return true
    }
    return false
  }

  render() {
    const {
      isShowPassword,
      passwordList,
      inputWeb,
      inputName,
      inputPassword,
      passCount,
      userSearch,
    } = this.state

    const isAdd = this.isEmptyorNot(passwordList)
    const userInputSearch = passwordList.filter(each =>
      each.website.toLowerCase().includes(userSearch.toLowerCase()),
    )

    return (
      <div className="bg-container">
        <div className="bg-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="add-pass-container">
            <div className="add-pass-card">
              <h1 className="pass-heading">Add New Password</h1>
              <form onSubmit={this.onSubmitData} className="form-card">
                <div className="input-card">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-img"
                  />
                  <hr className="separate" />
                  <input
                    type="text"
                    placeholder="Enter Website"
                    className="input-user"
                    value={inputWeb}
                    onChange={this.onChangeWeb}
                  />
                </div>
                <div className="input-card">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="input-img"
                  />
                  <hr className="separate" />
                  <input
                    type="text"
                    placeholder="Enter Username"
                    className="input-user"
                    value={inputName}
                    onChange={this.onChangeName}
                  />
                </div>
                <div className="input-card">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="input-img"
                  />
                  <hr className="separate" />
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="input-user"
                    value={inputPassword}
                    onChange={this.onChangePassword}
                  />
                </div>
                <button type="submit" className="add-pass-btn">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="pass-manager-img"
            />
          </div>
          <div className="your-password-card">
            <div className="your-pass-head">
              <div className="your-pass-desc">
                <h1 className="your-pass-heading">Your Passwords</h1>
                <p className="your-pass-count">{passCount}</p>
              </div>
              <div className="your-search-pass">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="your-search-img"
                />
                <hr className="separate" />
                <input
                  type="search"
                  placeholder="Search"
                  className="your-search-input"
                  value={userSearch}
                  onChange={this.onUserSearchInput}
                />
              </div>
            </div>
            <hr className="your-pass-separate" />
            <div className="your-show-card">
              <input
                type="checkbox"
                className="your-show-input"
                id="show-password"
                onChange={this.onChangeisShowPassword}
                value={isShowPassword}
              />
              <label className="your-show-pass" htmlFor="show-password">
                Show passwords
              </label>
            </div>
            {isAdd && (
              <ul className="lists">
                {userInputSearch.map(each => (
                  <PasswordItem
                    passItem={each}
                    key={each.id}
                    showPassword={isShowPassword}
                    onDeleteItem={this.onDeleteItem}
                  />
                ))}
              </ul>
            )}

            {!isAdd && (
              <div className="no-password-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-pass-img"
                />
                <p className="no-pass-desc">No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default AddPassword

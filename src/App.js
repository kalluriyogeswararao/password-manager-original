import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

const bgColorList = [
  'yellow',
  'green',
  'orange',
  'light-green',
  'red',
  'sky-blue',
  'grey',
  'dark-blue',
]

const EachPasswordData = props => {
  const {eachPassword, onDeleteData} = props
  const {website, username, password, id, index} = eachPassword

  const color = bgColorList[index]

  const onClickDelete = () => {
    onDeleteData(id)
  }

  return (
    <li className="each-password">
      <div className="fill-data">
        <p className={`profile ${color}`}>{website[0].toUpperCase()}</p>
        <div className="user-data">
          <p className="data">{website}</p>
          <p className="data">{username}</p>
          <p className="data">{password}</p>
        </div>
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={onClickDelete}
        testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-image"
        />
      </button>
    </li>
  )
}

class App extends Component {
  state = {
    passwordsList: [],
    website: '',
    username: '',
    password: '',
    search: '',
    checkStatus: false,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearchPasswords = event => {
    const {passwordsList} = this.state
    this.setState({search: event.target.value})
    const filterData = passwordsList.filter(eachPass =>
      eachPass.website.toLowerCase().includes(event.target.value.toLowerCase()),
    )
    this.setState({passwordsList: filterData})
  }

  addPasswordData = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const number = Math.ceil(Math.random() * 7)
    const newPassword = {
      id: uuidv4(),
      website,
      username,
      password,
      index: number,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      username: '',
      password: '',
    }))
  }

  onAddNewPassword = () => {
    const {website, username, password} = this.state

    return (
      <div className="add-new-password-container">
        <form
          className="add-password-container"
          onSubmit={this.addPasswordData}
        >
          <h1 className="heading">Add New Password</h1>
          <div className="logo-input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              alt="website"
              className="logos"
            />

            <input
              type="text"
              placeholder="Enter Website"
              className="input"
              onChange={this.onChangeWebsite}
              value={website}
            />
          </div>
          <div className="logo-input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              alt="username"
              className="logos"
            />

            <input
              type="text"
              placeholder="Enter Username"
              className="input"
              onChange={this.onChangeUsername}
              value={username}
            />
          </div>
          <div className="logo-input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              alt="password"
              className="logos"
            />

            <input
              type="password"
              className="input"
              placeholder="Enter Password"
              onChange={this.onChangePassword}
              value={password}
            />
          </div>
          <button type="submit" className="button">
            Add
          </button>
        </form>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          className="image"
          alt="password manager"
        />
      </div>
    )
  }

  displayAllPasswords = () => {
    const {passwordsList} = this.state

    return (
      <ul className="all-passwords-data">
        {passwordsList.map(eachPassword => (
          <EachPasswordData
            eachPassword={eachPassword}
            key={eachPassword.id}
            onDeleteData={this.onDeleteData}
          />
        ))}
      </ul>
    )
  }

  noPasswordsMessage = () => {
    const Show = 'No Passwords'
    return (
      <div className="empty">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
          className="no-password-image"
        />
        <p className="password-heading">{Show}</p>
      </div>
    )
  }

  onDeleteData = id => {
    const {passwordsList} = this.state
    const filterList = passwordsList.filter(eachData => eachData.id !== id)
    this.setState({passwordsList: filterList})
  }

  onClickCheckBox = () => {
    this.setState(prevState => ({checkStatus: !prevState.checkStatus}))
  }

  onSavesPassword = () => {
    const {passwordsList, search} = this.state

    return (
      <div className="password-container">
        <div className="search-container">
          <div className="password-count">
            <h1 className="password-heading">Your Passwords</h1>
            <p className="count">{passwordsList.length}</p>
          </div>
          <div className="search-input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
              className="logos"
            />

            <input
              type="search"
              placeholder="Search"
              className="search-input"
              onChange={this.onChangeSearchPasswords}
              value={search}
            />
          </div>
        </div>
        <div className="show-password-container">
          <input
            type="checkbox"
            id="show"
            className="check-box"
            onClick={this.onClickCheckBox}
          />
          <label className="show-password" htmlFor="show">
            Show Passwords
          </label>
        </div>
        {passwordsList.length > 0
          ? this.displayAllPasswords()
          : this.noPasswordsMessage()}
      </div>
    )
  }

  render() {
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        {this.onAddNewPassword()}
        {this.onSavesPassword()}
      </div>
    )
  }
}

export default App

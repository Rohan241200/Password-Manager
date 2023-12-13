import './index.css'

const PasswordItem = props => {
  const {passItem, showPassword, onDeleteItem} = props
  const {id, website, name, password, randomColor} = passItem

  const onDeleteUser = () => {
    onDeleteItem(id)
  }

  const firstLetter = name[0].toUpperCase()

  return (
    <li className="pass-lists">
      <div className="pass-card">
        <p className={`initial-name bg-${randomColor}`}>{firstLetter}</p>
        <div className="user-details">
          <p className="user-info">{website}</p>
          <p className="user-info">{name}</p>
          {showPassword ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="pass-star password"
            />
          ) : (
            <p className="user-info password">{password}</p>
          )}
        </div>
      </div>
      <button
        type="button"
        className="delete-btn"
        onClick={onDeleteUser}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem

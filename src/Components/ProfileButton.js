import React from 'react';

export default class ProfileButton extends React.Component {

    render() {
        const { user, logout } = this.props
        const { displayName, photoURL } = user

        return (
          <div className="dropdown">
            <button className="google-button">
                {photoURL && (
                  <img
                    alt={"User pic"}
                    style={{width: 30, height: 30,  borderRadius: 15,}}
                    src={photoURL}
                  />
                )}
              <div className="google-button__text">
                  <span>
                    {displayName}
                  </span>
              </div>
            </button>

            <div className="dropdown-content">
              <a href="#" onClick={logout}>Logout</a>
            </div>            
          </div>
        )
    }
}
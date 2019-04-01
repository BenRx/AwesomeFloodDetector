import React from 'react';

export default class ProfileButton extends React.Component {

    render() {
        const { user } = this.props
        const { displayName, photoURL } = user

        return (
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
        )
    }
}
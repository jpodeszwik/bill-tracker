import React from 'react';
import {UserInfo} from "firebase";
import {logIn, logOut} from "./firebase";

import "./TopBar.css";

interface PropTypes {
  user: UserInfo | null;
}

const TopBar: React.FC<PropTypes> = ({user}: PropTypes) => {
  return (<div className="top-bar">
    <span>Bill tracker</span>
    <div>
      {user && <div>{user.email}
        <button onClick={logOut}>logOut</button>
      </div>}
      {!user && <button onClick={logIn}>signIn with Google</button>}
    </div>
  </div>)
};

export default TopBar;

import React from 'react';
import {UserInfo} from "firebase";
import Activities from "../activities/Activities";
import "./Content.css";


interface PropTypes {
  user: UserInfo | null;
}

const Content: React.FC<PropTypes> = ({user}: PropTypes) => (
  <div className="content">
    {user && <Activities user={user}/>}
  </div>
);

export default Content;

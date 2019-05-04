import React from 'react';
import TopBar from "./TopBar";
import {UserInfo} from "firebase";
import Content from "./Content";

interface PropTypes {
  user: UserInfo | null;
}

const Layout: React.FC<PropTypes> = ({user}: PropTypes) => {
  return (
    <div>
      <TopBar user={user}/>
      <Content/>
    </div>
  )
};

export default Layout;

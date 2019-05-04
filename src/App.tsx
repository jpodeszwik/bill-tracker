import React, {useEffect, useState} from "react";
import "./App.css";
import {onUserChange} from "./firebase";
import {UserInfo} from "firebase";
import TopBar from "./TopBar";

const App: React.FC = () => {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => onUserChange((user: UserInfo | null) => {
    setUser(user);
  }), []);

  return (
    <div>
      <TopBar user={user}/>
    </div>
  );
};

export default App;

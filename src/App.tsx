import React, {useEffect, useState} from "react";
import "./App.css";
import {onUserChange} from "./firebase";
import {UserInfo} from "firebase";
import Layout from "./layout/Layout";

const App: React.FC = () => {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => onUserChange((user: UserInfo | null) => {
    setUser(user);
  }), []);

  return (
    <Layout user={user}/>
  );
};

export default App;

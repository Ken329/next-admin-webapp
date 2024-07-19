import { useContext } from "react";

import AuthContext from "@context/authContext";

const Dashboard = () => {
  const authContext = useContext(AuthContext);

  console.log(authContext?.auth);

  return <p>Dashboard</p>;
};

export default Dashboard;

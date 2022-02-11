import { useContext } from "react";

import { AuthContext } from "../App";

const useAuth = () => {
  let { user, setUser } = useContext(AuthContext);
  return [user, setUser];
};

export default useAuth;

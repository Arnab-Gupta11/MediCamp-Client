import { useContext } from "react";
import { AuthContext } from "../providers/Authprovider";

const useAuth = () => {
  const authUtils = useContext(AuthContext);
  return authUtils;
};

export default useAuth;

import { useParams } from "react-router-dom";
import UserProfile from "./user";
const SteamLogin = (props) => {
  var id = useParams().id;
  const logIn = (props) => {
    UserProfile.setEmail("None");
    UserProfile.setId(id);
    props.handleClick("/");
  };
  logIn(props);
};
export default SteamLogin;

import UserProfile from "./user";
const Logout = (props) => {
  UserProfile.logout();
  props.handleClick("/");
};
export default Logout;

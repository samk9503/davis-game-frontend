var UserProfile = (function () {
  var getEmail = function () {
    if (sessionStorage.getItem("email") == null) {
      return "";
    } else {
      return sessionStorage.getItem("email");
    }
  };
  var setEmail = function (value) {
    sessionStorage.setItem("email", value);
  };
  var getId = function () {
    if (sessionStorage.getItem("id") == null) {
      return "";
    } else {
      return sessionStorage.getItem("id");
    }
  };
  var setId = function (value) {
    sessionStorage.setItem("id", value);
  };
  var getSteamId = function () {
    if (sessionStorage.getItem("steamid") == null) {
      return null;
    } else {
      return sessionStorage.getItem("steamid");
    }
  };
  var setSteamId = function (value) {
    sessionStorage.setItem("steamid", value);
  };
  var logout = function (value) {
    sessionStorage.clear();
  };

  return {
    getEmail: getEmail,
    setEmail: setEmail,
    getId: getId,
    setId: setId,
    getSteamId: getSteamId,
    setSteamId: setSteamId,
    logout: logout,
  };
})();

export default UserProfile;

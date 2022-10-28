import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar from "./component/navbar/navbar";
import Home from "./component/pages/home/home";
import Footer from "./component/footer/footer";
import Servers from "./component/pages/servers/servers";
import Players from "./component/pages/players/players";
import Premium from "./component/pages/premium/premium";
import Rcon from "./component/pages/rcon/rcon";
import Banners from "./component/pages/banners/banners";
import Alerts from "./component/pages/alerts/alerts";
import SignIn from "./component/pages/auth/sign_in";
import Register from "./component/pages/auth/register";
import Subscription from "./component/pages/subscription/subscription";
import GameDetail from "./component/pages/gameDetails/gameDetail";
import ServerDetail from "./component/pages/servers/serverDetail";
import SteamLogin from "./component/pages/auth/steamLogin";
import Logout from "./component/pages/auth/logout";
import Search from "./component/pages/search/search";
import Leaderboard from "./component/pages/leaderboard/leaderboard";
import Sessions from "./component/pages/sessions/sessions";
import Addons from "./component/pages/account/addons/addons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import React, { useState } from "react";
import Account from "./component/pages/account/account";
import Stats from "./component/pages/stats/stats";
import UserServers from "./component/pages/account/servers/userServers";
function Root() {
  const [data, setData] = useState([]);
  const [link, setLink] = useState(null);
  const [prevLink, setPrevLink] = useState(null);
  const [filters, setFilters] = useState([]);
  const global = {
    API: "http://127.0.0.1:8000/api",
    STORAGE: "http://127.0.0.1:8000",
    TEBEXUSER: "1201426",
    TEBEXPASS: "XguUpua8xiBxWsPJ368FPHEumCOVStUn",
  };
  const navigate = useNavigate();
  function handleClick(route) {
    navigate(route);
  }
  function handleSearch(route, data, filters, link, prevLink) {
    setData(data);
    setLink(link);
    setPrevLink(prevLink);
    setFilters(filters);
    navigate(route);
  }
  return (
    <div>
      <Navbar handleClick={handleClick} global={global} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              global={global}
              handleSearch={handleSearch}
              handleClick={handleClick}
            />
          }
        />
        <Route
          path="servers"
          element={
            <Servers
              handleClick={handleClick}
              handleSearch={handleSearch}
              global={global}
            />
          }
        />
        <Route path="players" element={<Players global={global} />} />
        <Route path="subscription" element={<Subscription global={global} />} />
        <Route
          path="subscription/premium"
          element={<Premium global={global} />}
        />
        <Route path="subscription/rcon" element={<Rcon global={global} />} />
        <Route path="banners/about" element={<Banners global={global} />} />
        <Route path="alerts" element={<Alerts global={global} />} />
        <Route
          path="account"
          element={<Account handleClick={handleClick} global={global} />}
        />
        <Route
          path="account/servers"
          element={<UserServers handleClick={handleClick} global={global} />}
        />
        <Route
          path="account/servers/addons/:id"
          element={<Addons handleClick={handleClick} global={global} />}
        />
        <Route
          path="account/login"
          element={<SignIn handleClick={handleClick} global={global} />}
        />
        <Route
          path="account/register"
          element={<Register handleClick={handleClick} global={global} />}
        />
        <Route
          path="account/steam/:id"
          element={<SteamLogin handleClick={handleClick} global={global} />}
        />
        <Route
          path="logout"
          element={<Logout handleClick={handleClick} global={global} />}
        />
        <Route path="servers/:id" element={<GameDetail global={global} />} />
        <Route path="servers/:id/stats" element={<Stats global={global} />} />
        <Route
          path="servers/search"
          element={
            <Search
              global={global}
              data={data}
              filters={filters}
              link={link}
              prevLink={prevLink}
            />
          }
        />
        <Route
          path="servers/:id/:id"
          element={<ServerDetail handleClick={handleClick} global={global} />}
        />

        <Route
          path="servers/:id/:id/leaderboard"
          element={<Leaderboard global={global} />}
        />
        <Route
          path="servers/:id/:id/sessions"
          element={<Sessions global={global} />}
        />
      </Routes>
    </div>
  );
}
function App() {
  return (
    <>
      <Router>
        <Root />
      </Router>
      <Footer />
    </>
  );
}

export default App;

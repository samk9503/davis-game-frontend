import React, { useState } from "react";
import UserProfile from "../pages/auth/user";

const Navbar = (props) => {
  const [selected, setSelected] = useState("Home");

  return (
    <nav className="navbar navbar-inverse css-do5u3">
      <div className="container">
        <nav className="css-tsq4lz">
          <a className="navbar-brand" href="/">
            <img
              src="https://cdn.battlemetrics.com/app/assets/logo.00f0d.svg"
              alt="BattleMetrics"
              title="BattleMetrics"
              width="144"
              height="44"
              id="logo"
            />
          </a>
          <ul className="css-16xvbhm">
            <li className="hidden-md hidden-sm css-1cespjk">
              <a
                href="/"
                style={
                  selected === "Home"
                    ? { backgroundColor: "#222", color: "#fff" }
                    : {}
                }
                onClick={(e) => {
                  e.preventDefault();
                  setSelected("Home");
                  props.handleClick("/");
                }}
              >
                Home
              </a>
            </li>
            <li className="css-1pivy1c">
              <a
                href="/servers"
                style={
                  selected === "Servers"
                    ? { backgroundColor: "#222", color: "#fff" }
                    : {}
                }
                onClick={(e) => {
                  e.preventDefault();
                  setSelected("Servers");
                  props.handleClick("servers");
                }}
              >
                Servers
              </a>
            </li>
            <li className="css-1pivy1c">
              <a
                href="/players"
                style={
                  selected === "Players"
                    ? { backgroundColor: "#222", color: "#fff" }
                    : {}
                }
                onClick={(e) => {
                  e.preventDefault();
                  setSelected("Players");
                  props.handleClick("players");
                }}
              >
                Players
              </a>
            </li>
            <li className="css-m00ib">
              <a
                href="/subscription/premium"
                style={
                  selected === "Premium"
                    ? { backgroundColor: "#222", color: "#fff" }
                    : {}
                }
                onClick={(e) => {
                  e.preventDefault();
                  setSelected("Premium");
                  props.handleClick("subscription/premium");
                }}
              >
                <span className="css-18q9uva">Premium</span>
              </a>
            </li>
            <li className="css-1pivy1c">
              <a
                href="/subscription/rcon"
                style={
                  selected === "Rcon"
                    ? { backgroundColor: "#222", color: "#fff" }
                    : {}
                }
                onClick={(e) => {
                  e.preventDefault();
                  setSelected("Rcon");
                  props.handleClick("subscription/rcon");
                }}
              >
                <span className="css-18q9uva">RCON</span>
              </a>
            </li>
            <li className="css-1pivy1c">
              <a
                href="/banners/about"
                style={
                  selected === "Banners"
                    ? { backgroundColor: "#222", color: "#fff" }
                    : {}
                }
                onClick={(e) => {
                  e.preventDefault();
                  setSelected("Banners");
                  props.handleClick("banners/about");
                }}
              >
                Banners
              </a>
            </li>
            <li className="css-1pivy1c">
              <a
                href="/alerts"
                style={
                  selected === "Alerts"
                    ? { backgroundColor: "#222", color: "#fff" }
                    : {}
                }
                onClick={(e) => {
                  e.preventDefault();
                  setSelected("Alerts");
                  props.handleClick("alerts");
                }}
              >
                <span>Alerts</span>
              </a>
            </li>
            {UserProfile.getEmail().length > 3 ? (
              <li className="css-1pivy1c">
                <a href="/account"
                style={
                  selected === "Register"
                    ? { backgroundColor: "#222", color: "#fff" }
                    : {}
                }
                onClick={(e) => {
                  e.preventDefault();
                  setSelected("Login");
                  props.handleClick("account");
                }}
                >
                  <i className="glyphicon glyphicon-user" />
                </a>
              </li>
            ) : (
              <li className="css-1pivy1c">
                <a
                  href="/account/login"
                  style={
                    selected === "Login"
                      ? { backgroundColor: "#222", color: "#fff" }
                      : {}
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setSelected("Login");
                    props.handleClick("account/login");
                  }}
                >
                  Sign In
                </a>
              </li>
            )}
            {UserProfile.getEmail().length > 3 ? (
              <li className="css-1pivy1c">
                <a href="/account/logout"
                style={
                  selected === "Register"
                    ? { backgroundColor: "#222", color: "#fff" }
                    : {}
                }
                onClick={(e) => {
                  e.preventDefault();
                  setSelected("Register");
                  props.handleClick("logout");
                }}
                >
                  <i className="glyphicon glyphicon-off" />
                </a>
              </li>
            ) : (
              <li className="css-1pivy1c">
                <a
                  href="/account/register"
                  style={
                    selected === "Register"
                      ? { backgroundColor: "#222", color: "#fff" }
                      : {}
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setSelected("Register");
                    props.handleClick("account/register");
                  }}
                >
                  Register
                </a>
              </li>
            )}
          </ul>
          <button
            type="button"
            className="navbar-toggle collapsed css-14b28kz"
            style={{ display: "none" }}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;

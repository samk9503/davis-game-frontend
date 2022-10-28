import axios from "axios";
import React, { useState } from "react";
import UserProfile from "./user";

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    axios
      .post(`http://127.0.0.1:8000/api/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data) {
          UserProfile.setEmail(res.data.email);
          UserProfile.setId(res.data.id);
          UserProfile.setSteamId(res.data.steamId);
          props.handleClick("/");
        }
      });
  };
  return (
    <div id="site-container" className="css-1q59fp3">
      <div className="left side-unit">
        <div style={{}} />
      </div>
      <div id="content-container">
        <ol
          className="container css-11ox9o0"
          itemScope=""
          itemType="https://schema.org/BreadcrumbList"
        >
          <li
            itemProp="itemListElement"
            itemScope=""
            itemType="https://schema.org/ListItem"
            className="css-ku7g1k"
          >
            <a itemProp="item" href="/account">
              <span itemProp="name">Account</span>
            </a>
            <meta itemProp="position" content={1} />
          </li>
          <li
            itemProp="itemListElement"
            itemScope=""
            itemType="https://schema.org/ListItem"
            className="css-c7thuy"
          >
            <a itemProp="item" href="/account/login">
              <span itemProp="name">Login</span>
            </a>
            <meta itemProp="position" content={2} />
          </li>
        </ol>
        <div className="container" id="main">
          <div>
            <h2>Login to BattleMetrics</h2>
            <div className="row">
              <div className="col-md-12">
                By clicking "Login" or "Sign in through Steam" you agree to our{" "}
                <a href="/terms">Terms of Service</a> and{" "}
                <a href="/privacy_policy">Privacy Policy</a>.
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-4 col-md-push-4">
                <div id="identity-providers">
                  <a href={props.global.STORAGE + "/account/login/steam"}>
                    <img
                      src="https://cdn.battlemetrics.com/app/assets/steam_signin.28556.png"
                      alt="Sign in with Steam"
                      width={154}
                      height={23}
                    />
                  </a>
                </div>
              </div>
              <div className="col-md-4 col-md-pull-4">
                <form target="#" method="POST">
                  <div className="form-group">
                    <label htmlFor="input-username">Email</label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      name="username"
                      id="input-username"
                      type="email"
                      className="form-control"
                      label="Email"
                      required=""
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="input-password">Password</label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      id="input-password"
                      type="password"
                      className="form-control"
                      label="Password"
                      required=""
                    />
                  </div>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="remember" /> Remember Me
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="css-1dcotcn"
                    onClick={(e) => {
                      e.preventDefault();
                      login();
                    }}
                  >
                    Login
                  </button>
                  <a
                    className="pull-right css-1m4imoj"
                    href="/account/forgotPassword"
                  >
                    Forgot password
                  </a>
                  <a
                    className="pull-right css-1m4imoj"
                    href="/account/register"
                  >
                    Register
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="right side-unit">
        <div style={{}} />
      </div>
    </div>
  );
}
export default SignIn;

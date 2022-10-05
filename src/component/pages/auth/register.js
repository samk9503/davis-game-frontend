import axios from "axios";
import React, { useState } from "react";
import UserProfile from './user';

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const register = () => {
    axios({
      method: 'post', //you can set what request you want to be
      url: 'http://127.0.0.1:8000/api/register',
      data: { email: email, password: password },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':'POST, GET, OPTIONS, PUT, DELETE',
        'Access-Control-Allow-Headers':'Content-Type, X-Auth-Token, Origin, Authorization',
      }
    }).then((res) => {
        UserProfile.setEmail(res.data[0].email);
        UserProfile.setId(res.data[0].id);
        props.handleClick('/')
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
            <a itemProp="item" href="/account/register">
              <span itemProp="name">Register</span>
            </a>
            <meta itemProp="position" content={2} />
          </li>
        </ol>
        <div className="container" id="main">
          <div>
            <h2>Register for BattleMetrics</h2>
            <div className="row">
              <div className="col-md-12">
                By clicking "Register" or "Sign in through Steam" you agree to
                our <a href="/terms">Terms of Service</a> and{" "}
                <a href="/privacy_policy">Privacy Policy</a>.
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-4 col-md-push-4">
                <div className="css-1wgca3t">
                  <a href="/api/account/login/steam">
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
                <form>
                  <div className="form-group">
                    <label htmlFor="input-username">Email</label>
                    <input
                      onChange={e=>setEmail(e.target.value)}
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
                      onChange={e=>setPassword(e.target.value)}
                      name="password"
                      id="input-password"
                      type="password"
                      className="form-control"
                      label="Password"
                      required=""
                    />
                  </div>
                  <button type="submit" className="css-1gpywaj" onClick={e=>{e.preventDefault();register()}}>
                    Register
                  </button>
                  <a className="pull-right css-1m4imoj" href="/account/login">
                    Login
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
export default Register;

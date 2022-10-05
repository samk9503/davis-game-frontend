import React from "react";
function Alerts() {
  return (
    <div id="site-container" className="css-1q59fp3">
      <div className="left side-unit">
        <div style={{}} />
      </div>
      <div id="content-container">
        <div className="container" id="main">
          <div className="css-xdr8f7">
            <div className="row">
              <div className="col-md-6">
                <h1 className="h2">About Alerts</h1>
                <p>
                  Alerts let you keep track of any servers and players tracked
                  by BattleMetrics. Keep track of your friends, enemies, and
                  favorite servers.
                </p>
                <p>
                  All BattleMetrics accounts have access to alerts. If enabled,
                  you will be notified in browser for all alerts and you may
                  also optionally receive an email or Text Message/SMS (
                  <a className="css-p9ht2a" href="/subscription/plans">
                    Paid plans only
                  </a>
                  ) notice for triggered alerts.
                </p>
                <div className="css-1mexe8m">
                  <div>
                    <a
                      className="css-1dcotcn"
                      href="/account/register?after=alerts%2Fadd"
                    >
                      Register to get started
                    </a>{" "}
                    or{" "}
                    <a
                      className="css-1dcotcn"
                      href="/account/login?after=alerts%2Fadd"
                    >
                      Login
                    </a>
                  </div>
                </div>
                <h2>Alert Objects</h2>
                <p>
                  Alert objects refer to the player(s) or servers you are
                  tracking with an alert. Standard accounts are limited to 10
                  alert objects, however{" "}
                  <a className="css-p9ht2a" href="/subscription/plans">
                    paid accounts
                  </a>{" "}
                  may track unlimited alert objects.
                </p>
                <ul>
                  <li>
                    A single alert tracking five servers would count as five
                    alert objects.
                  </li>
                  <li>
                    Three alerts tracking three servers would count as three
                    objects.
                  </li>
                  <li>
                    One alert tracking one player would count as one object.
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <h2>Alert Types</h2>
                <dl>
                  <dt>Server Status</dt>
                  <dd>
                    Find out when a server goes online or offline. Players can
                    use this to track when their favorite servers come online
                    and admins can make sure server crashes don't go unnoticed.
                  </dd>
                  <dt>Player Count</dt>
                  <dd>
                    Track when a server's player count reaches, exceeds, or dips
                    under any number. Make sure you're online when the action
                    gets started.
                  </dd>
                  <dt>Player Join and Leave</dt>
                  <dd>
                    <p>
                      Join your friends as soon as they connect or make sure
                      you're online to defend against your enemies.
                    </p>
                    <p>
                      Player alerts will trigger on partial matches or can
                      (optionally) use regular expressions (
                      <a href="https://en.wikipedia.org/wiki/Regular_expression">
                        learn more
                      </a>
                      ) and can trigger only for the first matching player
                      (default) or for every match.
                    </p>
                  </dd>
                </dl>
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
export default Alerts;

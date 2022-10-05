import React from "react";
function Premium() {
  return (
    <div id="site-container" className="css-1q59fp3">
      <div className="left side-unit">
        <div />
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
            <a itemProp="item" href="/subscription">
              <span itemProp="name">Subscription Plans</span>
            </a>
            <meta itemProp="position" content={1} />
          </li>
          <li
            itemProp="itemListElement"
            itemScope=""
            itemType="https://schema.org/ListItem"
            className="css-c7thuy"
          >
            <a itemProp="item" href="/subscription/premium">
              <span itemProp="name">Premium Subscription</span>
            </a>
            <meta itemProp="position" content={2} />
          </li>
        </ol>
        <div className="container" id="main">
          <div className="css-my3vbk">
            <div className="jumbotron text-center">
              <h1>
                BattleMetrics Premium <small>$5/month</small>
              </h1>
              <p>
                BattleMetrics Premium accounts gain access to advanced features
                and customization options designed to help you keep track of
                servers and players.
              </p>
              <div className="css-1mg5rgz">
                <a
                  className="css-8bdzar e177od280"
                  href="/account/register?after=%2Fsubscription%2Fsubscribe%2Fpremium"
                >
                  Subscribe
                </a>
              </div>
            </div>
            <div>
              <div className="row">
                <div className="col-md-4 css-1p48423">
                  <h2>
                    Player Log<small>Three months of player activity</small>
                  </h2>
                  <p>
                    View the player log for any server. See who connected in the
                    past thirty minutes, who joined last week at midnight, or
                    any time inbetween.
                  </p>
                </div>
                <div className="col-md-4 css-1p48423">
                  <h2>
                    Player Flags<small>Favorite and categorize players</small>
                  </h2>
                  <p>
                    Player flags help you to bookmark, track, and categorize
                    player profiles. Choose a title, icon, and color to help
                    distinguish players.
                  </p>
                </div>
                <div className="col-md-4 css-1p48423">
                  <h2>
                    Increased Update Rate
                    <small>Even more accurate information</small>
                  </h2>
                  <p>
                    We'll query all of your favorite servers at least once every
                    five minutes. Receive notifications sooner.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 css-1p48423">
                  <h2>
                    No Advertisements<small>An ad free experience</small>
                  </h2>
                  <p>
                    Ads help us keep BattleMetrics alive. By subscribing to
                    Premium you support us directly, allowing us to turn Ads off
                    for your account.
                  </p>
                </div>
                <div className="col-md-4 css-1p48423">
                  <h2>
                    Custom Banners<small>Make banners fit your website</small>
                  </h2>
                  <p>
                    Full control over the look and feel of your banners. Clone
                    one of our banners or start from scratch: it's up to you.
                    Our banners can make your server information the centerpiece
                    of your website, not an afterthought.{" "}
                    <a href="/banners/new">Try the banner editor</a>.
                  </p>
                </div>
                <div className="col-md-4 css-1p48423">
                  <h2>
                    Text Messaging/SMS Alerts
                    <small>Notifications no matter where you are</small>
                  </h2>
                  <p>
                    Keep tabs on rival players or friends. Find out when your
                    favorite server goes offline or just about anything that
                    happens to a server.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-center">BattleMetrics Premium Features</h3>
              <div className="row">
                <div className="col-md-4">
                  <h4 className="list-unstyled">
                    Free <small>With a BattleMetrics Account:</small>
                  </h4>
                  <ul className="list-unstyled">
                    <li>
                      <i className="glyphicon glyphicon-ok" /> Browser Alerts
                      (unlimited).
                    </li>
                    <li>
                      <i className="glyphicon glyphicon-ok" /> Email Alerts
                      (90/month).
                    </li>
                    <li>
                      <i className="glyphicon glyphicon-ok" /> Basic banners.
                    </li>
                    <li>
                      <i className="glyphicon glyphicon-ok" /> Real time updates
                      on our website.
                    </li>
                    <li>
                      <i className="glyphicon glyphicon-ok" /> 10 alert objects.
                    </li>
                  </ul>
                </div>
                <div className="col-md-8">
                  <h4>
                    BattleMetrics Premium{" "}
                    <small>Everything included in Basic, plus:</small>
                  </h4>
                  <ul className="list-unstyled">
                    <li>
                      <i className="glyphicon glyphicon-ok css-18q9uva" /> Email
                      Alerts (300/month).
                    </li>
                    <li>
                      <i className="glyphicon glyphicon-ok css-18q9uva" /> Text
                      Messaging/SMS Alerts (50/month).
                    </li>
                    <li>
                      <i className="glyphicon glyphicon-ok css-18q9uva" />{" "}
                      Custom banners.
                    </li>
                    <li>
                      <i className="glyphicon glyphicon-ok css-18q9uva" /> HTML
                      banners that update in real-time.
                    </li>
                    <li>
                      <i className="glyphicon glyphicon-ok css-18q9uva" />{" "}
                      Unlimited alert objects.
                    </li>
                    <li>
                      <i className="glyphicon glyphicon-ok css-18q9uva" />{" "}
                      Detailed player logs for the past three months.
                    </li>
                    <li>
                      <i className="glyphicon glyphicon-ok css-18q9uva" />{" "}
                      Advanced player searches.
                    </li>
                    <li>
                      <i className="glyphicon glyphicon-ok css-18q9uva" /> All
                      leaderboard options.
                    </li>
                    <li>
                      <i className="glyphicon glyphicon-ok css-18q9uva" />{" "}
                      Player flags.
                    </li>
                    <li>
                      <i className="glyphicon glyphicon-ok css-18q9uva" />{" "}
                      Player notes.
                    </li>
                    <li>
                      <i className="glyphicon glyphicon-ok css-18q9uva" /> Three
                      months of player session history.
                    </li>
                    <li>
                      <i className="glyphicon glyphicon-ok css-18q9uva" /> All
                      "Related Player" and "Played With" options.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr />
            <div className="css-1mg5rgz">
              <a
                className="css-8bdzar e177od280"
                href="/account/register?after=%2Fsubscription%2Fsubscribe%2Fpremium"
              >
                Subscribe
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="right side-unit">
        <div />
      </div>
    </div>
  );
}
export default Premium;

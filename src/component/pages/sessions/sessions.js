import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

const Sessions = () => {
  const id = useParams().id;
  const [playerCard, setPlayerCard] = useState(null);
  function formatHoursTo12(date) {
    return (
      (date.getUTCHours() % 12 || 12).toString() +
      ":" +
      date.getUTCMinutes() +
      (date.getUTCHours() >= 12 ? " PM" : " AM")
    );
  }
  function getDifferent(date_start, date_stopped) {
    var delta = Math.abs(new Date(date_start) - new Date(date_stopped)) / 1000;
    var hours = Math.floor(delta / 3600) % 24;
    var minutes = Math.floor(delta / 60) % 60;
    return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
  }
  useEffect(() => {
    const getPlayerLog = () => {
      var now = new Date();
      var stop =
        now.getUTCFullYear() +
        "-" +
        ("0" + (now.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + now.getUTCDate()).slice(-2) +
        "T" +
        ("0" + now.getUTCHours()).slice(-2) +
        ":" +
        ("0" + now.getUTCMinutes()).slice(-2) +
        ":00.000Z";
      var before30MIN = new Date(now.getTime() - 1800000);
      var start =
        before30MIN.getUTCFullYear() +
        "-" +
        ("0" + (before30MIN.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + before30MIN.getUTCDate()).slice(-2) +
        "T" +
        ("0" + before30MIN.getUTCHours()).slice(-2) +
        ":" +
        ("0" + before30MIN.getUTCMinutes()).slice(-2) +
        ":00.000Z";
      axios
        .get(
          "https://api.battlemetrics.com/servers/" +
            id +
            "/relationships/sessions?start=" +
            start +
            "&stop=" +
            stop
        )
        .then((res) => {
          setPlayerCard(
            res.data.data
              .sort((a, b) => (a.attributes.name < b.attributes.name ? -1 : 1))
              .sort((a, b) =>
                new Date(a.attributes.start) > new Date(b.attributes.start)
                  ? -1
                  : 1
              )
              .map((e) => (
                <li className="css-1eyiel6">
                  <div className="css-ov1ktg">
                    {e.attributes.firstTime ? (
                      <div className="css-1s0xtl3">
                        <i className="glyphicon glyphicon-star" />
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="css-1ago99h">
                      <a className="css-zwebxb" href="/players/1097901548">
                        {e.attributes.name}
                      </a>
                    </div>
                    <div className="css-79jcmg">
                      <time
                        dateTime={e.attributes.start}
                        title={Date(e.attributes.start)}
                      >
                        {moment(e.attributes.start).fromNow()}
                      </time>
                    </div>
                  </div>
                  <div className="css-1fpw88h">
                    <span className="css-dfavf8">
                      Joined:{" "}
                      <time
                        dateTime="2022-09-29T13:03:13.106Z"
                        title="Thursday, September 29, 2022 1:03 PM"
                      >
                        {formatHoursTo12(new Date(e.attributes.start))}
                      </time>
                    </span>
                    <span className="css-dfavf8">
                      Left:{" "}
                      <time
                        dateTime="2022-09-29T13:09:18.773Z"
                        title="Thursday, September 29, 2022 1:09 PM"
                      >
                        {e.attributes.stop
                          ? formatHoursTo12(new Date(e.attributes.stop))
                          : "Still online"}
                      </time>
                    </span>
                    {e.attributes.stop ? (
                      <span>
                        Duration:{" "}
                        <time dateTime="PT6M5.667S" title="PT6M5.667S" tz="UTC">
                          {getDifferent(e.attributes.start, e.attributes.stop)}
                        </time>
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                </li>
              ))
          );
        });
    };
    getPlayerLog();
  }, []);
  return (
    <div id="site-container" className="css-1q59fp3">
      <div className="left side-unit">
        <div className="css-1xqfl3j" />
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
            <a itemProp="item" href="/servers">
              <span itemProp="name">Servers</span>
            </a>
            <meta itemProp="position" content={1} />
          </li>
          <li
            itemProp="itemListElement"
            itemScope=""
            itemType="https://schema.org/ListItem"
            className="css-ku7g1k"
          >
            <a itemProp="item" href="/servers/csgo">
              <span itemProp="name">Counter-Strike: Global Offensive</span>
            </a>
            <meta itemProp="position" content={2} />
          </li>
          <li
            itemProp="itemListElement"
            itemScope=""
            itemType="https://schema.org/ListItem"
            className="css-ku7g1k"
          >
            <a itemProp="item" href="/servers/csgo/3824982">
              <span itemProp="name">
                [GFLClan.com] Zombie Escape 24/7 | Rank | Recruiting | NoBlock
              </span>
            </a>
            <meta itemProp="position" content={3} />
          </li>
          <li
            itemProp="itemListElement"
            itemScope=""
            itemType="https://schema.org/ListItem"
            className="css-c7thuy"
          >
            <a itemProp="item" href="/servers/csgo/3824982/sessions">
              <span itemProp="name">Player Log</span>
            </a>
            <meta itemProp="position" content={4} />
          </li>
        </ol>
        <div className="container" id="main">
          <div id="ServerSessionHistoryPage">
            <h2>
              Player Log{" "}
              <small>
                for [GFLClan.com] Zombie Escape 24/7 | Rank | Recruiting |
                NoBlock
              </small>
            </h2>
            <div className="css-18j87yw">
              <p>
                <a className="css-p9ht2a" href="/premium">
                  Premium
                </a>{" "}
                users can view the past three months of sessions. See who joined
                right before that hacker hit your server, who you were playing
                with last week, or just who was online yesterday at midnight.
              </p>
            </div>
            <div className="css-1rmctix">
              <div className="css-m3isxl" />
              <form className="sessions-by-start-time">
                <div className="css-1b4t0yk">
                  Show connections starting up to{" "}
                  <div className="css-1jon35n">
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={30}
                    />
                  </div>{" "}
                  minutes after{" "}
                  <div className="form-group css-1i77gz3">
                    <input
                      id="startAt"
                      name="startAt"
                      className="form-control"
                      defaultValue="09/29/2022 12:39 PM"
                    />
                  </div>
                </div>
                <button type="submit" className="css-1dcotcn">
                  Search
                </button>
              </form>
              <hr />
              <form className="sessions-by-time-online">
                <div className="form-group css-756d19">
                  <label htmlFor="sessionsAt">
                    Show players that were online at:
                  </label>{" "}
                  <input
                    id="sessionsAt"
                    name="sessionsAt"
                    className="form-control"
                    placeholder="09/29/2022 1:09 PM"
                    defaultValue="09/29/2022 12:39 PM"
                  />
                  <p className="css-10ghuph">09/29/2022 12:39 PM</p>
                </div>
                <button type="submit" className="css-1dcotcn">
                  Search
                </button>
              </form>
            </div>
            <hr />
            <p>
              Showing players that connected between{" "}
              <time
                dateTime="2022-09-29T12:39:23.815Z"
                title="Thursday, September 29, 2022 12:39 PM"
              >
                12:39 PM
              </time>{" "}
              to{" "}
              <time
                dateTime="2022-09-29T13:09:23.815Z"
                title="Thursday, September 29, 2022 1:09 PM"
              >
                1:09 PM
              </time>
              .
            </p>
            <div className="session-history">
              <ol className="list-unstyled">{playerCard}</ol>
            </div>
          </div>
        </div>
      </div>
      <div className="right side-unit">
        <div />
      </div>
    </div>
  );
};
export default Sessions;

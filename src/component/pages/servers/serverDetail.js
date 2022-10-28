import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../widgets/loading";
import ReactCountryFlag from "react-country-flag";
import getDistance from "geolib/es/getDistance";
import Chart from "./widgets/chart";
import moment from "moment";
import UserProfile from "../auth/user";
import Swal from 'sweetalert2'

const ServerDetail = (props) => {
  var id = useParams().id;
  const [loading, setLoading] = useState(true);
  const [isTableOpened, setIsTableOpened] = useState(false);
  const [server, setServer] = useState(null);
  const [rules, setRules] = useState(null);
  const [country, setCountry] = useState("");
  const [distance, setDistance] = useState("");
  const [recentPlayers, setRecentPlayers] = useState(null);
  const [mostTimePlayers, setMostTimePlayers] = useState(null);
  const [playerLog, setPlayerLog] = useState(null);
  const [activePlayers, setActivePlayers] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const addToFavorite = () => {
    axios
      .post(props.global.API + `/setFavoriteServers`, {
        id: UserProfile.getId(),
        serverId: id,
      })
      .then((res) => {
        setIsFavorite(true);
      });
  };
  const removeFromFavorite = () => {
    axios
      .post(props.global.API + `/removeFavoriteServers`, {
        id: UserProfile.getId(),
        serverId: id,
      })
      .then((res) => {
        setIsFavorite(false);
      });
  };
  const vote = (e) => {
    e.preventDefault();

    axios
      .post(props.global.API + "/getAddons", { serverId: id })
      .then((res) => {
        if (res.data) {
          var addons = [];
          res.data.forEach((element) => {
            addons.push(element);
          });
          if (addons.some((el) => el.addonsId === "6")) {
            axios
              .post(props.global.API + "/setVotes", {
                serverId: id,
                userId: UserProfile.getId(),
                after: 8,
              })
              .then((res) => {
                if (res.data != "already voted") {
                  if (addons.some((el) => el.addonsId === "1")) {
                    axios.post(
                      addons.filter((el) => el.addonsId === "1")[0].webhook,
                      {
                        content: "someone voted for your server",
                      }
                    );
                  }
                }
              });
          } else {
            axios
              .post(props.global.API + "/setVotes", {
                serverId: id,
                userId: UserProfile.getId(),
                after: 12,
              })
              .then((res) => {
                if (res.data != "already voted") {
                if (addons.some((el) => el.addonsId === "1")) {
                  axios.post(
                    addons.filter((el) => el.addonsId === "1")[0].webhook,
                    {
                      content: "someone voted for your server",
                    }
                  );
                }
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'voted successfully',
                  showConfirmButton: false,
                  timer: 1500
                })
              }else{
                  Swal.fire({
                    title: 'Try again later',
                    text: 'You can\'t vote right now because you already voted',
                    icon: 'error',
                    confirmButtonText: 'close'
                  })
                }
              });
          }
        }
      });
  };
  useEffect(() => {
    if (server != null) {
      const getDis = () => {
        axios
          .get(
            "https://api.battlemetrics.com/account?include=organizations,organizationUser,roles,organizations.banLists,favorites,subscription,player,loginMethod,organizationFriend"
          )
          .then((res) => {
            setCountry(res.data.data.attributes);
            setDistance(
              Math.ceil(
                getDistance(
                  {
                    longitude: res.data.data.attributes.location[0],
                    latitude: res.data.data.attributes.location[1],
                  },
                  {
                    longitude: server.attributes.location[0],
                    latitude: server.attributes.location[1],
                  }
                ) *
                  0.000621 *
                  1.6
              )
            );
          });
      };
      getDis();
      function getDifferent(date_future) {
        var delta =
          Math.abs(new Date(new Date().toUTCString()) - new Date(date_future)) /
          1000;
        var hours = Math.floor(delta / 3600) % 24;
        var minutes = Math.floor(delta / 60) % 60;
        return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
      }
      const getRecetPlayer = () => {
        axios
          .get(
            "https://api.battlemetrics.com/servers/" +
              id +
              "?include=session,uptime:7,uptime:30,serverEvent,serverGroup,serverDescription,orgDescription&relations[server]=game,serverGroup,organization,orgGroup&relations[session]=server,player&fields[server]=id,name,address,ip,port,portQuery,players,maxPlayers,rank,createdAt,updatedAt,location,country,status,details,queryStatus&fields[session]=start,stop,firstTime,name&fields[orgDescription]=public,approvedAt"
          )
          .then((res) => {
            setActivePlayers(
              res.data.included
                .filter((item) => item.type === "session")
                .sort(function(x, y) {
                  return (
                    new Date(x.attributes.start) - new Date(y.attributes.start)
                  );
                })
                .map((e) => (
                  <tr>
                    <td>
                      <a className="css-zwebxb" href="/players/1103984086">
                        {e.attributes.name}
                      </a>
                    </td>
                    <td>
                      <time
                        dateTime="PT2H2M8.419S"
                        title="Friday, September 16, 2022 11:59 AM"
                        time={1663336879765}
                      >
                        {getDifferent(e.attributes.start)}
                      </time>
                    </td>
                    <td className="css-7a8yo0">
                      {" "}
                      <button type="button" className="css-sanbnz">
                        <i className="glyphicon glyphicon-flag" />
                      </button>
                    </td>
                  </tr>
                ))
            );
            setRecentPlayers(
              res.data.included
                .filter((item) => item.type === "serverEvent")
                .map((e) =>
                  e.eventType == "addPlayer" ? (
                    <div className="event">
                      <span className="event-msg">
                        {e.attributes.name} joined the game
                      </span>
                      <time
                        dateTime={new Date(
                          e.attributes.timestamp
                        ).toTimeString()}
                        title={new Date(e.attributes.timestamp).toTimeString()}
                      >
                        {moment(e.attributes.timestamp).fromNow()}
                      </time>
                    </div>
                  ) : (
                    <div className="event">
                      <span className="event-msg">
                        {e.attributes.name
                          ? e.attributes.name + " left the game"
                          : "Server responded to query"}
                      </span>
                      <time
                        dateTime={new Date(
                          e.attributes.timestamp
                        ).toTimeString()}
                        title={new Date(e.attributes.timestamp).toTimeString()}
                      >
                        {moment(e.attributes.timestamp).fromNow()}
                      </time>
                    </div>
                  )
                )
            );
          });
      };
      getRecetPlayer();
      const getMostTimePlayed = () => {
        var now = new Date();
        var stop =
          now.getUTCFullYear() +
          "-" +
          ("0" + (now.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + now.getUTCDate()).slice(-2) +
          "T" +
          "00:00:00.000Z";
        var howManyDays = 30 * 24 * 60 * 60 * 1000;
        var afterVDAY = new Date(now.getTime() - howManyDays);
        var start =
          afterVDAY.getUTCFullYear() +
          "-" +
          ("0" + (afterVDAY.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + afterVDAY.getUTCDate()).slice(-2) +
          "T" +
          "00:00:00.000Z";
        axios
          .get(
            "https://api.battlemetrics.com/servers/" +
              id +
              "/relationships/leaderboards/time?filter[period]=" +
              start +
              ":" +
              stop
          )
          .then((res) => {
            setMostTimePlayers(
              res.data.data.map((e) => (
                <tr>
                  <td style={{ width: 16 }}>{e.attributes.rank}</td>
                  <td className="player">
                    <a className="player-name" href={"/players/" + e.id}>
                      {e.attributes.name}
                    </a>
                  </td>
                  <td>
                    <time dateTime="PT202H3M27S" title="PT202H3M27S" tz="UTC">
                      {Math.floor(e.attributes.value / 3600) +
                        ":" +
                        (
                          "0" +
                          Math.floor(
                            (e.attributes.value -
                              Math.floor(e.attributes.value / 3600) * 3600) /
                              60
                          )
                        ).slice(-2)}
                    </time>
                  </td>
                </tr>
              ))
            );
          });
      };
      getMostTimePlayed();
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
              stop +
              ""
          )
          .then((res) => {
            setPlayerLog(
              res.data.data.map((e) => (
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
                      <a className="css-zwebxb" href="/players/917270046">
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
                        dateTime="2022-09-16T13:55:02.627Z"
                        title="Friday, September 16, 2022 1:55 PM"
                      >
                        {formatHoursTo12(new Date(e.attributes.start))}
                      </time>
                    </span>
                    <span className="css-dfavf8">
                      Left:{" "}
                      {e.attributes.stop
                        ? formatHoursTo12(new Date(e.attributes.stop))
                        : "Still online"}
                    </span>
                  </div>
                </li>
              ))
            );
          });
      };
      getPlayerLog();
      setLoading(false);
    }
  }, [server]);
  function formatHoursTo12(date) {
    return (
      (date.getUTCHours() % 12 || 12).toString() +
      ":" +
      date.getUTCMinutes() +
      (date.getUTCHours() >= 12 ? " PM" : " AM")
    );
  }
  useEffect(() => {
    const getServer = () => {
      axios.get("https://api.battlemetrics.com/servers/" + id).then((res) => {
        setServer(res.data.data);
        if (res.data.data.attributes.details.rules) {
          var rule = res.data.data.attributes.details.rules;
          var ruleSeperated = Object.keys(rule).map((key) => [key, rule[key]]);
          setRules(
            ruleSeperated.map((element) => (
              <tr>
                <td>{element[0]}</td>
                <td>
                  <div class="css-1ezvw7m">{element[1]}</div>
                </td>
              </tr>
            ))
          );
        }
      });
    };
    getServer();
    const checkIfInFavorite = () => {
      axios
        .post(props.global.API + `/getFavoriteSpecificServer`, {
          id: UserProfile.getId(),
          serverId: id,
        })
        .then((res) => {
          if (res.data == true) {
            setIsFavorite(true);
          }
        });
    };
    checkIfInFavorite();
  }, []);
  return loading === true ? (
    <Loading />
  ) : (
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
            className="css-c7thuy"
          >
            <a itemProp="item" href={"/servers/csgo/" + id}>
              <span itemProp="name">{server.attributes.name}</span>
            </a>
            <meta itemProp="position" content={3} />
          </li>
        </ol>
        <div className="container" id="main">
          <div id="serverPage">
            {" "}
            <h2 className="css-u0fcdd">
              {server.attributes.name}
              <div className="server-btns pull-right">
                <a
                  className="css-1dcotcn"
                  href="vote"
                  onClick={(e) => {
                    vote(e);
                  }}
                >
                  Vote
                </a>{" "}
                <a
                  href={
                    "steam://connect/" +
                    server.attributes.ip +
                    ":" +
                    server.attributes.port
                  }
                  className="css-1dcotcn"
                >
                  Connect
                </a>{" "}
                <a
                  rel="nofollow"
                  className="css-1dcotcn"
                  href="/alerts/add?server=16463398"
                >
                  <i className="glyphicon glyphicon-bell" />{" "}
                </a>{" "}
                <button
                  type="button"
                  className={isFavorite ? "css-1dbjou6" : "css-p0j53r"}
                  onClick={(e) => {
                    e.preventDefault();
                    isFavorite ? removeFromFavorite() : addToFavorite();
                  }}
                >
                  <i className="glyphicon glyphicon-star" />{" "}
                </button>{" "}
                <span>
                  <button type="button" disabled="" className="css-8bdzar">
                    <i className="glyphicon glyphicon-refresh" />
                  </button>
                </span>
              </div>
              <div className="clearfix" />
            </h2>
            <div className="row">
              <div className="col-md-6 server-info">
                <dl className="css-1i1egz4">
                  <dt>Rank</dt>
                  <dd>#{server.attributes.rank}</dd>
                  <dt>Player count</dt>
                  <dd>
                    {server.attributes.players}/{server.attributes.maxPlayers}
                  </dd>
                  <dt>Address</dt>
                  <dd>
                    <span
                      title={
                        server.attributes.ip + ":" + server.attributes.port
                      }
                    >
                      {server.attributes.ip + ":" + server.attributes.port}
                    </span>
                  </dd>
                  <dt>Status</dt>
                  <dd>{server.attributes.status}</dd>
                  <dt>Distance</dt>
                  <dd>
                    <span>{distance} km</span>
                  </dd>
                  <dt>Country</dt>
                  <dd>
                    <ReactCountryFlag
                      countryCode={server.attributes.country}
                      style={{
                        width: "16px",
                        height: "11px",
                      }}
                      svg
                      cdnSuffix="svg"
                      title="US"
                    />{" "}
                  </dd>
                  <dt>Uptime</dt>
                  <dd>
                    <div>
                      7 Days:{" "}
                      <span style={{ color: "rgb(104, 230, 25)" }}>97%</span>,
                      30 Days:{" "}
                      <span style={{ color: "rgb(141, 230, 25)" }}>86%</span>
                      <br />
                      <a href="/servers/csgo/16463398/downtime">
                        Downtime History
                      </a>
                    </div>
                  </dd>
                </dl>
                <dl className="css-157ht8v">
                  <dt>Map</dt>
                  <dd>{server.attributes.details.map}</dd>
                  <dt>Password Protected</dt>
                  <dd>
                    {server.attributes.details.password ? "True" : "False"}
                  </dd>
                </dl>
                <div style={{ display: rules ? "" : "none" }}>
                  <button
                    className="css-1n2och0"
                    onClick={(e) => setIsTableOpened(!isTableOpened)}
                  >
                    <span>
                      <i
                        className={
                          isTableOpened
                            ? "glyphicon glyphicon-chevron-right css-a52oks"
                            : "glyphicon glyphicon-chevron-right css-19likfw"
                        }
                      />{" "}
                      Server Settings
                    </span>
                  </button>
                  <div
                    className="collapse"
                    style={
                      isTableOpened
                        ? { display: "block", visibility: "unset" }
                        : {}
                    }
                  >
                    <table className="css-5k1z86">
                      <thead>
                        <tr>
                          <th>Setting</th>
                          <th>Value</th>
                        </tr>
                      </thead>
                      <tbody>{rules}</tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="css-1mosf22" style={{}} />
                <div className="css-xjwonj">
                  <div>
                    <button className="visible-xs css-1n2och0">
                      <span>
                        <i className="glyphicon glyphicon-chevron-right css-19likfw" />{" "}
                        Server Events
                      </span>
                    </button>
                    <div className="collapse">{recentPlayers}</div>
                  </div>
                </div>
                <div className="row css-1376tv9">
                  <div className="col-md-6">
                    <a
                      rel="nofollow"
                      className="css-1dcotcn"
                      href="/alerts/add?server=16463398"
                    >
                      <i className="glyphicon glyphicon-bell" /> Add Alert
                    </a>
                  </div>
                  <div className="col-md-6">
                    <button
                      type="button"
                      className={isFavorite ? "css-1dbjou6" : "css-p0j53r"}
                      onClick={(e) =>
                        isFavorite ? removeFromFavorite() : addToFavorite()
                      }
                    >
                      <i className="glyphicon glyphicon-star" /> Favorite
                    </button>
                  </div>
                  <div className="col-md-6">
                    <a
                      className="css-1dcotcn"
                      href="/servers/csgo/16463398/banners"
                    >
                      <i className="glyphicon glyphicon-picture" /> Banners
                    </a>
                  </div>
                  <div className="col-md-6">
                    <a
                      className="css-1dcotcn"
                      href="/servers/csgo/16463398/players"
                    >
                      Players
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="col-md-6"
                style={{
                  marginLeft: isTableOpened ? "auto" : "",
                  display: rules ? "" : "none",
                }}
              >
                <h3>Server Information</h3>
                <div className="css-18j87yw">
                  <p>
                    Is this your server? Claim your server to display additional
                    information here and gain access to our admin tools.
                  </p>
                  <p>
                    <a
                      className="css-135q006"
                      href="/rcon/setup?server=16463398"
                    >
                      Setup Server
                    </a>{" "}
                    <a
                      className="css-p9ht2a"
                      href="/subscription/rcon?server=16463398"
                    >
                      RCON Features
                    </a>
                    <br />
                    <small className="css-1r6xxdm">
                      7 day free trial. No payment information required for
                      trial.
                    </small>
                  </p>
                </div>
              </div>
            </div>
            <h3>Server Statistics</h3>
            <div className="row" style={{ display: rules ? "none" : "" }}>
              <Chart id={id} title={"test test"} url={"rank-history"} />
              <Chart id={id} title={"test test"} url={"time-played-history"} />
            </div>
            <div className="row" style={{ display: rules ? "none" : "" }}>
              <div className="col-md-6">
                <div>
                  <h4>Related &amp; Duplicate Servers</h4>
                  <p>
                    We have not identified any other servers that appear similar
                    to this one.
                  </p>
                </div>
              </div>
            </div>
            <div className="row" style={{ display: rules ? "" : "none" }}>
              <Chart id={id} title={"Server Rank"} url={"rank-history"} />
              <Chart
                id={id}
                title={"Time played"}
                url={"time-played-history"}
              />
            </div>
            <div className="row" style={{ display: rules ? "" : "none" }}>
              <div className="col-md-6">
                <h4>
                  Player Count{" "}
                  <div className="timeseries-range css-6rhxv9">
                    <a
                      rel="nofollow"
                      className=" css-p0j53r"
                      href="/servers/csgo/16463398?playerCount=RT"
                    >
                      RT
                    </a>
                    <a
                      rel="nofollow"
                      className="active css-p0j53r"
                      href="/servers/csgo/16463398?playerCount=24H"
                    >
                      24H
                    </a>
                    <a
                      rel="nofollow"
                      className=" css-p0j53r"
                      href="/servers/csgo/16463398?playerCount=7D"
                    >
                      7D
                    </a>
                    <a
                      rel="nofollow"
                      className=" css-p0j53r"
                      href="/servers/csgo/16463398?playerCount=30D"
                    >
                      30D
                    </a>
                    <a
                      rel="nofollow"
                      className=" css-p0j53r"
                      href="/servers/csgo/16463398?playerCount=3M"
                    >
                      3M
                    </a>
                  </div>
                </h4>
                <div className="css-da4lgu">
                  <div className="ct-chart">
                    <svg
                      width="100%"
                      height="100%"
                      className="ct-chart-line"
                      style={{ width: "100%", height: "100%" }}
                    >
                      <g className="ct-grids">
                        <line
                          x1={50}
                          x2={50}
                          y1={15}
                          y2={115}
                          className="ct-grid ct-horizontal"
                        />
                        <line
                          x1="156.9387755102041"
                          x2="156.9387755102041"
                          y1={15}
                          y2={115}
                          className="ct-grid ct-horizontal"
                        />
                        <line
                          x1="263.8775510204082"
                          x2="263.8775510204082"
                          y1={15}
                          y2={115}
                          className="ct-grid ct-horizontal"
                        />
                        <line
                          x1="370.81632653061223"
                          x2="370.81632653061223"
                          y1={15}
                          y2={115}
                          className="ct-grid ct-horizontal"
                        />
                        <line
                          x1="477.7551020408163"
                          x2="477.7551020408163"
                          y1={15}
                          y2={115}
                          className="ct-grid ct-horizontal"
                        />
                        <line
                          x1="584.6938775510204"
                          x2="584.6938775510204"
                          y1={15}
                          y2={115}
                          className="ct-grid ct-horizontal"
                        />
                        <line
                          x1="691.6326530612245"
                          x2="691.6326530612245"
                          y1={15}
                          y2={115}
                          className="ct-grid ct-horizontal"
                        />
                        <line
                          y1={115}
                          y2={115}
                          x1={50}
                          x2={705}
                          className="ct-grid ct-vertical"
                        />
                        <line
                          y1="81.66666666666666"
                          y2="81.66666666666666"
                          x1={50}
                          x2={705}
                          className="ct-grid ct-vertical"
                        />
                        <line
                          y1="48.33333333333333"
                          y2="48.33333333333333"
                          x1={50}
                          x2={705}
                          className="ct-grid ct-vertical"
                        />
                        <line
                          y1={15}
                          y2={15}
                          x1={50}
                          x2={705}
                          className="ct-grid ct-vertical"
                        />
                      </g>
                      <g>
                        <g className="ct-series ct-series-a">
                          <path
                            d="M50,115L50,30C54.456,30,58.912,30,63.367,30C67.823,30,72.279,28.333,76.735,28.333C81.19,28.333,85.646,29.444,90.102,30C94.558,30.556,99.014,31.667,103.469,31.667C107.925,31.667,112.381,30,116.837,30C121.293,30,125.748,30,130.204,30C134.66,30,139.116,30,143.571,30C148.027,30,152.483,30,156.939,30C161.395,30,165.85,30,170.306,30C174.762,30,179.218,30,183.673,30C188.129,30,192.585,36.667,197.041,36.667C201.497,36.667,205.952,35.833,210.408,35C214.864,34.167,219.32,30,223.776,30C228.231,30,232.687,34.444,237.143,40C241.599,45.556,246.054,90,250.51,90C254.966,90,259.422,89.286,263.878,88.333C268.333,87.381,272.789,78.333,277.245,78.333C281.701,78.333,286.156,80,290.612,80C295.068,80,299.524,73.333,303.98,73.333C308.435,73.333,312.891,73.333,317.347,73.333C321.803,73.333,326.259,76.667,330.714,76.667C335.17,76.667,339.626,73.333,344.082,73.333C348.537,73.333,352.993,78.333,357.449,78.333C361.905,78.333,366.361,75,370.816,75C375.272,75,379.728,81.667,384.184,81.667C388.639,81.667,393.095,81.667,397.551,81.667C402.007,81.667,406.463,81.667,410.918,81.667C415.374,81.667,419.83,78.333,424.286,78.333C428.741,78.333,433.197,85,437.653,85C442.109,85,446.565,81.667,451.02,80C455.476,78.333,459.932,75.833,464.388,75C468.844,74.167,473.299,74.352,477.755,73.333C482.211,72.315,486.667,58.819,491.122,55C495.578,51.181,500.034,49.444,504.49,46.667C508.946,43.889,513.401,38.333,517.857,38.333C522.313,38.333,526.769,38.333,531.224,38.333C535.68,38.333,540.136,39.444,544.592,40C549.048,40.556,553.503,41.667,557.959,41.667C562.415,41.667,566.871,30,571.327,30C575.782,30,580.238,33.333,584.694,33.333C589.15,33.333,593.605,30,598.061,30C602.517,30,606.973,30,611.429,30C615.884,30,620.34,36.667,624.796,36.667C629.252,36.667,633.707,30,638.163,30C642.619,30,647.075,30,651.531,30C655.986,30,660.442,30,664.898,30C669.354,30,673.81,30,678.265,30C682.721,30,687.177,30,691.633,30L691.633,115Z"
                            className="ct-area"
                          />
                          <path
                            d="M50,30C54.456,30,58.912,30,63.367,30C67.823,30,72.279,28.333,76.735,28.333C81.19,28.333,85.646,29.444,90.102,30C94.558,30.556,99.014,31.667,103.469,31.667C107.925,31.667,112.381,30,116.837,30C121.293,30,125.748,30,130.204,30C134.66,30,139.116,30,143.571,30C148.027,30,152.483,30,156.939,30C161.395,30,165.85,30,170.306,30C174.762,30,179.218,30,183.673,30C188.129,30,192.585,36.667,197.041,36.667C201.497,36.667,205.952,35.833,210.408,35C214.864,34.167,219.32,30,223.776,30C228.231,30,232.687,34.444,237.143,40C241.599,45.556,246.054,90,250.51,90C254.966,90,259.422,89.286,263.878,88.333C268.333,87.381,272.789,78.333,277.245,78.333C281.701,78.333,286.156,80,290.612,80C295.068,80,299.524,73.333,303.98,73.333C308.435,73.333,312.891,73.333,317.347,73.333C321.803,73.333,326.259,76.667,330.714,76.667C335.17,76.667,339.626,73.333,344.082,73.333C348.537,73.333,352.993,78.333,357.449,78.333C361.905,78.333,366.361,75,370.816,75C375.272,75,379.728,81.667,384.184,81.667C388.639,81.667,393.095,81.667,397.551,81.667C402.007,81.667,406.463,81.667,410.918,81.667C415.374,81.667,419.83,78.333,424.286,78.333C428.741,78.333,433.197,85,437.653,85C442.109,85,446.565,81.667,451.02,80C455.476,78.333,459.932,75.833,464.388,75C468.844,74.167,473.299,74.352,477.755,73.333C482.211,72.315,486.667,58.819,491.122,55C495.578,51.181,500.034,49.444,504.49,46.667C508.946,43.889,513.401,38.333,517.857,38.333C522.313,38.333,526.769,38.333,531.224,38.333C535.68,38.333,540.136,39.444,544.592,40C549.048,40.556,553.503,41.667,557.959,41.667C562.415,41.667,566.871,30,571.327,30C575.782,30,580.238,33.333,584.694,33.333C589.15,33.333,593.605,30,598.061,30C602.517,30,606.973,30,611.429,30C615.884,30,620.34,36.667,624.796,36.667C629.252,36.667,633.707,30,638.163,30C642.619,30,647.075,30,651.531,30C655.986,30,660.442,30,664.898,30C669.354,30,673.81,30,678.265,30C682.721,30,687.177,30,691.633,30"
                            className="ct-line"
                          />
                          <line
                            x1={50}
                            y1={30}
                            x2="50.01"
                            y2={30}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="63.36734693877551"
                            y1={30}
                            x2="63.37734693877551"
                            y2={30}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="76.73469387755102"
                            y1="28.33333333333333"
                            x2="76.74469387755103"
                            y2="28.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="90.10204081632654"
                            y1={30}
                            x2="90.11204081632654"
                            y2={30}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="103.46938775510205"
                            y1="31.66666666666667"
                            x2="103.47938775510205"
                            y2="31.66666666666667"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="116.83673469387755"
                            y1={30}
                            x2="116.84673469387755"
                            y2={30}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="130.20408163265307"
                            y1={30}
                            x2="130.21408163265306"
                            y2={30}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="143.57142857142856"
                            y1={30}
                            x2="143.58142857142855"
                            y2={30}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="156.9387755102041"
                            y1={30}
                            x2="156.9487755102041"
                            y2={30}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="170.30612244897958"
                            y1={30}
                            x2="170.31612244897957"
                            y2={30}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="183.6734693877551"
                            y1={30}
                            x2="183.68346938775508"
                            y2={30}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="197.0408163265306"
                            y1="36.66666666666667"
                            x2="197.0508163265306"
                            y2="36.66666666666667"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="210.40816326530611"
                            y1={35}
                            x2="210.4181632653061"
                            y2={35}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="223.77551020408163"
                            y1={30}
                            x2="223.78551020408162"
                            y2={30}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="237.14285714285714"
                            y1={40}
                            x2="237.15285714285713"
                            y2={40}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="250.51020408163265"
                            y1={90}
                            x2="250.52020408163264"
                            y2={90}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="263.8775510204082"
                            y1="88.33333333333333"
                            x2="263.8875510204082"
                            y2="88.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="277.2448979591837"
                            y1="78.33333333333334"
                            x2="277.25489795918367"
                            y2="78.33333333333334"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="290.61224489795916"
                            y1={80}
                            x2="290.62224489795915"
                            y2={80}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="303.9795918367347"
                            y1="73.33333333333334"
                            x2="303.9895918367347"
                            y2="73.33333333333334"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="317.3469387755102"
                            y1="73.33333333333334"
                            x2="317.3569387755102"
                            y2="73.33333333333334"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="330.7142857142857"
                            y1="76.66666666666666"
                            x2="330.7242857142857"
                            y2="76.66666666666666"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="344.0816326530612"
                            y1="73.33333333333334"
                            x2="344.0916326530612"
                            y2="73.33333333333334"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="357.44897959183675"
                            y1="78.33333333333334"
                            x2="357.45897959183674"
                            y2="78.33333333333334"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="370.81632653061223"
                            y1={75}
                            x2="370.8263265306122"
                            y2={75}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="384.18367346938777"
                            y1="81.66666666666666"
                            x2="384.19367346938776"
                            y2="81.66666666666666"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="397.55102040816325"
                            y1="81.66666666666666"
                            x2="397.56102040816324"
                            y2="81.66666666666666"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="410.9183673469388"
                            y1="81.66666666666666"
                            x2="410.9283673469388"
                            y2="81.66666666666666"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="424.2857142857143"
                            y1="78.33333333333334"
                            x2="424.29571428571427"
                            y2="78.33333333333334"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="437.6530612244898"
                            y1={85}
                            x2="437.6630612244898"
                            y2={85}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="451.0204081632653"
                            y1={80}
                            x2="451.0304081632653"
                            y2={80}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="464.38775510204084"
                            y1={75}
                            x2="464.39775510204083"
                            y2={75}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="477.7551020408163"
                            y1="73.33333333333334"
                            x2="477.7651020408163"
                            y2="73.33333333333334"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="491.1224489795918"
                            y1={55}
                            x2="491.1324489795918"
                            y2={55}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="504.48979591836735"
                            y1="46.66666666666667"
                            x2="504.49979591836734"
                            y2="46.66666666666667"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="517.8571428571429"
                            y1="38.33333333333333"
                            x2="517.8671428571429"
                            y2="38.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="531.2244897959183"
                            y1="38.33333333333333"
                            x2="531.2344897959183"
                            y2="38.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="544.5918367346939"
                            y1={40}
                            x2="544.6018367346938"
                            y2={40}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="557.9591836734694"
                            y1="41.66666666666667"
                            x2="557.9691836734694"
                            y2="41.66666666666667"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="571.3265306122449"
                            y1={30}
                            x2="571.3365306122449"
                            y2={30}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="584.6938775510204"
                            y1="33.33333333333333"
                            x2="584.7038775510204"
                            y2="33.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="598.0612244897959"
                            y1={30}
                            x2="598.0712244897959"
                            y2={30}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="611.4285714285714"
                            y1={30}
                            x2="611.4385714285714"
                            y2={30}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="624.795918367347"
                            y1="36.66666666666667"
                            x2="624.805918367347"
                            y2="36.66666666666667"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="638.1632653061224"
                            y1={30}
                            x2="638.1732653061224"
                            y2={30}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="651.530612244898"
                            y1={30}
                            x2="651.5406122448979"
                            y2={30}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="664.8979591836735"
                            y1={30}
                            x2="664.9079591836735"
                            y2={30}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="678.265306122449"
                            y1={30}
                            x2="678.275306122449"
                            y2={30}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="691.6326530612245"
                            y1={30}
                            x2="691.6426530612245"
                            y2={30}
                            className="ct-point"
                            //
                            //
                          />
                        </g>
                        <g className="ct-series ct-series-b">
                          <path
                            d="M50,115L50,31.667C54.456,32.222,58.912,32.244,63.367,33.333C67.823,34.422,72.279,115,76.735,115C81.19,115,85.646,35,90.102,35C94.558,35,99.014,40,103.469,40C107.925,40,112.381,33.333,116.837,33.333C121.293,33.333,125.748,33.333,130.204,33.333C134.66,33.333,139.116,115,143.571,115C148.027,115,152.483,115,156.939,115C161.395,115,165.85,36.667,170.306,36.667C174.762,36.667,179.218,37.246,183.673,38.333C188.129,39.421,192.585,115,197.041,115C201.497,115,205.952,46.655,210.408,41.667C214.864,36.678,219.32,33.333,223.776,33.333C228.231,33.333,232.687,41.156,237.143,50C241.599,58.844,246.054,115,250.51,115C254.966,115,259.422,97.895,263.878,93.333C268.333,88.772,272.789,83.333,277.245,83.333C281.701,83.333,286.156,86.667,290.612,86.667C295.068,86.667,299.524,78.333,303.98,78.333C308.435,78.333,312.891,78.333,317.347,78.333C321.803,78.333,326.259,115,330.714,115C335.17,115,339.626,76.667,344.082,76.667C348.537,76.667,352.993,77.778,357.449,78.333C361.905,78.889,366.361,79.259,370.816,80C375.272,80.741,379.728,83.333,384.184,83.333C388.639,83.333,393.095,83.333,397.551,83.333C402.007,83.333,406.463,85,410.918,85C415.374,85,419.83,85,424.286,85C428.741,85,433.197,86.667,437.653,86.667C442.109,86.667,446.565,84.667,451.02,83.333C455.476,82,459.932,78.333,464.388,78.333C468.844,78.333,473.299,115,477.755,115C482.211,115,486.667,77.083,491.122,71.667C495.578,66.25,500.034,66.111,504.49,61.667C508.946,57.222,513.401,41.667,517.857,41.667C522.313,41.667,526.769,42.247,531.224,43.333C535.68,44.419,540.136,115,544.592,115C549.048,115,553.503,56.594,557.959,50C562.415,43.406,566.871,38.333,571.327,38.333C575.782,38.333,580.238,38.913,584.694,40C589.15,41.087,593.605,115,598.061,115C602.517,115,606.973,115,611.429,115C615.884,115,620.34,115,624.796,115C629.252,115,633.707,41.667,638.163,41.667C642.619,41.667,647.075,115,651.531,115C655.986,115,660.442,33.333,664.898,33.333C669.354,33.333,673.81,34.048,678.265,35C682.721,35.952,687.177,41.667,691.633,45L691.633,115Z"
                            className="ct-area"
                          />
                          <path
                            d="M50,31.667C54.456,32.222,58.912,32.244,63.367,33.333C67.823,34.422,72.279,115,76.735,115C81.19,115,85.646,35,90.102,35C94.558,35,99.014,40,103.469,40C107.925,40,112.381,33.333,116.837,33.333C121.293,33.333,125.748,33.333,130.204,33.333C134.66,33.333,139.116,115,143.571,115C148.027,115,152.483,115,156.939,115C161.395,115,165.85,36.667,170.306,36.667C174.762,36.667,179.218,37.246,183.673,38.333C188.129,39.421,192.585,115,197.041,115C201.497,115,205.952,46.655,210.408,41.667C214.864,36.678,219.32,33.333,223.776,33.333C228.231,33.333,232.687,41.156,237.143,50C241.599,58.844,246.054,115,250.51,115C254.966,115,259.422,97.895,263.878,93.333C268.333,88.772,272.789,83.333,277.245,83.333C281.701,83.333,286.156,86.667,290.612,86.667C295.068,86.667,299.524,78.333,303.98,78.333C308.435,78.333,312.891,78.333,317.347,78.333C321.803,78.333,326.259,115,330.714,115C335.17,115,339.626,76.667,344.082,76.667C348.537,76.667,352.993,77.778,357.449,78.333C361.905,78.889,366.361,79.259,370.816,80C375.272,80.741,379.728,83.333,384.184,83.333C388.639,83.333,393.095,83.333,397.551,83.333C402.007,83.333,406.463,85,410.918,85C415.374,85,419.83,85,424.286,85C428.741,85,433.197,86.667,437.653,86.667C442.109,86.667,446.565,84.667,451.02,83.333C455.476,82,459.932,78.333,464.388,78.333C468.844,78.333,473.299,115,477.755,115C482.211,115,486.667,77.083,491.122,71.667C495.578,66.25,500.034,66.111,504.49,61.667C508.946,57.222,513.401,41.667,517.857,41.667C522.313,41.667,526.769,42.247,531.224,43.333C535.68,44.419,540.136,115,544.592,115C549.048,115,553.503,56.594,557.959,50C562.415,43.406,566.871,38.333,571.327,38.333C575.782,38.333,580.238,38.913,584.694,40C589.15,41.087,593.605,115,598.061,115C602.517,115,606.973,115,611.429,115C615.884,115,620.34,115,624.796,115C629.252,115,633.707,41.667,638.163,41.667C642.619,41.667,647.075,115,651.531,115C655.986,115,660.442,33.333,664.898,33.333C669.354,33.333,673.81,34.048,678.265,35C682.721,35.952,687.177,41.667,691.633,45"
                            className="ct-line"
                          />
                          <line
                            x1={50}
                            y1="31.66666666666667"
                            x2="50.01"
                            y2="31.66666666666667"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="63.36734693877551"
                            y1="33.33333333333333"
                            x2="63.37734693877551"
                            y2="33.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="76.73469387755102"
                            y1={115}
                            x2="76.74469387755103"
                            y2={115}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="90.10204081632654"
                            y1={35}
                            x2="90.11204081632654"
                            y2={35}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="103.46938775510205"
                            y1={40}
                            x2="103.47938775510205"
                            y2={40}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="116.83673469387755"
                            y1="33.33333333333333"
                            x2="116.84673469387755"
                            y2="33.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="130.20408163265307"
                            y1="33.33333333333333"
                            x2="130.21408163265306"
                            y2="33.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="143.57142857142856"
                            y1={115}
                            x2="143.58142857142855"
                            y2={115}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="156.9387755102041"
                            y1={115}
                            x2="156.9487755102041"
                            y2={115}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="170.30612244897958"
                            y1="36.66666666666667"
                            x2="170.31612244897957"
                            y2="36.66666666666667"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="183.6734693877551"
                            y1="38.33333333333333"
                            x2="183.68346938775508"
                            y2="38.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="197.0408163265306"
                            y1={115}
                            x2="197.0508163265306"
                            y2={115}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="210.40816326530611"
                            y1="41.66666666666667"
                            x2="210.4181632653061"
                            y2="41.66666666666667"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="223.77551020408163"
                            y1="33.33333333333333"
                            x2="223.78551020408162"
                            y2="33.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="237.14285714285714"
                            y1={50}
                            x2="237.15285714285713"
                            y2={50}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="250.51020408163265"
                            y1={115}
                            x2="250.52020408163264"
                            y2={115}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="263.8775510204082"
                            y1="93.33333333333333"
                            x2="263.8875510204082"
                            y2="93.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="277.2448979591837"
                            y1="83.33333333333333"
                            x2="277.25489795918367"
                            y2="83.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="290.61224489795916"
                            y1="86.66666666666667"
                            x2="290.62224489795915"
                            y2="86.66666666666667"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="303.9795918367347"
                            y1="78.33333333333334"
                            x2="303.9895918367347"
                            y2="78.33333333333334"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="317.3469387755102"
                            y1="78.33333333333334"
                            x2="317.3569387755102"
                            y2="78.33333333333334"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="330.7142857142857"
                            y1={115}
                            x2="330.7242857142857"
                            y2={115}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="344.0816326530612"
                            y1="76.66666666666666"
                            x2="344.0916326530612"
                            y2="76.66666666666666"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="357.44897959183675"
                            y1="78.33333333333334"
                            x2="357.45897959183674"
                            y2="78.33333333333334"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="370.81632653061223"
                            y1={80}
                            x2="370.8263265306122"
                            y2={80}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="384.18367346938777"
                            y1="83.33333333333333"
                            x2="384.19367346938776"
                            y2="83.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="397.55102040816325"
                            y1="83.33333333333333"
                            x2="397.56102040816324"
                            y2="83.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="410.9183673469388"
                            y1={85}
                            x2="410.9283673469388"
                            y2={85}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="424.2857142857143"
                            y1={85}
                            x2="424.29571428571427"
                            y2={85}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="437.6530612244898"
                            y1="86.66666666666667"
                            x2="437.6630612244898"
                            y2="86.66666666666667"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="451.0204081632653"
                            y1="83.33333333333333"
                            x2="451.0304081632653"
                            y2="83.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="464.38775510204084"
                            y1="78.33333333333334"
                            x2="464.39775510204083"
                            y2="78.33333333333334"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="477.7551020408163"
                            y1={115}
                            x2="477.7651020408163"
                            y2={115}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="491.1224489795918"
                            y1="71.66666666666666"
                            x2="491.1324489795918"
                            y2="71.66666666666666"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="504.48979591836735"
                            y1="61.666666666666664"
                            x2="504.49979591836734"
                            y2="61.666666666666664"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="517.8571428571429"
                            y1="41.66666666666667"
                            x2="517.8671428571429"
                            y2="41.66666666666667"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="531.2244897959183"
                            y1="43.33333333333333"
                            x2="531.2344897959183"
                            y2="43.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="544.5918367346939"
                            y1={115}
                            x2="544.6018367346938"
                            y2={115}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="557.9591836734694"
                            y1={50}
                            x2="557.9691836734694"
                            y2={50}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="571.3265306122449"
                            y1="38.33333333333333"
                            x2="571.3365306122449"
                            y2="38.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="584.6938775510204"
                            y1={40}
                            x2="584.7038775510204"
                            y2={40}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="598.0612244897959"
                            y1={115}
                            x2="598.0712244897959"
                            y2={115}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="611.4285714285714"
                            y1={115}
                            x2="611.4385714285714"
                            y2={115}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="624.795918367347"
                            y1={115}
                            x2="624.805918367347"
                            y2={115}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="638.1632653061224"
                            y1="41.66666666666667"
                            x2="638.1732653061224"
                            y2="41.66666666666667"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="651.530612244898"
                            y1={115}
                            x2="651.5406122448979"
                            y2={115}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="664.8979591836735"
                            y1="33.33333333333333"
                            x2="664.9079591836735"
                            y2="33.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="678.265306122449"
                            y1={35}
                            x2="678.275306122449"
                            y2={35}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="691.6326530612245"
                            y1={45}
                            x2="691.6426530612245"
                            y2={45}
                            className="ct-point"
                            //
                            //
                          />
                        </g>
                        <g className="ct-series ct-series-c">
                          <path
                            d="M50,115L50,30C54.456,30.556,58.912,30.679,63.367,31.667C67.823,32.654,72.279,45,76.735,45C81.19,45,85.646,31.667,90.102,31.667C94.558,31.667,99.014,35,103.469,35C107.925,35,112.381,31.667,116.837,31.667C121.293,31.667,125.748,31.667,130.204,31.667C134.66,31.667,139.116,48.333,143.571,48.333C148.027,48.333,152.483,48.333,156.939,48.333C161.395,48.333,165.85,31.667,170.306,31.667C174.762,31.667,179.218,32.323,183.673,33.333C188.129,34.343,192.585,50,197.041,50C201.497,50,205.952,41.162,210.408,38.333C214.864,35.505,219.32,31.667,223.776,31.667C228.231,31.667,232.687,37.804,237.143,45C241.599,52.196,246.054,101.667,250.51,101.667C254.966,101.667,259.422,93.241,263.878,90C268.333,86.759,272.789,81.667,277.245,81.667C281.701,81.667,286.156,83.333,290.612,83.333C295.068,83.333,299.524,75,303.98,75C308.435,75,312.891,75.694,317.347,76.667C321.803,77.639,326.259,88.333,330.714,88.333C335.17,88.333,339.626,75,344.082,75C348.537,75,352.993,78.333,357.449,78.333C361.905,78.333,366.361,76.667,370.816,76.667C375.272,76.667,379.728,81.667,384.184,81.667C388.639,81.667,393.095,81.667,397.551,81.667C402.007,81.667,406.463,83.333,410.918,83.333C415.374,83.333,419.83,80,424.286,80C428.741,80,433.197,85,437.653,85C442.109,85,446.565,83,451.02,81.667C455.476,80.333,459.932,76.667,464.388,76.667C468.844,76.667,473.299,81.667,477.755,81.667C482.211,81.667,486.667,65.588,491.122,61.667C495.578,57.745,500.034,56.752,504.49,53.333C508.946,49.915,513.401,40,517.857,40C522.313,40,526.769,40,531.224,40C535.68,40,540.136,55,544.592,55C549.048,55,553.503,48.81,557.959,45C562.415,41.19,566.871,31.667,571.327,31.667C575.782,31.667,580.238,34.444,584.694,36.667C589.15,38.889,593.605,44.444,598.061,46.667C602.517,48.889,606.973,48.922,611.429,51.667C615.884,54.412,620.34,75,624.796,75C629.252,75,633.707,38.333,638.163,38.333C642.619,38.333,647.075,48.333,651.531,48.333C655.986,48.333,660.442,31.667,664.898,31.667C669.354,31.667,673.81,31.667,678.265,31.667C682.721,31.667,687.177,32.778,691.633,33.333L691.633,115Z"
                            className="ct-area"
                          />
                          <path
                            d="M50,30C54.456,30.556,58.912,30.679,63.367,31.667C67.823,32.654,72.279,45,76.735,45C81.19,45,85.646,31.667,90.102,31.667C94.558,31.667,99.014,35,103.469,35C107.925,35,112.381,31.667,116.837,31.667C121.293,31.667,125.748,31.667,130.204,31.667C134.66,31.667,139.116,48.333,143.571,48.333C148.027,48.333,152.483,48.333,156.939,48.333C161.395,48.333,165.85,31.667,170.306,31.667C174.762,31.667,179.218,32.323,183.673,33.333C188.129,34.343,192.585,50,197.041,50C201.497,50,205.952,41.162,210.408,38.333C214.864,35.505,219.32,31.667,223.776,31.667C228.231,31.667,232.687,37.804,237.143,45C241.599,52.196,246.054,101.667,250.51,101.667C254.966,101.667,259.422,93.241,263.878,90C268.333,86.759,272.789,81.667,277.245,81.667C281.701,81.667,286.156,83.333,290.612,83.333C295.068,83.333,299.524,75,303.98,75C308.435,75,312.891,75.694,317.347,76.667C321.803,77.639,326.259,88.333,330.714,88.333C335.17,88.333,339.626,75,344.082,75C348.537,75,352.993,78.333,357.449,78.333C361.905,78.333,366.361,76.667,370.816,76.667C375.272,76.667,379.728,81.667,384.184,81.667C388.639,81.667,393.095,81.667,397.551,81.667C402.007,81.667,406.463,83.333,410.918,83.333C415.374,83.333,419.83,80,424.286,80C428.741,80,433.197,85,437.653,85C442.109,85,446.565,83,451.02,81.667C455.476,80.333,459.932,76.667,464.388,76.667C468.844,76.667,473.299,81.667,477.755,81.667C482.211,81.667,486.667,65.588,491.122,61.667C495.578,57.745,500.034,56.752,504.49,53.333C508.946,49.915,513.401,40,517.857,40C522.313,40,526.769,40,531.224,40C535.68,40,540.136,55,544.592,55C549.048,55,553.503,48.81,557.959,45C562.415,41.19,566.871,31.667,571.327,31.667C575.782,31.667,580.238,34.444,584.694,36.667C589.15,38.889,593.605,44.444,598.061,46.667C602.517,48.889,606.973,48.922,611.429,51.667C615.884,54.412,620.34,75,624.796,75C629.252,75,633.707,38.333,638.163,38.333C642.619,38.333,647.075,48.333,651.531,48.333C655.986,48.333,660.442,31.667,664.898,31.667C669.354,31.667,673.81,31.667,678.265,31.667C682.721,31.667,687.177,32.778,691.633,33.333"
                            className="ct-line"
                          />
                          <line
                            x1={50}
                            y1={30}
                            x2="50.01"
                            y2={30}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="63.36734693877551"
                            y1="31.66666666666667"
                            x2="63.37734693877551"
                            y2="31.66666666666667"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="76.73469387755102"
                            y1={45}
                            x2="76.74469387755103"
                            y2={45}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="90.10204081632654"
                            y1="31.66666666666667"
                            x2="90.11204081632654"
                            y2="31.66666666666667"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="103.46938775510205"
                            y1={35}
                            x2="103.47938775510205"
                            y2={35}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="116.83673469387755"
                            y1="31.66666666666667"
                            x2="116.84673469387755"
                            y2="31.66666666666667"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="130.20408163265307"
                            y1="31.66666666666667"
                            x2="130.21408163265306"
                            y2="31.66666666666667"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="143.57142857142856"
                            y1="48.33333333333333"
                            x2="143.58142857142855"
                            y2="48.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="156.9387755102041"
                            y1="48.33333333333333"
                            x2="156.9487755102041"
                            y2="48.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="170.30612244897958"
                            y1="31.66666666666667"
                            x2="170.31612244897957"
                            y2="31.66666666666667"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="183.6734693877551"
                            y1="33.33333333333333"
                            x2="183.68346938775508"
                            y2="33.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="197.0408163265306"
                            y1={50}
                            x2="197.0508163265306"
                            y2={50}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="210.40816326530611"
                            y1="38.33333333333333"
                            x2="210.4181632653061"
                            y2="38.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="223.77551020408163"
                            y1="31.66666666666667"
                            x2="223.78551020408162"
                            y2="31.66666666666667"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="237.14285714285714"
                            y1={45}
                            x2="237.15285714285713"
                            y2={45}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="250.51020408163265"
                            y1="101.66666666666667"
                            x2="250.52020408163264"
                            y2="101.66666666666667"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="263.8775510204082"
                            y1={90}
                            x2="263.8875510204082"
                            y2={90}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="277.2448979591837"
                            y1="81.66666666666666"
                            x2="277.25489795918367"
                            y2="81.66666666666666"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="290.61224489795916"
                            y1="83.33333333333333"
                            x2="290.62224489795915"
                            y2="83.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="303.9795918367347"
                            y1={75}
                            x2="303.9895918367347"
                            y2={75}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="317.3469387755102"
                            y1="76.66666666666666"
                            x2="317.3569387755102"
                            y2="76.66666666666666"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="330.7142857142857"
                            y1="88.33333333333333"
                            x2="330.7242857142857"
                            y2="88.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="344.0816326530612"
                            y1={75}
                            x2="344.0916326530612"
                            y2={75}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="357.44897959183675"
                            y1="78.33333333333334"
                            x2="357.45897959183674"
                            y2="78.33333333333334"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="370.81632653061223"
                            y1="76.66666666666666"
                            x2="370.8263265306122"
                            y2="76.66666666666666"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="384.18367346938777"
                            y1="81.66666666666666"
                            x2="384.19367346938776"
                            y2="81.66666666666666"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="397.55102040816325"
                            y1="81.66666666666666"
                            x2="397.56102040816324"
                            y2="81.66666666666666"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="410.9183673469388"
                            y1="83.33333333333333"
                            x2="410.9283673469388"
                            y2="83.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="424.2857142857143"
                            y1={80}
                            x2="424.29571428571427"
                            y2={80}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="437.6530612244898"
                            y1={85}
                            x2="437.6630612244898"
                            y2={85}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="451.0204081632653"
                            y1="81.66666666666666"
                            x2="451.0304081632653"
                            y2="81.66666666666666"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="464.38775510204084"
                            y1="76.66666666666666"
                            x2="464.39775510204083"
                            y2="76.66666666666666"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="477.7551020408163"
                            y1="81.66666666666666"
                            x2="477.7651020408163"
                            y2="81.66666666666666"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="491.1224489795918"
                            y1="61.666666666666664"
                            x2="491.1324489795918"
                            y2="61.666666666666664"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="504.48979591836735"
                            y1="53.333333333333336"
                            x2="504.49979591836734"
                            y2="53.333333333333336"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="517.8571428571429"
                            y1={40}
                            x2="517.8671428571429"
                            y2={40}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="531.2244897959183"
                            y1={40}
                            x2="531.2344897959183"
                            y2={40}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="544.5918367346939"
                            y1={55}
                            x2="544.6018367346938"
                            y2={55}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="557.9591836734694"
                            y1={45}
                            x2="557.9691836734694"
                            y2={45}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="571.3265306122449"
                            y1="31.66666666666667"
                            x2="571.3365306122449"
                            y2="31.66666666666667"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="584.6938775510204"
                            y1="36.66666666666667"
                            x2="584.7038775510204"
                            y2="36.66666666666667"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="598.0612244897959"
                            y1="46.66666666666667"
                            x2="598.0712244897959"
                            y2="46.66666666666667"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="611.4285714285714"
                            y1="51.666666666666664"
                            x2="611.4385714285714"
                            y2="51.666666666666664"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="624.795918367347"
                            y1={75}
                            x2="624.805918367347"
                            y2={75}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="638.1632653061224"
                            y1="38.33333333333333"
                            x2="638.1732653061224"
                            y2="38.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="651.530612244898"
                            y1="48.33333333333333"
                            x2="651.5406122448979"
                            y2="48.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="664.8979591836735"
                            y1="31.66666666666667"
                            x2="664.9079591836735"
                            y2="31.66666666666667"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="678.265306122449"
                            y1="31.66666666666667"
                            x2="678.275306122449"
                            y2="31.66666666666667"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="691.6326530612245"
                            y1="33.33333333333333"
                            x2="691.6426530612245"
                            y2="33.33333333333333"
                            className="ct-point"
                            //
                            //
                          />
                        </g>
                      </g>
                      <g className="ct-labels">
                        <foreignObject
                          style={{ overflow: "visible" }}
                          x={50}
                          y={120}
                          width="13.36734693877551"
                          height={20}
                        >
                          <span
                            className="ct-label ct-horizontal ct-end"
                            xmlns="http://www.w3.org/2000/xmlns/"
                            style={{ width: 13, height: 20 }}
                          >
                            9/15/2022
                          </span>
                        </foreignObject>
                        <foreignObject
                          style={{ overflow: "visible" }}
                          x="156.9387755102041"
                          y={120}
                          width="13.367346938775512"
                          height={20}
                        >
                          <span
                            className="ct-label ct-horizontal ct-end"
                            xmlns="http://www.w3.org/2000/xmlns/"
                            style={{ width: 13, height: 20 }}
                          >
                            21 hours ago
                          </span>
                        </foreignObject>
                        <foreignObject
                          style={{ overflow: "visible" }}
                          x="263.8775510204082"
                          y={120}
                          width="13.367346938775512"
                          height={20}
                        >
                          <span
                            className="ct-label ct-horizontal ct-end"
                            xmlns="http://www.w3.org/2000/xmlns/"
                            style={{ width: 13, height: 20 }}
                          >
                            17 hours ago
                          </span>
                        </foreignObject>
                        <foreignObject
                          style={{ overflow: "visible" }}
                          x="370.81632653061223"
                          y={120}
                          width="13.36734693877554"
                          height={20}
                        >
                          <span
                            className="ct-label ct-horizontal ct-end"
                            xmlns="http://www.w3.org/2000/xmlns/"
                            style={{ width: 13, height: 20 }}
                          >
                            13 hours ago
                          </span>
                        </foreignObject>
                        <foreignObject
                          style={{ overflow: "visible" }}
                          x="477.7551020408163"
                          y={120}
                          width="13.367346938775484"
                          height={20}
                        >
                          <span
                            className="ct-label ct-horizontal ct-end"
                            xmlns="http://www.w3.org/2000/xmlns/"
                            style={{ width: 13, height: 20 }}
                          >
                            9 hours ago
                          </span>
                        </foreignObject>
                        <foreignObject
                          style={{ overflow: "visible" }}
                          x="584.6938775510204"
                          y={120}
                          width="13.36734693877554"
                          height={20}
                        >
                          <span
                            className="ct-label ct-horizontal ct-end"
                            xmlns="http://www.w3.org/2000/xmlns/"
                            style={{ width: 13, height: 20 }}
                          >
                            5 hours ago
                          </span>
                        </foreignObject>
                        <foreignObject
                          style={{ overflow: "visible" }}
                          x="691.6326530612245"
                          y={120}
                          width={30}
                          height={20}
                        >
                          <span
                            className="ct-label ct-horizontal ct-end"
                            xmlns="http://www.w3.org/2000/xmlns/"
                            style={{ width: 30, height: 20 }}
                          >
                            an hour ago
                          </span>
                        </foreignObject>
                        <foreignObject
                          style={{ overflow: "visible" }}
                          y="81.66666666666666"
                          x={10}
                          height="33.333333333333336"
                          width={30}
                        >
                          <span
                            className="ct-label ct-vertical ct-start"
                            xmlns="http://www.w3.org/2000/xmlns/"
                            style={{ height: 33, width: 30 }}
                          >
                            0
                          </span>
                        </foreignObject>
                        <foreignObject
                          style={{ overflow: "visible" }}
                          y="48.33333333333332"
                          x={10}
                          height="33.333333333333336"
                          width={30}
                        >
                          <span
                            className="ct-label ct-vertical ct-start"
                            xmlns="http://www.w3.org/2000/xmlns/"
                            style={{ height: 33, width: 30 }}
                          >
                            20
                          </span>
                        </foreignObject>
                        <foreignObject
                          style={{ overflow: "visible" }}
                          y={15}
                          x={10}
                          height="33.33333333333333"
                          width={30}
                        >
                          <span
                            className="ct-label ct-vertical ct-start"
                            xmlns="http://www.w3.org/2000/xmlns/"
                            style={{ height: 33, width: 30 }}
                          >
                            40
                          </span>
                        </foreignObject>
                        <foreignObject
                          style={{ overflow: "visible" }}
                          y={-15}
                          x={10}
                          height={30}
                          width={30}
                        >
                          <span
                            className="ct-label ct-vertical ct-start"
                            xmlns="http://www.w3.org/2000/xmlns/"
                            style={{ height: 30, width: 30 }}
                          >
                            60
                          </span>
                        </foreignObject>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h4>
                  Unique &amp; First time players{" "}
                  <div className="timeseries-range css-6rhxv9">
                    <a
                      rel="nofollow"
                      className=" css-p0j53r"
                      href="/servers/csgo/16463398?uniqueFirst=7D"
                    >
                      7D
                    </a>
                    <a
                      rel="nofollow"
                      className="active css-p0j53r"
                      href="/servers/csgo/16463398?uniqueFirst=1M"
                    >
                      1M
                    </a>
                    <a
                      rel="nofollow"
                      className=" css-p0j53r"
                      href="/servers/csgo/16463398?uniqueFirst=3M"
                    >
                      3M
                    </a>
                  </div>
                </h4>
                <div className="css-cssveg">
                  <div className="ct-chart">
                    <svg
                      width="100%"
                      height="100%"
                      className="ct-chart-line"
                      style={{ width: "100%", height: "100%" }}
                    >
                      <g className="ct-grids">
                        <line
                          x1={50}
                          x2={50}
                          y1={15}
                          y2={115}
                          className="ct-grid ct-horizontal"
                        />
                        <line
                          x1="143.57142857142856"
                          x2="143.57142857142856"
                          y1={15}
                          y2={115}
                          className="ct-grid ct-horizontal"
                        />
                        <line
                          x1="237.14285714285714"
                          x2="237.14285714285714"
                          y1={15}
                          y2={115}
                          className="ct-grid ct-horizontal"
                        />
                        <line
                          x1="330.7142857142857"
                          x2="330.7142857142857"
                          y1={15}
                          y2={115}
                          className="ct-grid ct-horizontal"
                        />
                        <line
                          x1="424.2857142857143"
                          x2="424.2857142857143"
                          y1={15}
                          y2={115}
                          className="ct-grid ct-horizontal"
                        />
                        <line
                          x1="517.8571428571429"
                          x2="517.8571428571429"
                          y1={15}
                          y2={115}
                          className="ct-grid ct-horizontal"
                        />
                        <line
                          x1="611.4285714285714"
                          x2="611.4285714285714"
                          y1={15}
                          y2={115}
                          className="ct-grid ct-horizontal"
                        />
                        <line
                          y1={115}
                          y2={115}
                          x1={50}
                          x2={705}
                          className="ct-grid ct-vertical"
                        />
                        <line
                          y1="86.42857142857143"
                          y2="86.42857142857143"
                          x1={50}
                          x2={705}
                          className="ct-grid ct-vertical"
                        />
                        <line
                          y1="57.857142857142854"
                          y2="57.857142857142854"
                          x1={50}
                          x2={705}
                          className="ct-grid ct-vertical"
                        />
                        <line
                          y1="29.285714285714292"
                          y2="29.285714285714292"
                          x1={50}
                          x2={705}
                          className="ct-grid ct-vertical"
                        />
                      </g>
                      <g>
                        <g className="ct-series ct-series-a">
                          <path
                            d="M50,115L50,62.714C57.798,75.762,65.595,101.857,73.393,101.857C81.19,101.857,88.988,27.714,96.786,27.714C104.583,27.714,112.381,43.286,120.179,43.286C127.976,43.286,135.774,28.143,143.571,28.143C151.369,28.143,159.167,31.175,166.964,32.857C174.762,34.539,182.56,38.286,190.357,38.286C198.155,38.286,205.952,38.286,213.75,38.286C221.548,38.286,229.345,45.621,237.143,45.714C244.94,45.808,252.738,45.763,260.536,45.857C268.333,45.951,276.131,55.714,283.929,55.714C291.726,55.714,299.524,48,307.321,48C315.119,48,322.917,57.143,330.714,57.143C338.512,57.143,346.31,51,354.107,51C361.905,51,369.702,57.414,377.5,64C385.298,70.586,393.095,105.143,400.893,105.143C408.69,105.143,416.488,51.286,424.286,51.286C432.083,51.286,439.881,64.997,447.679,67C455.476,69.003,463.274,70.714,471.071,70.714C478.869,70.714,486.667,53.434,494.464,50C502.262,46.566,510.06,43.143,517.857,43.143C525.655,43.143,533.452,50.571,541.25,50.571C549.048,50.571,556.845,30.949,564.643,30.143C572.44,29.336,580.238,28.857,588.036,28.857C595.833,28.857,603.631,50.022,611.429,50.571C619.226,51.121,627.024,51.429,634.821,51.429C642.619,51.429,650.417,41.286,658.214,41.286C666.012,41.286,673.81,46.524,681.607,49.143L681.607,115Z"
                            className="ct-area"
                          />
                          <path
                            d="M50,62.714C57.798,75.762,65.595,101.857,73.393,101.857C81.19,101.857,88.988,27.714,96.786,27.714C104.583,27.714,112.381,43.286,120.179,43.286C127.976,43.286,135.774,28.143,143.571,28.143C151.369,28.143,159.167,31.175,166.964,32.857C174.762,34.539,182.56,38.286,190.357,38.286C198.155,38.286,205.952,38.286,213.75,38.286C221.548,38.286,229.345,45.621,237.143,45.714C244.94,45.808,252.738,45.763,260.536,45.857C268.333,45.951,276.131,55.714,283.929,55.714C291.726,55.714,299.524,48,307.321,48C315.119,48,322.917,57.143,330.714,57.143C338.512,57.143,346.31,51,354.107,51C361.905,51,369.702,57.414,377.5,64C385.298,70.586,393.095,105.143,400.893,105.143C408.69,105.143,416.488,51.286,424.286,51.286C432.083,51.286,439.881,64.997,447.679,67C455.476,69.003,463.274,70.714,471.071,70.714C478.869,70.714,486.667,53.434,494.464,50C502.262,46.566,510.06,43.143,517.857,43.143C525.655,43.143,533.452,50.571,541.25,50.571C549.048,50.571,556.845,30.949,564.643,30.143C572.44,29.336,580.238,28.857,588.036,28.857C595.833,28.857,603.631,50.022,611.429,50.571C619.226,51.121,627.024,51.429,634.821,51.429C642.619,51.429,650.417,41.286,658.214,41.286C666.012,41.286,673.81,46.524,681.607,49.143"
                            className="ct-line"
                          />
                          <line
                            x1={50}
                            y1="62.714285714285715"
                            x2="50.01"
                            y2="62.714285714285715"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="73.39285714285714"
                            y1="101.85714285714286"
                            x2="73.40285714285714"
                            y2="101.85714285714286"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="96.78571428571428"
                            y1="27.714285714285708"
                            x2="96.79571428571428"
                            y2="27.714285714285708"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="120.17857142857143"
                            y1="43.28571428571429"
                            x2="120.18857142857144"
                            y2="43.28571428571429"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="143.57142857142856"
                            y1="28.14285714285714"
                            x2="143.58142857142855"
                            y2="28.14285714285714"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="166.96428571428572"
                            y1="32.85714285714286"
                            x2="166.9742857142857"
                            y2="32.85714285714286"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="190.35714285714286"
                            y1="38.28571428571429"
                            x2="190.36714285714285"
                            y2="38.28571428571429"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="213.75"
                            y1="38.28571428571429"
                            x2="213.76"
                            y2="38.28571428571429"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="237.14285714285714"
                            y1="45.71428571428571"
                            x2="237.15285714285713"
                            y2="45.71428571428571"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="260.5357142857143"
                            y1="45.85714285714286"
                            x2="260.54571428571427"
                            y2="45.85714285714286"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="283.92857142857144"
                            y1="55.714285714285715"
                            x2="283.93857142857144"
                            y2="55.714285714285715"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="307.32142857142856"
                            y1={48}
                            x2="307.33142857142855"
                            y2={48}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="330.7142857142857"
                            y1="57.142857142857146"
                            x2="330.7242857142857"
                            y2="57.142857142857146"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="354.10714285714283"
                            y1={51}
                            x2="354.1171428571428"
                            y2={51}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="377.5"
                            y1={64}
                            x2="377.51"
                            y2={64}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="400.8928571428571"
                            y1="105.14285714285714"
                            x2="400.9028571428571"
                            y2="105.14285714285714"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="424.2857142857143"
                            y1="51.285714285714285"
                            x2="424.29571428571427"
                            y2="51.285714285714285"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="447.67857142857144"
                            y1={67}
                            x2="447.68857142857144"
                            y2={67}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="471.07142857142856"
                            y1="70.71428571428572"
                            x2="471.08142857142855"
                            y2="70.71428571428572"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="494.4642857142857"
                            y1={50}
                            x2="494.4742857142857"
                            y2={50}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="517.8571428571429"
                            y1="43.14285714285714"
                            x2="517.8671428571429"
                            y2="43.14285714285714"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="541.25"
                            y1="50.57142857142857"
                            x2="541.26"
                            y2="50.57142857142857"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="564.6428571428571"
                            y1="30.14285714285714"
                            x2="564.6528571428571"
                            y2="30.14285714285714"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="588.0357142857142"
                            y1="28.85714285714286"
                            x2="588.0457142857142"
                            y2="28.85714285714286"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="611.4285714285714"
                            y1="50.57142857142857"
                            x2="611.4385714285714"
                            y2="50.57142857142857"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="634.8214285714286"
                            y1="51.42857142857143"
                            x2="634.8314285714285"
                            y2="51.42857142857143"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="658.2142857142857"
                            y1="41.28571428571429"
                            x2="658.2242857142857"
                            y2="41.28571428571429"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="681.6071428571429"
                            y1="49.14285714285714"
                            x2="681.6171428571429"
                            y2="49.14285714285714"
                            className="ct-point"
                            //
                            //
                          />
                        </g>
                        <g className="ct-series ct-series-b">
                          <path
                            d="M50,115L50,68C57.798,80.952,65.595,106.857,73.393,106.857C81.19,106.857,88.988,43,96.786,43C104.583,43,112.381,62.143,120.179,62.143C127.976,62.143,135.774,48,143.571,48C151.369,48,159.167,51.366,166.964,53.571C174.762,55.777,182.56,61.276,190.357,61.714C198.155,62.152,205.952,61.988,213.75,62.429C221.548,62.869,229.345,69.819,237.143,71.143C244.94,72.467,252.738,72.435,260.536,73.714C268.333,74.994,276.131,81.286,283.929,81.286C291.726,81.286,299.524,73.429,307.321,73.429C315.119,73.429,322.917,76.857,330.714,76.857C338.512,76.857,346.31,73.286,354.107,73.286C361.905,73.286,369.702,80.585,377.5,86.143C385.298,91.701,393.095,109.857,400.893,109.857C408.69,109.857,416.488,74.429,424.286,74.429C432.083,74.429,439.881,83.815,447.679,86C455.476,88.185,463.274,90.571,471.071,90.571C478.869,90.571,486.667,78.886,494.464,75.857C502.262,72.829,510.06,69.286,517.857,69.286C525.655,69.286,533.452,75.857,541.25,75.857C549.048,75.857,556.845,57,564.643,57C572.44,57,580.238,61.513,588.036,65.143C595.833,68.772,603.631,81.571,611.429,81.571C619.226,81.571,627.024,81.417,634.821,81.143C642.619,80.869,650.417,71.286,658.214,71.286C666.012,71.286,673.81,77.571,681.607,80.714L681.607,115Z"
                            className="ct-area"
                          />
                          <path
                            d="M50,68C57.798,80.952,65.595,106.857,73.393,106.857C81.19,106.857,88.988,43,96.786,43C104.583,43,112.381,62.143,120.179,62.143C127.976,62.143,135.774,48,143.571,48C151.369,48,159.167,51.366,166.964,53.571C174.762,55.777,182.56,61.276,190.357,61.714C198.155,62.152,205.952,61.988,213.75,62.429C221.548,62.869,229.345,69.819,237.143,71.143C244.94,72.467,252.738,72.435,260.536,73.714C268.333,74.994,276.131,81.286,283.929,81.286C291.726,81.286,299.524,73.429,307.321,73.429C315.119,73.429,322.917,76.857,330.714,76.857C338.512,76.857,346.31,73.286,354.107,73.286C361.905,73.286,369.702,80.585,377.5,86.143C385.298,91.701,393.095,109.857,400.893,109.857C408.69,109.857,416.488,74.429,424.286,74.429C432.083,74.429,439.881,83.815,447.679,86C455.476,88.185,463.274,90.571,471.071,90.571C478.869,90.571,486.667,78.886,494.464,75.857C502.262,72.829,510.06,69.286,517.857,69.286C525.655,69.286,533.452,75.857,541.25,75.857C549.048,75.857,556.845,57,564.643,57C572.44,57,580.238,61.513,588.036,65.143C595.833,68.772,603.631,81.571,611.429,81.571C619.226,81.571,627.024,81.417,634.821,81.143C642.619,80.869,650.417,71.286,658.214,71.286C666.012,71.286,673.81,77.571,681.607,80.714"
                            className="ct-line"
                          />
                          <line
                            x1={50}
                            y1={68}
                            x2="50.01"
                            y2={68}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="73.39285714285714"
                            y1="106.85714285714286"
                            x2="73.40285714285714"
                            y2="106.85714285714286"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="96.78571428571428"
                            y1={43}
                            x2="96.79571428571428"
                            y2={43}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="120.17857142857143"
                            y1="62.142857142857146"
                            x2="120.18857142857144"
                            y2="62.142857142857146"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="143.57142857142856"
                            y1={48}
                            x2="143.58142857142855"
                            y2={48}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="166.96428571428572"
                            y1="53.57142857142857"
                            x2="166.9742857142857"
                            y2="53.57142857142857"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="190.35714285714286"
                            y1="61.714285714285715"
                            x2="190.36714285714285"
                            y2="61.714285714285715"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="213.75"
                            y1="62.42857142857143"
                            x2="213.76"
                            y2="62.42857142857143"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="237.14285714285714"
                            y1="71.14285714285714"
                            x2="237.15285714285713"
                            y2="71.14285714285714"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="260.5357142857143"
                            y1="73.71428571428572"
                            x2="260.54571428571427"
                            y2="73.71428571428572"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="283.92857142857144"
                            y1="81.28571428571428"
                            x2="283.93857142857144"
                            y2="81.28571428571428"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="307.32142857142856"
                            y1="73.42857142857143"
                            x2="307.33142857142855"
                            y2="73.42857142857143"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="330.7142857142857"
                            y1="76.85714285714286"
                            x2="330.7242857142857"
                            y2="76.85714285714286"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="354.10714285714283"
                            y1="73.28571428571428"
                            x2="354.1171428571428"
                            y2="73.28571428571428"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="377.5"
                            y1="86.14285714285714"
                            x2="377.51"
                            y2="86.14285714285714"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="400.8928571428571"
                            y1="109.85714285714286"
                            x2="400.9028571428571"
                            y2="109.85714285714286"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="424.2857142857143"
                            y1="74.42857142857143"
                            x2="424.29571428571427"
                            y2="74.42857142857143"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="447.67857142857144"
                            y1={86}
                            x2="447.68857142857144"
                            y2={86}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="471.07142857142856"
                            y1="90.57142857142857"
                            x2="471.08142857142855"
                            y2="90.57142857142857"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="494.4642857142857"
                            y1="75.85714285714286"
                            x2="494.4742857142857"
                            y2="75.85714285714286"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="517.8571428571429"
                            y1="69.28571428571428"
                            x2="517.8671428571429"
                            y2="69.28571428571428"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="541.25"
                            y1="75.85714285714286"
                            x2="541.26"
                            y2="75.85714285714286"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="564.6428571428571"
                            y1={57}
                            x2="564.6528571428571"
                            y2={57}
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="588.0357142857142"
                            y1="65.14285714285714"
                            x2="588.0457142857142"
                            y2="65.14285714285714"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="611.4285714285714"
                            y1="81.57142857142857"
                            x2="611.4385714285714"
                            y2="81.57142857142857"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="634.8214285714286"
                            y1="81.14285714285714"
                            x2="634.8314285714285"
                            y2="81.14285714285714"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="658.2142857142857"
                            y1="71.28571428571428"
                            x2="658.2242857142857"
                            y2="71.28571428571428"
                            className="ct-point"
                            //
                            //
                          />
                          <line
                            x1="681.6071428571429"
                            y1="80.71428571428572"
                            x2="681.6171428571429"
                            y2="80.71428571428572"
                            className="ct-point"
                            //
                            //
                          />
                        </g>
                      </g>
                      <g className="ct-labels">
                        <foreignObject
                          style={{ overflow: "visible" }}
                          x={50}
                          y={120}
                          width="23.392857142857142"
                          height={20}
                        >
                          <span
                            className="ct-label ct-horizontal ct-end"
                            xmlns="http://www.w3.org/2000/xmlns/"
                            style={{ width: 23, height: 20 }}
                          >
                            8/16/2022
                          </span>
                        </foreignObject>
                        <foreignObject
                          style={{ overflow: "visible" }}
                          x="143.57142857142856"
                          y={120}
                          width="23.39285714285714"
                          height={20}
                        >
                          <span
                            className="ct-label ct-horizontal ct-end"
                            xmlns="http://www.w3.org/2000/xmlns/"
                            style={{ width: 23, height: 20 }}
                          >
                            8/20/2022
                          </span>
                        </foreignObject>
                        <foreignObject
                          style={{ overflow: "visible" }}
                          x="237.14285714285714"
                          y={120}
                          width="23.39285714285714"
                          height={20}
                        >
                          <span
                            className="ct-label ct-horizontal ct-end"
                            xmlns="http://www.w3.org/2000/xmlns/"
                            style={{ width: 23, height: 20 }}
                          >
                            8/24/2022
                          </span>
                        </foreignObject>
                        <foreignObject
                          style={{ overflow: "visible" }}
                          x="330.7142857142857"
                          y={120}
                          width="23.39285714285711"
                          height={20}
                        >
                          <span
                            className="ct-label ct-horizontal ct-end"
                            xmlns="http://www.w3.org/2000/xmlns/"
                            style={{ width: 23, height: 20 }}
                          >
                            8/28/2022
                          </span>
                        </foreignObject>
                        <foreignObject
                          style={{ overflow: "visible" }}
                          x="424.2857142857143"
                          y={120}
                          width="23.392857142857167"
                          height={20}
                        >
                          <span
                            className="ct-label ct-horizontal ct-end"
                            xmlns="http://www.w3.org/2000/xmlns/"
                            style={{ width: 23, height: 20 }}
                          >
                            9/3/2022
                          </span>
                        </foreignObject>
                        <foreignObject
                          style={{ overflow: "visible" }}
                          x="517.8571428571429"
                          y={120}
                          width="23.392857142857167"
                          height={20}
                        >
                          <span
                            className="ct-label ct-horizontal ct-end"
                            xmlns="http://www.w3.org/2000/xmlns/"
                            style={{ width: 23, height: 20 }}
                          >
                            9/7/2022
                          </span>
                        </foreignObject>
                        <foreignObject
                          style={{ overflow: "visible" }}
                          x="611.4285714285714"
                          y={120}
                          width="23.39285714285711"
                          height={20}
                        >
                          <span
                            className="ct-label ct-horizontal ct-end"
                            xmlns="http://www.w3.org/2000/xmlns/"
                            style={{ width: 23, height: 20 }}
                          >
                            9/11/2022
                          </span>
                        </foreignObject>
                        <foreignObject
                          style={{ overflow: "visible" }}
                          y="86.42857142857143"
                          x={10}
                          height="28.571428571428573"
                          width={30}
                        >
                          <span
                            className="ct-label ct-vertical ct-start"
                            xmlns="http://www.w3.org/2000/xmlns/"
                            style={{ height: 29, width: 30 }}
                          >
                            0
                          </span>
                        </foreignObject>
                        <foreignObject
                          style={{ overflow: "visible" }}
                          y="57.85714285714286"
                          x={10}
                          height="28.571428571428573"
                          width={30}
                        >
                          <span
                            className="ct-label ct-vertical ct-start"
                            xmlns="http://www.w3.org/2000/xmlns/"
                            style={{ height: 29, width: 30 }}
                          >
                            200
                          </span>
                        </foreignObject>
                        <foreignObject
                          style={{ overflow: "visible" }}
                          y="29.285714285714292"
                          x={10}
                          height="28.571428571428562"
                          width={30}
                        >
                          <span
                            className="ct-label ct-vertical ct-start"
                            xmlns="http://www.w3.org/2000/xmlns/"
                            style={{ height: 29, width: 30 }}
                          >
                            400
                          </span>
                        </foreignObject>
                        <foreignObject
                          style={{ overflow: "visible" }}
                          y="-0.7142857142857082"
                          x={10}
                          height={30}
                          width={30}
                        >
                          <span
                            className="ct-label ct-vertical ct-start"
                            xmlns="http://www.w3.org/2000/xmlns/"
                            style={{ height: 30, width: 30 }}
                          >
                            600
                          </span>
                        </foreignObject>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ display: rules ? "" : "none" }}>
              <div className="col-md-8">
                <h4>Active players</h4>
                <table className="css-1y3vvw9">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Play time</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>{activePlayers}</tbody>
                </table>
              </div>
              <div className="col-md-4">
                <h4>
                  Most Time Played
                  <div className="css-6rhxv9">
                    <a
                      className="active css-p0j53r"
                      rel="nofollow"
                      href="/servers/csgo/16463398?l%3Atime=1M"
                    >
                      1M
                    </a>
                    <a
                      className=" css-p0j53r"
                      rel="nofollow"
                      href="/servers/csgo/16463398?l%3Atime=AT"
                    >
                      AT
                    </a>
                    <a
                      className="css-p0j53r"
                      href="/servers/csgo/16463398/leaderboard"
                    >
                      <i className="glyphicon glyphicon-cog css-1p91l43" />
                    </a>
                  </div>
                </h4>
                <div className="leaderboard">
                  <table className="css-5k1z86">
                    <thead>
                      <tr>
                        <th className="rank">#</th>
                        <th className="player">Player</th>
                        <th className="value">Time</th>
                      </tr>
                    </thead>
                    <tbody>{mostTimePlayers}</tbody>
                  </table>
                </div>
                <p className="text-center">
                  <a
                    className="css-1m4imoj"
                    href="/servers/csgo/16463398/leaderboard"
                  >
                    View More
                  </a>
                </p>
                <div className="css-mtmqhh" style={{}}>
                  <div
                    className="ad-tag"
                    id="server-page-sidebar"
                    data-request-id="1dfcea65-a795-433b-bd11-60f01dfaabbe"
                    data-report='{"enabled":true,"position":"bottom-center","wording":"Report Ad"}'
                    style={{
                      minHeight: 250,
                      textAlign: "center",
                      fontSize: 0,
                      position: "relative",
                    }}
                    data-bidder="appnexusAst"
                    data-creative-id={78827832}
                  >
                    <iframe
                      width={336}
                      height={280}
                      scrolling="no"
                      marginWidth={0}
                      marginHeight={0}
                      frameBorder={0}
                      title="advertisement"
                      sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-forms"
                      style={{
                        width: 336,
                        border: "none",
                        margin: "0px auto",
                        display: "block",
                      }}
                    />
                    <img
                      src="https://tracker.nitropay.com/pixel.png?s=1163&wb=eyJhZFVuaXRDb2RlIjoic2VydmVyLXBhZ2Utc2lkZWJhciIsImNyZWF0aXZlSWQiOiI3ODgyNzgzMiIsImJpZGRlciI6ImFwcG5leHVzQXN0IiwidGltZVRvUmVzcG9uZCI6OTgzLCJoZWlnaHQiOjI4MCwid2lkdGgiOjMzNiwiY3BtIjowLjAxNzM2NDYxOTk5OTk5OTk5NywiaHJlZiI6Imh0dHBzOi8vd3d3LmJhdHRsZW1ldHJpY3MuY29tL3NlcnZlcnMvY3Nnby8xNjQ2MzM5OCIsImFjY2VwdGFibGUiOmZhbHNlLCJtZXRhIjoie1wiZGNoYWluXCI6e1widmVyXCI6XCIxLjBcIixcImNvbXBsZXRlXCI6MCxcIm5vZGVzXCI6W3tcImJzaWRcIjpcIjM5NDFcIn1dfSxcImJyYW5kSWRcIjo0NTQ3MTZ9IiwicmVxdWVzdElkIjoiMWRmY2VhNjUtYTc5NS00MzNiLWJkMTEtNjBmMDFkZmFhYmJlIiwiYyI6IkpPIiwiciI6IkFNIiwidHlwZSI6MCwiZHVyYXRpb24iOjAsInRpbWVzdGFtcCI6MTY2MzMzNjg4MTg1MH0%3D&t=0&r=1"
                      style={{ display: "none" }}
                      alt=""
                    />
                    <div
                      className="report-link"
                      style={{
                        width: 336,
                        height: 20,
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 99998,
                        textAlign: "center",
                        top: 280,
                        position: "absolute",
                      }}
                    >
                      <a
                        href="javascript:;"
                        style={{
                          fontFamily: "Helvetica, Arial, sans-serif",
                          fontSize: 9,
                          textTransform: "uppercase",
                          textDecoration: "none",
                          color: "rgb(119, 119, 119)",
                          display: "inline-block",
                          height: 10,
                          marginTop: 10,
                        }}
                      >
                        Report Ad
                      </a>
                    </div>
                  </div>
                </div>
                <h4>
                  Player Log <small>Past 30 Minutes</small>{" "}
                  <a
                    className="pull-right css-1ezx13m"
                    href="/servers/csgo/16463398/sessions"
                  >
                    Full history
                  </a>
                </h4>
                <div className="session-history">
                  <ol className="list-unstyled">{playerLog}</ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServerDetail;

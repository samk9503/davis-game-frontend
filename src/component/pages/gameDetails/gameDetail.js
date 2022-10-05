import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../widgets/loading";
import ServerCard from "./widgets/serverCard";
import SearchForm from "../search/searchForm";
import TipsTricks from "./widgets/tips_tricks";
import moment from "moment";

const GameDetail = (props) => {
  var id = useParams().id;
  const [loading, setLoading] = useState(true);
  const [servers, setServers] = useState(null);
  const [game, setGame] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [groupServer, setGroupServer] = useState(false);
  const changeCheckBox = () => {
    setGroupServer(!groupServer);
    axios
      .get(
        "https://api.battlemetrics.com/servers?sort=rank&fields[server]=rank,name,players,maxPlayers,address,ip,port,country,location,details,status&relations[server]=game,serverGroup&filter[game]=" +
          id +
          (groupServer ? "&include=serverGroup&filter[groupLeader]=true" : "")
      )
      .then((res) => {
        setServers(
          res.data.data.map((element) => (
            <ServerCard
              gameId={id}
              image={props.global.STORAGE + "/storage/images/" + id + ".png"}
              props={element}
              location={currentLocation}
            />
          ))
        );
      });
  };
  useEffect(() => {
    if (game != null) {
      const getLocation = () => {
        axios
          .get(
            "https://api.battlemetrics.com/account?include=organizations,organizationUser,roles,organizations.banLists,favorites,subscription,player,loginMethod,organizationFriend"
          )
          .then((res) => {
            setCurrentLocation(res.data.data.attributes);
          });
      };
      getLocation();
    }
  }, [game]);
  useEffect(() => {
    if (currentLocation != null) {
      const getGamesApi = () => {
        axios
          .get(
            "https://api.battlemetrics.com/servers?sort=rank&fields[server]=rank,name,players,maxPlayers,address,ip,port,country,location,details,status&relations[server]=game,serverGroup&filter[game]=" +
              id +
              (groupServer
                ? ""
                : "&include=serverGroup&filter[groupLeader]=true")
          )
          .then((res) => {
            var resdata = res.data.data;
            setServers(
              resdata.map((element) => (
                <ServerCard
                  gameId={id}
                  image={
                    props.global.STORAGE + "/storage/images/" + id + ".png"
                  }
                  props={element}
                  location={currentLocation}
                />
              ))
            );
          });
      };
      getGamesApi();
      const getServers = () => {
        axios
          .get(
            "https://api.battlemetrics.com/servers?fields[server]=rank,name,players,maxPlayers,address,ip,port,country,location,details,status&sort=rank&relations[server]=game,serverGroup" +
              "&filter[game]=" +
              id
          )
          .then((res) => {
            setServers(
              res.data.data.map((element) => (
                <ServerCard
                  gameId={element.relationships.game.data.id}
                  image={
                    props.global.STORAGE +
                    "/storage/images/" +
                    element.relationships.game.data.id +
                    ".png"
                  }
                  props={element}
                  location={currentLocation}
                />
              ))
            );
          });
      };
      getServers();
      setLoading(false);
    }
  }, [currentLocation]);
  useEffect(() => {
    const getGame = () => {
      axios.get("https://api.battlemetrics.com/games/" + id).then((res) => {
        setGame(res.data.data);
      });
    };
    getGame();
  }, []);
  const result = (res, filters) => {
    setServers(
      res.map((element) => (
        <ServerCard
          gameId={element.relationships.game.data.id}
          image={
            props.global.STORAGE +
            "/storage/images/" +
            element.relationships.game.data.id +
            ".png"
          }
          props={element}
          location={currentLocation}
        />
      ))
    );
  };
  return loading === true ? (
    <Loading />
  ) : (
    <>
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
              className="css-c7thuy"
            >
              <a itemProp="item" href="/servers/csgo">
                <span itemProp="name">{game.attributes.name}</span>
              </a>
              <meta itemProp="position" content={2} />
            </li>
          </ol>
          <div className="container" id="main">
            <div id="GameServerPage">
              <div className="row">
                <div className="col-md-6">
                  <h1 className="h2">{game.attributes.name}</h1>
                </div>
                <div className="col-md-6 col-md-6 h4 text-right hidden-sm hidden-xs">
                  <dl className="css-1xewpsi">
                    <dt>Servers</dt>
                    <dd>{game.attributes.servers}</dd>
                    <dt>Players</dt>
                    <dd>{game.attributes.players}</dd>
                  </dl>
                  <a href="/servers/csgo/stats">{game.attributes.name}</a>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <SearchForm details={true} game={id} callback={result} />
                </div>
              </div>
              <hr />
              {id === "minecraft" ? (
                <form>
                  <label className="css-rwbibe">
                    Duplicate &amp; Grouped Servers
                  </label>
                  <label className="radio-inline">
                    <input
                      type="radio"
                      name="groupLeader"
                      value={groupServer ? false : true}
                      checked={groupServer ? false : true}
                      onClick={(e) => changeCheckBox()}
                    />{" "}
                    Hide
                  </label>
                  <label className="radio-inline">
                    <input
                      type="radio"
                      name="groupLeader"
                      value={groupServer ? true : false}
                      checked={groupServer ? true : false}
                      onClick={(e) => changeCheckBox()}
                    />{" "}
                    Show
                  </label>
                </form>
              ) : (
                ""
              )}
              <div className="css-12dszwo" style={{}} />
              <TipsTricks />
              <div>
                <form className="hidden-md hidden-lg css-1slg6xx">
                  <div className="form-group">
                    <label htmlFor="list-sort">Sort:</label>
                    <select id="list-sort" className="form-control">
                      <option />
                      <option value="rank">Rank</option>
                      <option value="name">Name</option>
                      <option value="players">Players</option>
                      <option value="distance">Location</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="list-order">Order:</label>
                    <select id="list-order" className="form-control">
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>
                  </div>
                </form>
                <table className="css-1yjs8zt">
                  <thead>
                    <tr>
                      <th />
                      <th dir="asc" className="css-114hq3v">
                        <a rel="nofollow" href="/servers/csgo?sort=-rank">
                          Rank{" "}
                          <i className="glyphicon glyphicon-chevron-down" />
                        </a>
                      </th>
                      <th dir="asc" className="css-114hq3v">
                        <a rel="nofollow" href="/servers/csgo?sort=name">
                          Name{" "}
                        </a>
                      </th>
                      <th dir="desc" className="css-6agx5k">
                        <a rel="nofollow" href="/servers/csgo?sort=-players">
                          Players{" "}
                        </a>
                      </th>
                      <th>
                        {id === "rust" || id === "vrising"
                          ? "Last Wipe"
                          : id === "ark"
                          ? "Day"
                          : "Address"}
                      </th>
                      <th dir="asc" className="css-114hq3v">
                        <a rel="nofollow" href="/servers/csgo?sort=distance">
                          Location{" "}
                        </a>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{servers}</tbody>
                </table>
                <nav>
                  <ul className="pager css-2k6zml">
                    <li className="disabled">
                      <a href="/servers/csgo">Previous</a>
                    </li>
                    <li className="">
                      <a href="/servers/csgo?page%5Bkey%5D=10%2C16463433&page%5Brel%5D=next&page%5Bcount%5D=2">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="right side-unit">
          <div style={{}} />
        </div>
      </div>
    </>
  );
};
export default GameDetail;

import GameCard from "./widgets/gameCard";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Loading from "../../widgets/loading";
import SearchForm from "../search/searchForm";
import UserProfile from "../auth/user";
import ChartFav from "./widgets/chartFav";
function Home(props) {
  const [cards, setCards] = useState(null);
  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favoriteIDS, setFavoriteIDS] = useState(null);
  const [serversData, setServersData] = useState([]);
  const [servers, setServers] = useState(null);
  const getGames = () => {
    axios.post(props.global.API + `/get/Games`).then((res) => {
      var dataRes = res.data;
      dataRes.forEach((element) => {
        data.push(element);
      });
      setCards(
        data.map((element) => (
          <GameCard
            id={element.id}
            smallName={element.smallName}
            imgUrl={props.global.STORAGE + element.imagePath}
            name={element.name}
          />
        ))
      );
      setOptions(
        data.map((element) => (
          <option value={element.id}>{element.name}</option>
        ))
      );
      setLoading(false);
    });
  };
  // const storeGame = (e) => {
  //   e.preventDefault();
  //   const bodyFormData = new FormData(e.target);
  //   axios.post(props.global.API + `/storeGame`, bodyFormData).then((res) => {
  //     setIsOpen(false);
  //     getGames();
  //   });
  // };
  const data = [];
  useEffect(() => {
    if (favoriteIDS != null) {
      var listOfData = [];
      var bar = new Promise((resolve, reject) => {
        favoriteIDS.forEach((e) => {
          axios
            .get("https://api.battlemetrics.com/servers/" + e)
            .then((res) => {
              listOfData.push(res.data);
              if (listOfData.length == favoriteIDS.length) {
                resolve();
              }
            });
        });
      });

      bar.then(() => setServersData(listOfData));
      //
    }
  }, [favoriteIDS]);
  useEffect(() => {
    // console.log(serversData[0]);

    if (serversData.length > 0) {
      setLoading(true);
      console.log(serversData);
      setServers(
        serversData.map((e) => (
          <div>
            <div className="css-5kyi6i">
              <div className="css-kgf7x0" />
              <div className="css-1vwdu25">
                <i className="glyphicon glyphicon-th css-18v9iti" />
                <a
                  title={e.data.attributes.name}
                  className="css-lg1xyw"
                  href="/servers/minecraft/5873087"
                >
                  {e.data.attributes.name}
                </a>
              </div>
              <div className="css-1w9akvc" style={{height:"77%"}}>
                <ChartFav id={e.data.attributes.id} max={e.data.attributes.maxPlayers}  />
              </div>
              <footer className="css-1syrouw">
                <span title={e.data.attributes.ip+':'+e.data.attributes.port} className="css-xd87ek">
                  {e.data.attributes.address?e.data.attributes.address+':'+e.data.attributes.port:e.data.attributes.ip+':'+e.data.attributes.port}
                </span>
                <span className="css-1sa78x5">{e.data.attributes.players}/{e.data.attributes.maxPlayers}</span>
              </footer>
            </div>
          </div>
        ))
      );
      setLoading(false);
    }
  }, [serversData]);
  useEffect(() => {
    const getFaviroateServer = () => {
      axios
        .post(props.global.API + `/getFavoriteServers`, {
          id: UserProfile.getId(),
        })
        .then((res) => {
          var x = [];
          res.data.forEach((e) => {
            x.push(e);
          });
          setFavoriteIDS(x);
        });
    };
    getFaviroateServer();
    const getGames = () => {
      axios.post(props.global.API + `/get/Games`).then((res) => {
        var dataRes = res.data;
        dataRes.forEach((element) => {
          data.push(element);
        });
        setCards(
          data.map((element) => (
            <GameCard
              id={element.id}
              smallName={element.smallName}
              imgUrl={props.global.STORAGE + element.imagePath}
              name={element.name}
            />
          ))
        );
        setOptions(
          data.map((element) => (
            <option value={element.id}>{element.name}</option>
          ))
        );
        setLoading(false);
      });
    };
    getGames();
  }, []);
  return loading === true ? (
    <Loading />
  ) : UserProfile.getEmail() !== "" ? (
    servers == null ? (
      <div id="site-container" class="css-1q59fp3">
        <div class="left side-unit">
          <div class="css-1xqfl3j"></div>
        </div>
        <div id="content-container">
          <div class="container" id="main">
            <div class="css-1jgd03p">
              <div class="css-6rqk0u">
                Once you favorite some servers they will show up here
              </div>
              <div class="css-16cxn6a"></div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div id="site-container" className="css-1q59fp3">
        <div id="content-container">
          <div className="container" id="main">
            <div className="css-1jgd03p">
              <div className="css-16cxn6a">{servers}</div>
            </div>
          </div>
        </div>
      </div>
    )
  ) : (
    <div id="site-container" className="css-1q59fp3">
      <div className="left side-unit"></div>
      <div id="content-container">
        <div className="container" id="main">
          <div>
            <div className="row" style={{ alignItems: "center" }}>
              <div className="col-10">
                <h1>BattleMetrics</h1>
              </div>
            </div>
            <div id="home-search">
              <SearchForm
                callback={(e, x) => {
                  props.handleSearch("servers/search", e, x);
                }}
              />
            </div>
            <hr />
            <h2>Games</h2>
            <div className="css-fteb4t">{cards}</div>
            <hr />
            <div className="row">
              <div className="col-md-4 topic">
                <h3>Monitoring</h3>We automatically track all servers and
                provide advanced tools and metrics for players and admins.
              </div>
              <div className="col-md-4 topic">
                <h3>Alerts</h3>Get notified when a server goes offline, reaches
                a certain number of players, or a player joins.
              </div>
              <div className="col-md-4 topic">
                <h3>Statistics</h3>See how many new and returning players are
                joining, number of hours spent in game, and when.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="right side-unit"></div>
    </div>
  );
}

export default Home;

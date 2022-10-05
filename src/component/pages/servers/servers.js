import GameCardServer from "./widgets/gameCardsServer";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../widgets/loading";
import SearchForm from "../search/searchForm";

function Servers(props) {
  const [cards, setCards] = useState(null);
  const [options, setOptions] = useState(null);
  const [side, setSide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartsV, setChartsV] = useState([]);

  useEffect(() => {
    const getGames = () => {
      axios
        .get("https://api.battlemetrics.com/games?page%5Bsize%5D=100")
        .then((res) => {
          // console.log(res.data.data);
          var dataRes = res.data.data;
          setCards(
            dataRes
              .sort((a, b) =>
                parseInt(a.attributes.players) > parseInt(b.attributes.players)
                  ? -1
                  : 1
              )
              .map((element) => (
                <GameCardServer
                  id={element.id}
                  imgUrl={
                    props.global.STORAGE +
                    "/storage/images/" +
                    element.id +
                    ".png"
                  }
                  name={element.attributes.name}
                  players={element.attributes.players}
                  servers={element.attributes.servers}
                  chartsV={chartsV}
                />
              ))
          );
          setOptions(
            dataRes.map((element) => (
              <option value={element.id}>{element.attributes.name}</option>
            ))
          );
          setSide(
            dataRes.sort((a,b)=>a.attributes.name > b.attributes.name ? 1 : -1,).map((element) => (
              <>
                <li>
                  <a href={"/servers/" + element.id}>
                    <img
                      src={
                        props.global.STORAGE +
                        "/storage/images/" +
                        element.id +
                        ".png"
                      }
                      width={24}
                      height={24}
                      alt={element.attributes.name}
                    />
                    {" " + element.attributes.name}
                  </a>
                </li>
              </>
            ))
          );
          var date = new Date();
          var today =
            date.getUTCFullYear() +
            "-" +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + date.getUTCDate()).slice(-2) +
            "T" +
            ("0" + date.getUTCHours()).slice(-2);
          var yesterdayData = new Date(date.getTime() - 86400000);
          var yesterday =
            yesterdayData.getUTCFullYear() +
            "-" +
            ("0" + (yesterdayData.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + yesterdayData.getUTCDate()).slice(-2) +
            "T" +
            ("0" + yesterdayData.getUTCHours()).slice(-2);
          console.log(today);
          console.log(yesterday);
          axios
            .get(
              "https://api.battlemetrics.com/metrics?fields[dataPoint]=name,group,timestamp,value&metrics[0][name]=games.*.servers.online,games.*.players&metrics[0][range]=" +
                yesterday +
                ":00:00.000Z:" +
                today +
                ":00:00.000Z&metrics[0][resolution]=60"
            )
            .then((res) => {
              res.data.data.forEach((element) => {
                chartsV.push(element);
              });
              setChartsV(chartsV);
            });
          setLoading(false);
        });
    };
    getGames();
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
            className="css-c7thuy"
          >
            <a itemProp="item" href="/servers">
              <span itemProp="name">Servers</span>
            </a>
            <meta itemProp="position" content={1} />
          </li>
        </ol>
        <div className="container" id="main">
          <div>
            <h2>Servers</h2>

            <div className="row">
              <div className="col-md-9">
                <h3>Search</h3>
                <SearchForm
                  callback={(e, x, link, prevlink) => {
                    props.handleSearch("servers/search", e, x, link, prevlink);
                  }}
                />
                <hr />
                <div className="css-1y1h2hi" style={{}}>
                  <div
                    className="ad-tag"
                    id="games-page"
                    data-request-id=""
                    data-report='{"enabled":true,"position":"bottom-center","wording":"Report Ad"}'
                    style={{ minHeight: 90, textAlign: "center", fontSize: 0 }}
                    data-bidder="blank"
                    data-creative-id=""
                  >
                    <img
                      src="https://tracker.nitropay.com/pixel.png?s=1163&wb=eyJhZFVuaXRDb2RlIjoiZ2FtZXMtcGFnZSIsImJpZGRlciI6ImJsYW5rIiwiaGVpZ2h0IjowLCJ3aWR0aCI6MCwiY3BtIjowLCJjcmVhdGl2ZUlkIjoiIiwiaHJlZiI6Imh0dHBzOi8vd3d3LmJhdHRsZW1ldHJpY3MuY29tL3NlcnZlcnMiLCJhY2NlcHRhYmxlIjpmYWxzZSwicmVxdWVzdElkIjoiZGI4ZjdiYWYtZjRmNC00NTkwLWIzYzItZTFiYTY4MDRiNzdlIiwidGltZVRvUmVzcG9uZCI6MCwiYyI6IkpPIiwiciI6IkFNIiwidHlwZSI6MCwiZHVyYXRpb24iOjAsInRpbWVzdGFtcCI6MTY2MzA5NzgwNjkyMH0%3D&t=0&f=1"
                      style={{ display: "none" }}
                      alt=""
                    />
                  </div>
                </div>
                <table className="css-1c9jt0k">
                  <thead>
                    <tr>
                      <td />
                      <th dir="asc" className="css-114hq3v">
                        <a rel="nofollow" href="/servers?sort=name">
                          Name{/* */}{" "}
                        </a>
                      </th>
                      <th dir="desc" className="css-6agx5k">
                        <a rel="nofollow" href="/servers?sort=players">
                          Players{/* */}{" "}
                          <i className="glyphicon glyphicon-chevron-down" />
                        </a>
                      </th>
                      <th dir="desc" className="css-6agx5k">
                        <a rel="nofollow" href="/servers?sort=-servers">
                          Servers{/* */}{" "}
                        </a>
                      </th>
                      <td />
                    </tr>
                  </thead>
                  <tbody>{cards}</tbody>
                </table>
              </div>
              <div className="col-md-3">
                <h3>
                  All games <small>by name</small>
                </h3>
                <ul className="list-unstyled">{side}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Servers;

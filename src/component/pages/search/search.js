import ServerCard from "../gameDetails/widgets/serverCard";
import Loading from "../../widgets/loading";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchForm from "./searchForm";

const Search = (props) => {
  const [cards, setCards] = useState([]);
  const [link, setLink] = useState(null);
  const [prevLink, setPrevLink] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const result = (res, filters) => {
    setCards(
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
  useEffect(() => {
    if (currentLocation != null) {
      setLoading(true);
      setCards(
        props.data.map((element) => (
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
      setLoading(false);
    }
  }, [currentLocation]);
  useEffect(() => {
    setLoading(true);
    const getLocation = () => {
      axios
        .get(
          "https://api.battlemetrics.com/account?include=organizations,organizationUser,roles,organizations.banLists,favorites,subscription,player,loginMethod,organizationFriend"
        )
        .then((res) => {
          setCurrentLocation(res.data.data.attributes);
          if (props.data) {
            setLink(props.link);
            setPrevLink(props.prevLink);
          }
        });
    };
    getLocation();

    setLoading(false);
  }, []);
  const nextPage = () => {
    axios.get(link).then((res) => {
      result(res.data.data, {});
      setLink(res.data.links.next);
      setPrevLink(res.data.links.prev);
    });
  };
  const prevPage = () => {
    axios.get(prevLink).then((res) => {
      result(res.data.data, {});
      setLink(res.data.links.next);
      if (res.data.links.prev) {
        setPrevLink(res.data.links.prev);
      } else {
        setPrevLink(null);
      }
    });
  };
  return loading === true ? (
    <Loading />
  ) : (
    <div id="site-container" className="css-1q59fp3">
      <div className="left side-unit">
        <div className="css-1xqfl3j" style={{}} />
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
            <a itemProp="item" href="/servers/search">
              <span itemProp="name">Search</span>
            </a>
            <meta itemProp="position" content={2} />
          </li>
        </ol>
        <div className="container" id="main">
          <div>
            <h2>Search</h2>
            <SearchForm
              callback={result}
              filters={props.filters}
              setLink={setLink}
            />
            <h3>Results</h3>
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
                      <a
                        rel="nofollow"
                        href="/servers/search?game=css&sort=-rank"
                      >
                        Rank <i className="glyphicon glyphicon-chevron-down" />
                      </a>
                    </th>
                    <th dir="asc" className="css-114hq3v">
                      <a
                        rel="nofollow"
                        href="/servers/search?game=css&sort=name"
                      >
                        Name{" "}
                      </a>
                    </th>
                    <th dir="desc" className="css-6agx5k">
                      <a
                        rel="nofollow"
                        href="/servers/search?game=css&sort=-players"
                      >
                        Players{" "}
                      </a>
                    </th>
                    <th>{props.id=='rust'?'':"Address"}</th>
                    <th dir="asc" className="css-114hq3v">
                      <a
                        rel="nofollow"
                        href="/servers/search?game=css&sort=distance"
                      >
                        Location{" "}
                      </a>
                    </th>
                  </tr>
                </thead>
                <tbody>{cards}</tbody>
              </table>
              <nav>
                <ul className="pager css-2k6zml">
                  <li className={prevLink == null ? "disabled" : ""}>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        prevPage();
                      }}
                    >
                      Previous
                    </a>
                  </li>
                  <li className="">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        nextPage();
                      }}
                    >
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
  );
};
export default Search;

import axios from "axios";
import React, { useEffect, useState } from "react";
import UserProfile from "../auth/user";
import $ from "jquery";
import PlayerCard from "./widgets/playerCard";
import Select from "react-select";
import { components } from "react-select";
import DropDownStyle from "../search/values/dropdownStyle";
import SearchForm from "../search/searchForm";
import Loading from "../../widgets/loading";
const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label style={{ display: "unset" }}>{props.label}</label>
      </components.Option>
    </div>
  );
};
const ValueContainer = (propss) => {
  return (
    <div>
      <components.Placeholder {...propss} isFocused={propss.hasValue}>
        {propss.hasValue ? "" : "Filter by your favorite servers"}
      </components.Placeholder>

      <components.ValueContainer {...propss}>
        <span className="css-ekcj9h">
          {" "}
          {propss
            .getValue()
            .map((e, i) =>
              i + 1 === propss.getValue().length ? e.label : e.label + ","
            )}
        </span>
      </components.ValueContainer>
    </div>
  );
};

function Players(props) {
  const [players, setPlayers] = useState(null);
  const [focus, setFocus] = useState(false);
  const [favServer, setFavServer] = useState([null]);
  const [selectedFav, setSelectedFav] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nextLink, setNextLink] = useState(null);
  const [prevLink, setPrevLink] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [serverSearch, setServerSearch] = useState(null);
  const [sort, setSort] = useState("&sort=-lastSeen");
  const [lastSearch, setLastSearch] = useState("");
  const changeFocus = () => {
    setFocus(!focus);
  };
  const nextORprev = (e) => {
    axios.get(e).then((res) => {
      var serversData = res.data.included;
      setPlayers(
        res.data.data.map((e) => (
          <PlayerCard
            props={e}
            server={selectedFav ? true : false}
            serverData={serversData}
            apiData={props.global.STORAGE}
          />
        ))
      );
      setNextLink(res.data.links.next);
      if (res.data.links.prev) {
        setPrevLink(res.data.links.prev);
      } else {
        setPrevLink(null);
      }
    });
  };
  const submit = (e) => {
    var search = e.target.search.value;
    var online = e.target.online.value;
    var servers = "";
    if (selectedFav) {
      selectedFav.forEach((element, i) => {
        if (i == selectedFav.length - 1) {
          servers += element.value;
        } else {
          servers += element.value + ",";
        }
      });
    }
    var serverTF = servers !== "" || serverSearch;
    setLastSearch(
      "https://api.battlemetrics.com/players?version=^0.1.0&page[size]=10&filter[playerFlags]=&include=flagPlayer,playerFlag" +
        (serverTF ? ",server" : "") +
        "&filter[search]=" +
        search +
        (online ? "&filter[online]=" + online : "") +
        (selectedFav ? "&fields[server]=name&filter[servers]=" + servers : "") +
        (serverSearch ? serverSearch : "")
    );
    axios
      .get(
        "https://api.battlemetrics.com/players?version=^0.1.0&page[size]=10&filter[playerFlags]=&include=flagPlayer,playerFlag" +
          (serverTF ? ",server" : "") +
          "&filter[search]=" +
          search +
          (online ? "&filter[online]=" + online : "") +
          (selectedFav
            ? "&fields[server]=name&filter[servers]=" + servers
            : "") +
          (serverSearch ? serverSearch : "") +
          sort
      )
      .then((res) => {
        var serversData = res.data.included;
        setPlayers(
          res.data.data.map((e) => (
            <PlayerCard
              props={e}
              server={serverSearch ? true : false}
              serverData={serversData}
              apiData={props.global.STORAGE}
            />
          ))
        );
        setNextLink(res.data.links.next);
        setPrevLink(res.data.links.prev);
        $("#res").show();
      });
  };
  const SortRES = (sortV) => {
    axios.get(lastSearch + sortV).then((res) => {
      var serversData = res.data.included;
      setPlayers(
        res.data.data.map((e) => (
          <PlayerCard
            props={e}
            server={serverSearch ? true : false}
            serverData={serversData}
            apiData={props.global.STORAGE}
          />
        ))
      );
      setNextLink(res.data.links.next);
      setPrevLink(res.data.links.prev);
      $("#res").show();
    });
  };
  useEffect(() => {
    if (favServer != null) {
      setLoading(false);
      $("#res").hide();
    }
  }, [favServer]);
  useEffect(() => {
    const getFavGame = () => {
      axios
        .post(props.global.API + `/getFavoriteServers`, {
          id: UserProfile.getId(),
        })
        .then((res) => {
          if (res.data.length > 0) {
            var data = [];
            var wait = new Promise((resolve, reject) => {
              res.data.forEach((e) => {
                axios
                  .get("https://api.battlemetrics.com/servers/" + e)
                  .then((resS) => {
                    data.push({
                      label: resS.data.data.attributes.name,
                      value: e,
                    });
                    if (res.data.length == data.length) {
                      resolve();
                    }
                  });
              });
            });
            wait.then((e) => setFavServer(data));
          }
        });
    };
    getFavGame();
  }, []);
  const Control = (props) => {
    return (
      <div onClick={changeFocus}>
        <components.Control {...props}></components.Control>
      </div>
    );
  };
  const queryForm = (e) => {
    setServerSearch(e);
  };
  return loading ? (
    <Loading />
  ) : (
    <div id="site-container" className="css-1q59fp3">
      <div className="left side-unit">
        <div />
      </div>
      <div id="content-container">
        <div className="container" id="main">
          <div id="PlayerInstancesPage">
            <h1>
              Player Search
              <div className="css-1234tng">
                <a className="css-1m4imoj" href="/players/flags">
                  Player Flags
                </a>
              </div>
            </h1>
            <form
              className="player-search"
              id="playerSearch"
              onSubmit={(e) => {
                e.preventDefault();
                submit(e);
              }}
            >
              <h2 className="h3">Player Filters</h2>
              <div className="player-filters">
                <div className="row">
                  <div className="col-md-3 col-sm-6">
                    <div className="form-group player-name">
                      <label htmlFor="input-search">
                        <span>
                          Player Name{" "}
                          <i className="glyphicon glyphicon-question-sign" />
                        </span>
                      </label>
                      <input
                        name="search"
                        id="input-search"
                        type="text"
                        className="form-control"
                        label="[object Object]"
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="online-status form-group">
                      <label htmlFor="input-online">Online Status</label>
                      <select
                        name="online"
                        id="input-online"
                        className="form-control"
                      >
                        <option value="" selected="">
                          Show All Players
                        </option>
                        <option value="true">Only show online players</option>
                        <option value="false">Only show offline players</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6 col-lg-2">
                    <div className="form-group sessions-at">
                      <label htmlFor="sessions-at">Online At</label>{" "}
                      <i className="glyphicon glyphicon-question-sign paid" />
                      <input
                        id="sessions-at"
                        name="sessionsAt"
                        className="form-control"
                        disabled=""
                        placeholder="09/13/2022 7:44 PM"
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6 col-lg-4">
                    <div className="form-group favorite-server-selection">
                      <label htmlFor="favorite-selection">
                        Favorite Servers
                      </label>
                      <Select
                        name="Filter by your favorite servers"
                        onChange={(e) => setSelectedFav(e)}
                        value={selectedFav}
                        components={{
                          Option,
                          ValueContainer,
                          Control,
                        }}
                        menuIsOpen={focus}
                        options={favServer}
                        isMulti
                        isSearchable
                        styles={DropDownStyle}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        allowSelectAll={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 css-f03b9">
                    <strong>
                      First Seen Time Range{" "}
                      <i className="glyphicon glyphicon-question-sign css-cqfxzc" />
                    </strong>
                    <div className="date-range">
                      <div className="form-group">
                        <label htmlFor="first-seen-start">Start</label>{" "}
                        <input
                          id="first-seen-start"
                          name="firstSeenStart"
                          className="form-control"
                          disabled=""
                          placeholder="09/13/2022 7:44 PM"
                          defaultValue=""
                        />
                      </div>
                      <span className="date-to">to</span>
                      <div className="form-group">
                        <label htmlFor="first-seen-stop">Stop</label>{" "}
                        <input
                          id="first-seen-stop"
                          name="firstSeenStop"
                          className="form-control"
                          disabled=""
                          placeholder="09/13/2022 7:44 PM"
                          defaultValue=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 css-f03b9">
                    <strong>
                      Last Seen Time Range{" "}
                      <i className="glyphicon glyphicon-question-sign css-cqfxzc" />
                    </strong>
                    <div className="date-range">
                      <div className="form-group">
                        <label htmlFor="last-seen-start">Start</label>{" "}
                        <input
                          id="last-seen-start"
                          name="lastSeenStart"
                          className="form-control"
                          disabled=""
                          placeholder="09/13/2022 7:44 PM"
                          defaultValue=""
                        />
                      </div>
                      <span className="date-to">to</span>
                      <div className="form-group">
                        <label htmlFor="last-seen-stop">Stop</label>{" "}
                        <input
                          id="last-seen-stop"
                          name="lastSeenStop"
                          className="form-control"
                          disabled=""
                          placeholder="09/13/2022 7:44 PM"
                          defaultValue=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="form-group Select-checkbox-mode">
                    <label htmlFor="flags-selection">
                      Flags{" "}
                      <i className="glyphicon glyphicon-question-sign css-cqfxzc" />
                    </label>
                    <div className=" css-d8ayb2-container">
                      <div className=" css-1disksd-control">
                        <div className=" css-17sxz2p">
                          <div className=" css-zvhxg-placeholder">
                            Select...
                          </div>
                          <div className="css-1buy4mr">
                            <div
                              className=""
                              style={{ display: "inline-block" }}
                            >
                              <input
                                disabled=""
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect="off"
                                id="react-select-4-input"
                                spellCheck="false"
                                tabIndex={0}
                                type="text"
                                aria-autocomplete="list"
                                defaultValue=""
                                style={{
                                  boxSizing: "content-box",
                                  width: 2,
                                  background: "0px center",
                                  border: 0,
                                  fontSize: "inherit",
                                  opacity: 1,
                                  outline: 0,
                                  padding: 0,
                                  color: "inherit",
                                }}
                              />
                              <div
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  visibility: "hidden",
                                  height: 0,
                                  overflow: "scroll",
                                  whiteSpace: "pre",
                                  fontSize: 14,
                                  fontFamily:
                                    '"Helvetica Neue", Helvetica, Arial, sans-serif',
                                  fontWeight: 400,
                                  fontStyle: "normal",
                                  letterSpacing: "normal",
                                  textTransform: "none",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className=" css-1wy0on6">
                          <span className=" css-109onse-indicatorSeparator" />
                          <div
                            aria-hidden="true"
                            className=" css-tlfecz-indicatorContainer"
                          >
                            <svg
                              height={20}
                              width={20}
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                              focusable="false"
                              className="css-19bqh2r"
                            >
                              <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button
                  id="toggle-server-filters"
                  type="button"
                  className="css-zwfpp9"
                  onClick={(e) => setIsOpen(!isOpen)}
                >
                  <span>
                    <i
                      className={
                        "glyphicon glyphicon-chevron-right " +
                        (isOpen ? " css-a52oks" : " css-19likfw")
                      }
                    />{" "}
                    Show Server Filters
                  </span>
                </button>
                <div className={"collapse " + (isOpen ? "in" : "")}>
                  <h2 className="h3">Server Filters</h2>
                  <SearchForm
                    dontShowSearch={true}
                    searchingQuery={queryForm}
                  />
                </div>
              </div>
              <button type="submit" className="css-1dcotcn">
                Search
              </button>
            </form>
            <div className="css-n080vt" id="res">
              <h2>Search Results</h2>
              <p id="sort-options">
                <strong>Sort By:</strong>
                <br />
                <a
                  rel="nofollow"
                  className="disabled css-1m4imoj "
                  href="/#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSort("");
                    SortRES("");
                  }}
                >
                  Relevance
                </a>
                <a
                  rel="nofollow"
                  className={
                    "css-1m4imoj " +
                    (sort === "&sort=-lastSeen" ? "active" : "")
                  }
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSort("&sort=-lastSeen");
                    SortRES("&sort=-lastSeen");
                  }}
                >
                  Last Seen
                </a>
                <a
                  rel="nofollow"
                  className={
                    "css-1m4imoj " +
                    (sort === "&sort=firstSeen" ? "active" : "")
                  }
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSort("&sort=firstSeen");
                    SortRES("&sort=firstSeen");
                  }}
                >
                  First Seen
                </a>
                <br />
                Sorting by relevance.
              </p>
              <hr />
              <ul className="list-unstyled">{players}</ul>
              <nav>
                <ul className="pager">
                  <li className={prevLink ? "previous" : "previous disabled"}>
                    <a
                      href="prev"
                      onClick={(e) => {
                        e.preventDefault();
                        nextORprev(prevLink);
                      }}
                    >
                      Previous
                    </a>
                  </li>
                  <li className={nextLink ? "next" : "next disabled"}>
                    <a
                      href="next"
                      onClick={(e) => {
                        e.preventDefault();
                        nextORprev(nextLink);
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
    </div>
  );
}
export default Players;

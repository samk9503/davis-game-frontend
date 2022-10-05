import axios from "axios";
import React, { useEffect, useState } from "react";
import UserProfile from "../auth/user";
import $ from "jquery";
import PlayerCard from "./widgets/playerCard";
import Select from "react-select";
import { components } from "react-select";
import DropDownStyle from "../search/values/dropdownStyle";
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
  const [favServer, setFavServer] = useState(null);
  const [selectedFav, setSelectedFav] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nextLink, setNextLink] = useState(null);
  const [prevLink, setPrevLink] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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
    e.preventDefault();
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
    var serverSearch = e.target.serverSearch.value;
    var serverSearch = servers !== "" || serverSearch;
    axios
      .get(
        "https://api.battlemetrics.com/players?version=^0.1.0&page[size]=10&filter[playerFlags]=&include=flagPlayer,playerFlag" +
          (serverSearch ? ",server" : "") +
          "&filter[search]=" +
          search +
          (online ? "&filter[online]=" + online : "") +
          (selectedFav
            ? "&sort=-lastSeen&fields[server]=name&filter[servers]=" + servers
            : "") +
          (serverSearch ? "&filter[server][search]=" + serverSearch : "")
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
  useEffect(() => {
    if (favServer != null) {
      setLoading(false);
    }
  }, [favServer]);
  useEffect(() => {
    $("#res").hide();
    const getFavGame = () => {
      axios
        .post(props.global.API + `/getFavoriteServers`, {
          id: UserProfile.getId(),
        })
        .then((res) => {
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
  return (
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
            <form className="player-search" onSubmit={(e) => submit(e)}>
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
                  <div className="css-k19prh">
                    <div className="css-1rth6vi">
                      <div className="form-group">
                        <label htmlFor="input-serverSearch">
                          <span>
                            Search{" "}
                            <i className="glyphicon glyphicon-question-sign" />
                          </span>
                        </label>
                        <input
                          name="serverSearch"
                          id="input-serverSearch"
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="css-1tws66a">
                      <div className="form-group">
                        <label htmlFor="input-game">
                          <span>
                            Game{" "}
                            <i className="glyphicon glyphicon-question-sign" />
                          </span>
                        </label>
                        <select
                          name="game"
                          id="input-game"
                          className="form-control"
                        >
                          <option value="">All Games</option>
                          <option value="7dtd">7 Days to Die</option>
                          <option value="ark">ARK: Survival Evolved</option>
                          <option value="arma2">ArmA 2</option>
                          <option value="arma3">ArmA 3</option>
                          <option value="atlas">Atlas</option>
                          <option value="battalion1944">Battalion 1944</option>
                          <option value="btw">Beyond the Wire</option>
                          <option value="conanexiles">Conan Exiles</option>
                          <option value="cs">Counter-Strike</option>
                          <option value="csgo">
                            Counter-Strike: Global Offensive
                          </option>
                          <option value="css">Counter-Strike: Source</option>
                          <option value="dnl">Dark and Light</option>
                          <option value="dayz">DayZ</option>
                          <option value="gmod">Garry's Mod</option>
                          <option value="hll">Hell Let Loose</option>
                          <option value="insurgency">Insurgency</option>
                          <option value="sandstorm">
                            Insurgency: Sandstorm
                          </option>
                          <option value="minecraft">Minecraft</option>
                          <option value="mordhau">MORDHAU</option>
                          <option value="moe">Myth of Empires</option>
                          <option value="pixark">PixARK</option>
                          <option value="postscriptum">Post Scriptum</option>
                          <option value="zomboid">Project Zomboid</option>
                          <option value="rend">Rend</option>
                          <option value="rs2vietnam">
                            Rising Storm 2: Vietnam
                          </option>
                          <option value="rust">Rust</option>
                          <option value="scum">SCUM</option>
                          <option value="squad">Squad</option>
                          <option value="tf2">Team Fortress 2</option>
                          <option value="unturned">Unturned</option>
                          <option value="vrising">V Rising</option>
                          <option value="valheim">Valheim</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <div>
                        <strong className="css-iiypcb">Server Status</strong>
                      </div>
                      <div className="css-179a3wy">
                        <button
                          type="button"
                          value="false"
                          className="css-jr2coq"
                        >
                          <i className="glyphicon glyphicon-remove" />
                        </button>
                        <button
                          type="button"
                          value="null"
                          className="css-12u7yum"
                        >
                          <i className="glyphicon glyphicon-asterisk" />
                        </button>
                        <button
                          type="button"
                          value="true"
                          className="css-pg6z3l"
                        >
                          <i className="glyphicon glyphicon-ok" />
                        </button>
                      </div>
                    </div>
                    <div className="form-group css-q4oe17">
                      <div className="feature-header">
                        <strong className="css-iiypcb">Players</strong>
                      </div>
                      <div className="css-amj929">
                        <div>
                          <input
                            type="number"
                            placeholder={0}
                            className="form-control"
                            name="minPlayers"
                            defaultValue=""
                          />
                        </div>
                        <div className="css-o9ndhe">to</div>
                        <div>
                          <input
                            type="number"
                            placeholder="∞"
                            className="form-control"
                            name="maxPlayers"
                            defaultValue=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group css-uf32pv">
                      <label htmlFor="max-distance">Max Distance</label>
                      <div className="input-group">
                        <input
                          name="maxDistance"
                          id="max-distance"
                          type="number"
                          min={0}
                          placeholder="∞"
                          className="form-control"
                          defaultValue=""
                        />
                        <span className="input-group-addon">km</span>
                      </div>
                    </div>
                    <div className="form-group css-94r04m">
                      <div>
                        <label htmlFor="countries">Countries</label>
                      </div>
                      <div className=" css-unbkw5-container">
                        <div className=" css-jg7s2p-control">
                          <div className=" css-17sxz2p">
                            <div className=" css-zvhxg-placeholder">
                              Countries
                            </div>
                            <div className="css-1buy4mr">
                              <div
                                className=""
                                style={{ display: "inline-block" }}
                              >
                                <input
                                  autoCapitalize="none"
                                  autoComplete="off"
                                  autoCorrect="off"
                                  id="react-select-5-input"
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
                            <span className=" css-1okebmr-indicatorSeparator" />
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
                  className="active css-1m4imoj"
                  href="/players?filter%5Bsearch%5D=test&filter%5Bonline%5D=false&filter%5BplayerFlags%5D=&sort=score"
                >
                  Relevance
                </a>
                <a
                  rel="nofollow"
                  className=" css-1m4imoj"
                  href="/players?filter%5Bsearch%5D=test&filter%5Bonline%5D=false&filter%5BplayerFlags%5D=&sort=-lastSeen"
                >
                  Last Seen
                </a>
                <a
                  rel="nofollow"
                  className=" css-1m4imoj"
                  href="/players?filter%5Bsearch%5D=test&filter%5Bonline%5D=false&filter%5BplayerFlags%5D=&sort=firstSeen"
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

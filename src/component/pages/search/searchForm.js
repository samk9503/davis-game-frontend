import React, { useState, useEffect } from "react";
import { components } from "react-select";
import DropDownStyle from "./values/dropdownStyle";
import axios from "axios";
import FromTo from "./widgets/fromTo";
import DropDown from "./widgets/dropDown";
import Mode from "./widgets/mode";
import Select from "react-select";
import Countries from "./values/countrys";
import $ from "jquery";
const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};
const ValueContainer = (propss) => {
  return (
    <div>
      <components.Placeholder {...propss} isFocused={propss.hasValue}>
        {propss.hasValue ? "" : "Countries"}
      </components.Placeholder>
      <components.ValueContainer {...propss}>
        <span className="css-ekcj9h">
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

const SearchForm = (props) => {
  const [gameFeature, setGameFeature] = useState(null);
  const [gameFeature1, setGameFeature1] = useState(null);
  const [gameFeature2, setGameFeature2] = useState(null);
  const [minPlayers, setMinPlayers] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("");
  const [maxDistance, setMaxDistance] = useState("");
  const [name, setName] = useState("");
  const [serverStatus, setServerStatus] = useState(null);
  const [featureFilter, setFeatureFilter] = useState([]);
  const [featureFilterDropDown, setFeatureFilterDropDown] = useState([]);
  const [featureFilterFromTo, setFeatureFilterFromTo] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]); //add initial state
  const [game, setGame] = useState(null);
  const [focus, setFocus] = useState(false);
  const addFetureFilter = (id, value) => {
    var index = featureFilter.findIndex((x) => x.id === id);
    if (value === "null") {
      if (index !== -1) {
        setFeatureFilter(featureFilter.splice(index));
      }
    } else {
      if (index !== -1) {
        setFeatureFilter(featureFilter.splice(index));
      }
      featureFilter.push({ id: id, value: value });
      setFeatureFilter(featureFilter);
    }
    setFeatureFilter(featureFilter);
  };
  const addFetureFilterDropDown = async (id, value, type) => {
    featureFilterDropDown.forEach((element, i) => {
      if (element.id === id) {
        featureFilterDropDown.splice(i);
        setFeatureFilterDropDown(featureFilterDropDown);
      }
    });
    if (value !== null) {
      value.forEach((element, i) => {
        featureFilterDropDown.push({
          id: id,
          label: element.label,
          value: element.value,
          type: type,
          index: i,
        });
      });
      setFeatureFilterDropDown(featureFilterDropDown);
    }
  };
  const addFetureFilterFromTo = async (id, value) => {
    featureFilterFromTo.forEach((element, i) => {
      if (element.id === id) {
        featureFilterFromTo.splice(i);
        setFeatureFilterFromTo(featureFilterFromTo);
      }
    });
    if (value !== null) {
      if (value.from === "" && value.to === "") {
        var index = featureFilterFromTo.findIndex((x) => x.id === id);
        if (index !== -1) {
          setFeatureFilterFromTo(featureFilterFromTo.splice(index));
        }
      } else {
        featureFilterFromTo.push({
          id: id,
          from: value.from,
          to: value.to,
        });
      }

      setFeatureFilterFromTo(featureFilterFromTo);
    }
  };
  const changeFocus = () => {
    setFocus(!focus);
  };
  const Control = (props) => {
    return (
      <div onClick={changeFocus}>
        <components.Control {...props}></components.Control>
      </div>
    );
  };
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const whichFeature = (feature, id) => {
    switch (feature) {
      case "Crossplay":
        return (
          <Mode
            addFetureFilter={addFetureFilter}
            value={featureFilter.filter((item) => item.id === id)}
            id={id}
            name="Crossplay"
          />
        );

      case "Map":
        return (
          <DropDown
            addFetureFilterDropDown={addFetureFilterDropDown}
            id={id}
            selected={featureFilterDropDown
              .filter((item) => item.id === id)
              .filter((e) => delete e.id)
              .filter((e) => delete e.type)
              .filter((e) => delete e.index)}
            name="Map"
          />
        );

      case "Modded":
        return (
          <Mode
            addFetureFilter={addFetureFilter}
            value={featureFilter.filter((item) => item.id === id)}
            id={id}
            name="Modded"
          />
        );

      case "PVE":
        return (
          <Mode
            addFetureFilter={addFetureFilter}
            value={featureFilter.filter((item) => item.id === id)}
            id={id}
            name="PVE"
          />
        );

      case "Mods":
        return (
          <DropDown
            addFetureFilterDropDown={addFetureFilterDropDown}
            selected={featureFilterDropDown
              .filter((item) => item.id === id)
              .filter((e) => delete e.id)
              .filter((e) => delete e.type)
              .filter((e) => delete e.index)}
            id={id}
            name="Mods"
          />
        );

      case "Official Server":
        return (
          <Mode
            addFetureFilter={addFetureFilter}
            value={featureFilter.filter((item) => item.id === id)}
            id={id}
            name="Official Server"
          />
        );

      case "Server Mods":
        return (
          <DropDown
            addFetureFilterDropDown={addFetureFilterDropDown}
            selected={featureFilterDropDown
              .filter((item) => item.id === id)
              .filter((e) => delete e.id)
              .filter((e) => delete e.type)
              .filter((e) => delete e.index)}
            id={id}
            name="Server Mods"
          />
        );

      case "Allowed Mods":
        return (
          <DropDown
            addFetureFilterDropDown={addFetureFilterDropDown}
            selected={featureFilterDropDown
              .filter((item) => item.id === id)
              .filter((e) => delete e.id)
              .filter((e) => delete e.type)
              .filter((e) => delete e.index)}
            id={id}
            name="Allowed Mods"
          />
        );

      case "Cluster":
        return (
          <DropDown
            addFetureFilterDropDown={addFetureFilterDropDown}
            selected={featureFilterDropDown
              .filter((item) => item.id === id)
              .filter((e) => delete e.id)
              .filter((e) => delete e.type)
              .filter((e) => delete e.index)}
            id={id}
            name="Cluster"
          />
        );

      case "Passworded":
        return (
          <Mode
            addFetureFilter={addFetureFilter}
            value={featureFilter.filter((item) => item.id === id)}
            id={id}
            name="Passworded"
          />
        );

      case "Freeport":
        return (
          <Mode
            addFetureFilter={addFetureFilter}
            value={featureFilter.filter((item) => item.id === id)}
            id={id}
            name="Freeport"
          />
        );

      case "Game Mode":
        return (
          <DropDown
            addFetureFilterDropDown={addFetureFilterDropDown}
            selected={featureFilterDropDown
              .filter((item) => item.id === id)
              .filter((e) => delete e.id)
              .filter((e) => delete e.type)
              .filter((e) => delete e.index)}
            id={id}
            name="Game Mode"
          />
        );

      case "Licensed Server":
        return (
          <Mode
            addFetureFilter={addFetureFilter}
            value={featureFilter.filter((item) => item.id === id)}
            id={id}
            name="Licensed Server"
          />
        );

      case "Version":
        return (
          <DropDown
            addFetureFilterDropDown={addFetureFilterDropDown}
            selected={featureFilterDropDown
              .filter((item) => item.id === id)
              .filter((e) => delete e.id)
              .filter((e) => delete e.type)
              .filter((e) => delete e.index)}
            id={id}
            name="Version"
          />
        );

      case "Friendly Fire":
        return (
          <Mode
            addFetureFilter={addFetureFilter}
            value={featureFilter.filter((item) => item.id === id)}
            id={id}
            name="Friendly Fire"
          />
        );

      case "Third Person":
        return (
          <Mode
            addFetureFilter={addFetureFilter}
            value={featureFilter.filter((item) => item.id === id)}
            id={id}
            name="Third Person"
          />
        );

      case "Password Protected":
        return (
          <Mode
            addFetureFilter={addFetureFilter}
            value={featureFilter.filter((item) => item.id === id)}
            id={id}
            name="Password Protected"
          />
        );

      case "Match Server":
        return (
          <Mode
            addFetureFilter={addFetureFilter}
            value={featureFilter.filter((item) => item.id === id)}
            id={id}
            name="Match Server"
          />
        );

      case "Password / Whitelist":
        return (
          <Mode
            addFetureFilter={addFetureFilter}
            value={featureFilter.filter((item) => item.id === id)}
            id={id}
            name="Password / Whitelist"
          />
        );

      case "Blood-Bound Equipment":
        return (
          <Mode
            addFetureFilter={addFetureFilter}
            value={featureFilter.filter((item) => item.id === id)}
            id={id}
            name="Blood-Bound Equipment"
          />
        );

      case "Official":
        return (
          <Mode
            addFetureFilter={addFetureFilter}
            value={featureFilter.filter((item) => item.id === id)}
            id={id}
            name="Official"
          />
        );

      case "Playlist":
        return (
          <DropDown
            addFetureFilterDropDown={addFetureFilterDropDown}
            selected={featureFilterDropDown
              .filter((item) => item.id === id)
              .filter((e) => delete e.id)
              .filter((e) => delete e.type)
              .filter((e) => delete e.index)}
            id={id}
            name="Playlist"
          />
        );

      case "Modpack":
        return (
          <DropDown
            addFetureFilterDropDown={addFetureFilterDropDown}
            selected={featureFilterDropDown
              .filter((item) => item.id === id)
              .filter((e) => delete e.id)
              .filter((e) => delete e.type)
              .filter((e) => delete e.index)}
            id={id}
            name="Modpack"
          />
        );

      case "Mode":
        return (
          <DropDown
            addFetureFilterDropDown={addFetureFilterDropDown}
            selected={featureFilterDropDown
              .filter((item) => item.id === id)
              .filter((e) => delete e.id)
              .filter((e) => delete e.type)
              .filter((e) => delete e.index)}
            id={id}
            name="Mode"
          />
        );

      case "Type":
        return (
          <DropDown
            addFetureFilterDropDown={addFetureFilterDropDown}
            selected={featureFilterDropDown
              .filter((item) => item.id === id)
              .filter((e) => delete e.id)
              .filter((e) => delete e.type)
              .filter((e) => delete e.index)}
            id={id}
            name="Type"
          />
        );

      case "Map Size":
        return (
          <FromTo
            addFetureFilterFromTo={addFetureFilterFromTo}
            value={featureFilterFromTo.filter((item) => item.id === id)}
            id={id}
            name="Map Size"
          />
        );

      case "Rocket Plugins":
        return (
          <DropDown
            addFetureFilterDropDown={addFetureFilterDropDown}
            selected={featureFilterDropDown
              .filter((item) => item.id === id)
              .filter((e) => delete e.id)
              .filter((e) => delete e.type)
              .filter((e) => delete e.index)}
            id={id}
            name="Rocket Plugins"
          />
        );

      case "Workshop Content":
        return (
          <DropDown
            addFetureFilterDropDown={addFetureFilterDropDown}
            selected={featureFilterDropDown
              .filter((item) => item.id === id)
              .filter((e) => delete e.id)
              .filter((e) => delete e.type)
              .filter((e) => delete e.index)}
            id={id}
            name="Workshop Content"
          />
        );

      case "Clan Size":
        return (
          <FromTo
            addFetureFilterFromTo={addFetureFilterFromTo}
            id={id}
            name="Clan Size"
          />
        );

      default:
    }
  };
  const ChangeGame = (e) => {
    if (e === "") {
      setGameFeature([]);
      setGameFeature1([]);
      setGameFeature2([]);
    } else {
      setGameFeature([]);
      setGameFeature1([]);
      setGameFeature2([]);
      setGame(e);
      axios
        .get("https://api.battlemetrics.com/game-features?filter[game]=" + e)
        .then((res) => {
          // console.log(res.data.data);
          setGameFeature(
            <div class="game-features row">
              {res.data.data
                .slice(0, 3)
                .map((e) => whichFeature(e.attributes.display, e.id))}
            </div>
          );
          setGameFeature1(
            <div class="game-features row">
              {res.data.data
                .slice(3, 6)
                .map((e) => whichFeature(e.attributes.display, e.id))}
            </div>
          );
          setGameFeature2(
            <div class="game-features row">
              {res.data.data
                .slice(6, 9)
                .map((e) => whichFeature(e.attributes.display, e.id))}
            </div>
          );
        });
    }
  };
  useEffect(() => {
    if (props.searchingQuery) {
      var countreisStr = "";
      if (selectedOption) {
        selectedOption.forEach((element, index) => {
          countreisStr +=
            "&filter[server][countries][" + index + "]=" + element.value;
        });
      }
      var TFmode = "";
      featureFilter.forEach((e, i) => {
        TFmode += "&filter[server][features][" + e.id + "]=" + e.value;
      });
      var dropsDown = "";
      var checked = [];
      featureFilterDropDown.forEach((e, i) => {
        if (!checked.includes(e.id)) {
          checked.push(e.id);
          var filterData = featureFilterDropDown.filter(
            (obj) => obj.id === e.id
          );
          filterData.forEach((element, index) => {
            dropsDown +=
              "&filter[server][features][" +
              element.id +
              "][" +
              element.type +
              "][" +
              index +
              "]=" +
              element.value;
          });
        }
      });
      var fromTo = "";
      featureFilterFromTo.forEach((element, index) => {
        if (element.from != null) {
          fromTo +=
            "&filter[server][features][" +
            element.id +
            "]=" +
            element.from +
            ":" +
            element.to;
        }
      });
      var query =
        (name ? "&filter[server][search]=" + name : "") +
        (game ? "&filter[server][game]=" + game : "") +
        (serverStatus ? "&filter[server][status]=" + serverStatus : "") +
        (minPlayers ? "&filter[server][players][min]=" + minPlayers : "") +
        (maxPlayers ? "&filter[server][players][max]=" + maxPlayers : "") +
        (maxDistance ? "&filter[server][maxDistance]=" + maxDistance : "") +
        countreisStr +
        TFmode +
        dropsDown +
        fromTo;
      props.searchingQuery(query);
    }
  }, [
    selectedOption,
    featureFilter,
    featureFilterDropDown,
    featureFilterFromTo,
    maxDistance,
    maxPlayers,
    minPlayers,
    serverStatus,
    game,
    name,
  ]);
  const searchServers = (e) => {
    if (e !== "e") {
      e.preventDefault();
    }
    var countreisStr = "";
    if (selectedOption) {
      selectedOption.forEach((element, index) => {
        countreisStr += "&filter[countries][" + index + "]=" + element.value;
      });
    }

    var TFmode = "";
    featureFilter.forEach((e, i) => {
      TFmode += "&filter[features][" + e.id + "]=" + e.value;
    });
    var dropsDown = "";
    var checked = [];
    featureFilterDropDown.forEach((e, i) => {
      if (!checked.includes(e.id)) {
        checked.push(e.id);
        var filterData = featureFilterDropDown.filter((obj) => obj.id === e.id);
        filterData.forEach((element, index) => {
          dropsDown +=
            "&filter[features][" +
            element.id +
            "][" +
            element.type +
            "][" +
            index +
            "]=" +
            element.value;
        });
      }
    });
    var fromTo = "";
    featureFilterFromTo.forEach((element, index) => {
      if (element.from != null) {
        fromTo +=
          "&filter[features][" +
          element.id +
          "]=" +
          element.from +
          ":" +
          element.to;
      }
    });
    axios
      .get(
        "https://api.battlemetrics.com/servers?fields[server]=rank,name,players,maxPlayers,address,ip,port,country,location,details,status&sort=rank&relations[server]=game,serverGroup" +
          (name ? "&filter[search]=" + name : "") +
          (game ? "&filter[game]=" + game : "") +
          (serverStatus ? "&filter[status]=" + serverStatus : "") +
          (minPlayers ? "&filter[players][min]=" + minPlayers : "") +
          (maxPlayers ? "&filter[players][max]=" + maxPlayers : "") +
          (maxDistance ? "&filter[maxDistance]=" + maxDistance : "") +
          countreisStr +
          TFmode +
          dropsDown +
          fromTo
      )
      .then((e) => {
        props.callback(
          e.data.data,
          {
            name: name,
            game: game,
            serverStatus: serverStatus,
            minPlayers: minPlayers,
            maxPlayers: maxPlayers,
            maxDistance: maxDistance,
            selectedOption: selectedOption,
            featureFilter: featureFilter,
            featureFilterDropDown: featureFilterDropDown,
            featureFilterFromTo: featureFilterFromTo,
          },
          e.data.links.next,
          e.data.links.prev
        );
      });
  };
  useEffect(() => {
    if (props.game) {
      ChangeGame(props.game);
    }
    if (props.filters) {
      setName(props.filters.name);
      ChangeGame(props.filters.game);
      setServerStatus(props.filters.serverStatus);
      setMinPlayers(props.filters.minPlayers);
      setMaxPlayers(props.filters.maxPlayers);
      setMaxDistance(props.filters.maxDistance);
      setSelectedOption(props.filters.selectedOption);
      if (props.filters.featureFilter) {
        props.filters.featureFilter.forEach((element) => {
          featureFilter.push({ id: element.id, value: element.value });
        });
        setFeatureFilter(featureFilter);
      }
      if (props.filters.featureFilterDropDown) {
        props.filters.featureFilterDropDown.forEach((element) => {
          featureFilterDropDown.push({
            id: element.id,
            label: element.label,
            value: element.value,
            type: element.type,
            index: element.index,
          });
        });
        setFeatureFilterDropDown(featureFilterDropDown);
      }
      if (props.filters.featureFilterFromTo) {
        props.filters.featureFilterFromTo.forEach((element) => {
          featureFilterFromTo.push({
            id: element.id,
            from: element.from,
            to: element.to,
          });
        });
        setFeatureFilterFromTo(featureFilterFromTo);
      }
    }
  }, []);
  return (
    <form className="advanced-search" onSubmit={(e) => searchServers(e)}>
      <div className="css-k19prh">
        <div className="css-1rth6vi">
          <div className="form-group">
            <label htmlFor="input-q">
              <span>
                Search <i className="glyphicon glyphicon-question-sign" />
              </span>
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              name="q"
              id="input-q"
              type="text"
              className="form-control"
              label="[object Object]"
            />
          </div>
        </div>
        <div
          className="css-1tws66a"
          style={{ display: props.details ? "none" : "" }}
        >
          <div className="form-group">
            <label htmlFor="input-game">
              <span>
                Game <i className="glyphicon glyphicon-question-sign" />
              </span>
            </label>
            <select
              onChange={(e) => ChangeGame(e.target.value)}
              value={game}
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
              <option value="csgo">Counter-Strike: Global Offensive</option>
              <option value="css">Counter-Strike: Source</option>
              <option value="dnl">Dark and Light</option>
              <option value="dayz">DayZ</option>
              <option value="gmod">Garry's Mod</option>
              <option value="hll">Hell Let Loose</option>
              <option value="insurgency">Insurgency</option>
              <option value="sandstorm">Insurgency: Sandstorm</option>
              <option value="minecraft">Minecraft</option>
              <option value="mordhau">MORDHAU</option>
              <option value="moe">Myth of Empires</option>
              <option value="pixark">PixARK</option>
              <option value="postscriptum">Post Scriptum</option>
              <option value="zomboid">Project Zomboid</option>
              <option value="rend">Rend</option>
              <option value="rs2vietnam">Rising Storm 2: Vietnam</option>
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
              className={
                serverStatus === "offline,dead,invalid"
                  ? "css-nj0g27"
                  : "css-jr2coq"
              }
              onClick={(e) => setServerStatus("offline,dead,invalid")}
            >
              <i className="glyphicon glyphicon-remove" />
            </button>
            <button
              type="button"
              value="null"
              className="css-12u7yum"
              onClick={(e) => setServerStatus(null)}
            >
              <i className="glyphicon glyphicon-asterisk" />
            </button>
            <button
              type="button"
              value="true"
              className={
                serverStatus === "online" ? "css-1d86i1s" : "css-pg6z3l"
              }
              onClick={(e) => setServerStatus("online")}
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
                onChange={(e) => setMinPlayers(e.target.value)}
                value={minPlayers}
                type="number"
                placeholder={0}
                className="form-control"
                name="minPlayers"
              />
            </div>
            <div className="css-o9ndhe">to</div>
            <div>
              <input
                onChange={(e) => setMaxPlayers(e.target.value)}
                value={maxPlayers}
                type="number"
                placeholder="∞"
                className="form-control"
                name="maxPlayers"
              />
            </div>
          </div>
        </div>
        <div className="form-group css-uf32pv">
          <label htmlFor="max-distance">Max Distance</label>
          <div className="input-group">
            <input
              onChange={(e) => setMaxDistance(e.target.value)}
              value={maxDistance}
              name="maxDistance"
              id="max-distance"
              type="number"
              min={0}
              placeholder="∞"
              className="form-control"
            />
            <span className="input-group-addon">km</span>
          </div>
        </div>
        <div className="form-group css-94r04m">
          <div>
            <label htmlFor="countries">Countries</label>
          </div>
          <Select
            name="countreis"
            onChange={handleChange}
            value={selectedOption}
            components={{
              Option,
              ValueContainer,
              Control,
            }}
            menuIsOpen={focus}
            options={Countries}
            isMulti
            isSearchable
            styles={DropDownStyle}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            allowSelectAll={true}
          />
        </div>
      </div>
      {gameFeature}
      {gameFeature1}
      {gameFeature2}
      {props.dontShowSearch ? (
        <></>
      ) : (
        <button type="submit" className="css-1dcotcn">
          Search
        </button>
      )}
    </form>
  );
};
export default SearchForm;

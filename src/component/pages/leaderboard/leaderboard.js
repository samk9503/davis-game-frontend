import React, { useEffect, useState } from "react";
import axios from "axios";
const Leaderboard = () => {
  const [players, setPlayers] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [stopDate, setStopDate] = useState(null);
  useEffect(() => {
    const getData = () => {
      console.log("startDate", new Date(startDate));
      console.log("stopDate", new Date(startDate));
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
          "https://api.battlemetrics.com/servers/3824982/relationships/leaderboards/time?page[size]=50&filter[period]=" +
            start +
            ":" +
            stop
        )
        .then((res) => {
          console.log(res.data.data);
          setPlayers(
            res.data.data.map((e) => (
              <tr>
                <td style={{ width: 16 }}>{e.attributes.rank}</td>
                <td className="player">
                  <a className="player-name" href="/players/1085577556">
                    {e.attributes.name}
                  </a>
                </td>
                <td>
                  <time dateTime="PT66H14M27S" title="PT66H14M27S" tz="UTC">
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
    getData();
  }, [startDate, stopDate]);

  return (
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
          <a itemProp="item" href="/servers/csgo/3824982/leaderboard">
            <span itemProp="name">Leaderboard</span>
          </a>
          <meta itemProp="position" content={4} />
        </li>
      </ol>
      <div className="container" id="main">
        <div className="main" id="ServerLeaderboardPage">
          <h1>
            Leaderboard{" "}
            <small>
              for [GFLClan.com] Zombie Escape 24/7 | Rank | Recruiting | NoBlock
            </small>
          </h1>
          <div className="css-18j87yw">
            <p className="lead">
              Searching leaderboards and custom time ranges are limited to
              BattleMetrics subscribers. These features are available with any
              plan.
            </p>
            <p>
              <a className="css-p9ht2a" href="/subscription">
                View Plans
              </a>
            </p>
          </div>
          <div className="row">
            <div className="col-md-6">
              <form>
                <h2 className="h4">Leaderboard Type</h2>
                <div className="form-group css-179a3wy">
                  <button
                    type="button"
                    className="active css-p0j53r"
                    data-type="range"
                  >
                    Time Range
                  </button>
                  <button type="button" className=" css-p0j53r" data-type="AT">
                    All Time
                  </button>
                </div>
                <div style={{ display: "block" }}>
                  <strong>Time Range</strong>
                  <div className="css-5r0azx">
                    <div className="form-group">
                      <label htmlFor="leaderboard-start">Start</label>{" "}
                      <input
                        id="leaderboard-start"
                        name="leaderboardStart"
                        className="form-control"
                        disabled
                        required
                        onChange={(e)=>{setStartDate(e.target.value)}}
                        placeholder="09/29/2022 12:14 PM"
                        defaultValue="08/30/2022 12:00 AM"
                      />
                      <p className="css-10ghuph">08/30/2022 12:00 AM</p>
                    </div>
                    <span className="css-enzl7f">to</span>
                    <div className="form-group">
                      <label htmlFor="leaderboard-stop">Stop</label>{" "}
                      <input
                        id="leaderboard-stop"
                        name="leaderboardStop"
                        className="form-control"
                        disabled
                        onChange={(e)=>{setStopDate(e.target.value)}}
                        placeholder="09/29/2022 12:14 PM"
                        defaultValue="09/29/2022 12:00 AM"
                      />
                      <p className="css-10ghuph">09/29/2022 12:00 AM</p>
                    </div>
                    <div className="form-group css-14f7wj6">
                      <label htmlFor="leaderboard-presets">Presets</label>
                      <select
                        id="leaderboard-presets"
                        className="form-control"
                        disabled
                      >
                        <option />
                        <optgroup label="Time Ranges">
                          <option value={7}>Past 7 Days</option>
                          <option value={14}>Past 14 Days</option>
                          <option value={30}>Past 30 Days</option>
                          <option value={60}>Past 60 Days</option>
                          <option value={90}>Past 90 Days</option>
                        </optgroup>
                        <optgroup label="History">
                          <option value="lastWeek">Last Week</option>
                          <option value="lastMonth">Last Month</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="input-player">Player Search</label>
                  <input
                    name="player"
                    id="input-player"
                    type="text"
                    className="form-control"
                    label="Player Search"
                    disabled
                  />
                </div>
                <button
                  type="submit"
                  className="css-1dcotcn"
                  onClick={(e) => e.preventDefault()}
                >
                  Update
                </button>
              </form>
            </div>
            <div className="col-md-6">
              <table className="css-5k1z86">
                <thead>
                  <tr>
                    <th className="rank">#</th>
                    <th className="player">Player</th>
                    <th className="value">Time</th>
                  </tr>
                </thead>
                <tbody>{players}</tbody>
              </table>
              <nav>
                <ul className="pager">
                  <li className="previous">
                    <a
                      rel="nofollow"
                      href="/servers/csgo/3824982/leaderboard?filter%5Bperiod%5D=2022-08-30T00%3A00%3A00.000Z%3A2022-09-29T00%3A00%3A00.000Z&page%5Boffset%5D=0&page%5Brel%5D=prev&page%5Bcount%5D=1&page%5Bsize%5D=50"
                    >
                      Previous
                    </a>
                  </li>
                  <li className="next">
                    <a
                      rel="nofollow"
                      href="/servers/csgo/3824982/leaderboard?filter%5Bperiod%5D=2022-08-30T00%3A00%3A00.000Z%3A2022-09-29T00%3A00%3A00.000Z&page%5Boffset%5D=100&page%5Brel%5D=next&page%5Bcount%5D=3&page%5Bsize%5D=50"
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
};
export default Leaderboard;

import React, { useEffect, useState } from "react";
import moment from "moment";

const PlayerCard = (props) => {
  var serverDara = props.serverData.filter(
    (a) => a.id == props.props.relationships.servers.data[0].id
  )[0];
  const secondsToHms = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var hDisplay = h > 0 ? h : "00";
    var mDisplay = m > 0 ? m : "00";
    return hDisplay + ":" + mDisplay;
  };
  const format = (timeStamp) => {
    var date = new Date(timeStamp);
    var format =
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      ("0" + date.getDate()).slice(-2) +
      "/" +
      ("20" + date.getFullYear()).slice(-4) +
      " " +
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2) +
      (date.getUTCHours() >= 12 ? " PM" : " AM");
    return format;
  };
  return props.server ? (
    <li className="with-servers">
      <p>
        <a className="player-name css-zwebxb" href="/players/895052861">
          {props.props.attributes.name}
        </a>
      </p>
      <table className="css-1yjs8zt">
        <thead>
          <tr>
            <th className="game-logo" />
            <th className="online-status" />
            <th>Server</th>
            <th>Time Played</th>
            <th>First Seen</th>
            <th>Last Seen</th>
          </tr>
        </thead>
        <tbody>
          <tr className="server">
            <td className="game-logo server-game">
              <img
                src={
                  props.apiData +
                  "/storage/images/" +
                  serverDara.relationships.game.data.id +
                  ".png"
                }
                width={24}
                height={24}
                alt="Counter-Strike: Global Offensive"
              />
            </td>
            <td className="online-status" data-title="Online:">
              <div className="css-k1knfq" />{" "}
              <span className="visible-sm-inline visible-xs-inline">
                Online
              </span>
            </td>
            <td className="server-name">
              <a href={"/servers/csgo/" + serverDara.id}>
                {serverDara.attributes.name}
              </a>
            </td>
            <td data-title="Time Played">
              <time dateTime="PT19H33M12S" title="PT19H33M12S" tz="UTC">
                {secondsToHms(
                  props.props.relationships.servers.data[0].meta.timePlayed
                )}
              </time>
            </td>
            <td data-title="First Seen">
              <time
                dateTime={
                  props.props.relationships.servers.data[0].meta.firstSeen
                }
                title={new Date(
                  props.props.relationships.servers.data[0].meta.firstSeen
                ).toString()}
              >
                {format(
                  props.props.relationships.servers.data[0].meta.firstSeen
                )}
              </time>
              <br />
              <time
                dateTime="2020-02-29T20:48:31.404Z"
                title="Saturday, February 29, 2020 8:48 PM"
                className="small text-muted"
              >
                {moment(
                  props.props.relationships.servers.data[0].meta.firstSeen
                ).fromNow()}
              </time>
            </td>
            <td data-title="Last Seen">
              <time
                dateTime={
                  props.props.relationships.servers.data[0].meta.lastSeen
                }
                title={
                  new Date(
                    props.props.relationships.servers.data[0].meta.lastSeen
                  )
                }
              >
                {format(
                  props.props.relationships.servers.data[0].meta.lastSeen
                )}
              </time>
              <br />
              <time
                dateTime="2022-10-05T14:00:04.166Z"
                title="Wednesday, October 5, 2022 2:00 PM"
                className="small text-muted"
              >
                {moment(
                  props.props.relationships.servers.data[0].meta.lastSeen
                ).fromNow()}
              </time>
            </td>
          </tr>
        </tbody>
      </table>
    </li>
  ) : (
    <li className="no-servers">
      <a className="player-name css-zwebxb" href={"/players/" + props.props.id}>
        {props.props.attributes.name}
      </a>
    </li>
  );
};
export default PlayerCard;

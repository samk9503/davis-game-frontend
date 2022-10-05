import getDistance from "geolib/es/getDistance";
import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import moment from "moment";

const ServerCard = (x) => {
  const [distance, setDistance] = useState(0);
  const [country, setCountry] = useState("");
  const [address, setAdders] = useState("");
  var props = x.props.attributes;
  function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }
  useEffect(() => {
    setCountry(props.country);
    setDistance(
      Math.ceil(
        getDistance(
          {
            longitude: x.location.location[0],
            latitude: x.location.location[1],
          },
          { longitude: props.location[0], latitude: props.location[1] }
        ) *
          0.000621 *
          1.6
      )
    );

    if (x.gameId === "vrising") {
      var date = new Date(props.details.vrising_wipe_detected);
      var dateNow = new Date();
      var dateFormat =
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "/" +
        ("0" + date.getDate()).slice(-2) +
        "/" +
        ("0" + date.getFullYear()).slice(-2) +
        (getDifferenceInDays(date, dateNow) > 10
          ? ""
          : " " +
            ("0" + date.getHours()).slice(-2) +
            ":" +
            ("0" + date.getMinutes()).slice(-2) +
            (date.getHours() >= 12 ? " PM" : " AM"));
    }
    setAdders(
      x.gameId === "rust" ? (
        <span> {moment(props.details.rust_last_ent_drop).fromNow()}</span>
      ) : x.gameId == "ark" ? (
        <span>{props.details.time}</span>
      ) : x.gameId === "moe" ? (
        <span>{props.address + ":" + props.port}</span>
      ) : x.gameId === "vrising" ? (
        props.details.vrising_wipe_detected ? (
          <>
            {getDifferenceInDays(date, dateNow) > 10 ? (
              <></>
            ) : (
              <span style={{ display: "block" }}>
                {moment(props.details.vrising_wipe_detected).fromNow()}
              </span>
            )}
            <span>{dateFormat}</span>
          </>
        ) : (
          <span>Unknown</span>
        )
      ) : (
        <span>{props.ip + ":" + props.port}</span>
      )
    );
  }, []);
  return (
    <tr className="css-1qz5fdd">
      <td className="css-1apwfya">
        <div className="css-dfjmka">
          <img
            src={x.image}
            width={24}
            height={24}
            alt="Counter-Strike: Global Offensive"
          />
        </div>
      </td>
      <td data-title="Rank">#{props.rank}</td>
      <td className="css-1su1bxu">
        <a title={props.name} href={"/servers/" + x.gameId + "/" + x.props.id}>
          {props.name}
        </a>
        <div>
          {props.details.map ? (
            <span className="css-1p2l8fy">Map: {props.details.map}</span>
          ) : (
            <span className="css-1p2l8fy"></span>
          )}
        </div>
      </td>
      <td data-title="Players">
        {props.players}/{props.maxPlayers}
      </td>
      <td data-title="Address">{address}</td>
      <td data-title="Location">
        <ReactCountryFlag
          countryCode={country}
          style={{
            width: "16px",
            height: "11px",
          }}
          svg
          cdnSuffix="svg"
          title="US"
        />{" "}
        <span>{distance} km</span>
      </td>
    </tr>
  );
};
export default ServerCard;

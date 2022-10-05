import React from "react";
const ServerCardB = (props) => {
  const data = props.props;
  return (
    <div className="css-ov1ktg">
      <div className="checkbox css-v7bl7f">
        <label htmlFor={"server-" + data.id}>
          <input type="radio" id={"server-" + data.id} defaultValue={data.id} />{" "}
          <img
            src={props.imgURL}
            width={24}
            height={24}
            alt={data.attributes.name}
          />{" "}
          <span title={data.attributes.name} className="css-j2pdx7">
            {data.attributes.name}
          </span>
        </label>
      </div>
      <a className="css-ttyfbn" href={"/servers/gmod/" + data.id}>
        Server page
      </a>
    </div>
  );
};
export default ServerCardB;

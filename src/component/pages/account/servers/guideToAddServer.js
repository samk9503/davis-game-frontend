import React, { useState } from "react";
const GuideToAddServer = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={isOpen ? { maxHeight: "250px", overflowY: "scroll" } : {}}>
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
          Guide To Add Server
        </span>
      </button>
      <div className="collapse in" style={{ display: isOpen ? "" : "none" }}>
        <p> 1.search for your server:</p>
        <img
          src={props.storage + "/storage/images/guideServer1.jpg"}
          height="200"
          width="450"
        />
        <p style={{fontSize:"18px",padding:"5px 0"}}> 2.choose your server:</p>
        <img
          src={props.storage + "/storage/images/guideServer2.jpg"}
          height="100"
          width="400"
        />
        <p style={{fontSize:"18px",padding:"5px 0"}}> 3.you will find the server id in the URL:</p>
        <img
          src={props.storage + "/storage/images/guideServer3.jpg"}
          height="200"
          width="200"
        />
        <p style={{fontSize:"18px",padding:"5px 0"}}> 4.copy and paste it here:</p>
      </div>
    </div>
  );
};
export default GuideToAddServer;

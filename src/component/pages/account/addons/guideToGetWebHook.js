import React, { useState } from "react";
const GuideToAddWebHook = (props) => {
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
          Guide To Get WebHook
        </span>
      </button>
      <div className="collapse in" style={{ display: isOpen ? "" : "none" }}>
        <p> 1.tap on edit channel:</p>
        <img
          src={props.storage + "/storage/images/webhookGuide1.jpg"}
          style={{ maxWidth: "-webkit-fill-available" }}
        />
        <p style={{ fontSize: "18px", padding: "5px 0" }}>
          {" "}
          2.choose integrations:
        </p>
        <img
          src={props.storage + "/storage/images/webhookGuide2.jpg"}
          style={{ maxWidth: "-webkit-fill-available" }}
        />
        <p style={{ fontSize: "18px", padding: "5px 0" }}>
          {" "}
          3.tap on create webhook:
        </p>
        <img
          src={props.storage + "/storage/images/webhookGuide3.jpg"}
          style={{ maxWidth: "-webkit-fill-available" }}
        />
        <p style={{ fontSize: "18px", padding: "5px 0" }}>
          {" "}
          4.tap on copy webhook url:
        </p>
        <img
          src={props.storage + "/storage/images/webhookGuide4.jpg"}
          style={{ maxWidth: "-webkit-fill-available" }}
        />
        <p style={{ fontSize: "18px", padding: "5px 0" }}> 5.paste it here:</p>
      </div>
    </div>
  );
};
export default GuideToAddWebHook;

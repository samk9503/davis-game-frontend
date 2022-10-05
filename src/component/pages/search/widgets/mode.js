import React,{ useEffect, useState } from "react";

const Mode = (props) => {
  const [mode, setMode] = useState(
    props.value
      ? props.value.length > 0
        ? props.value[0].value
        : "null"
      : "null"
  );
  return (
    <div className="col-md-4">
      <div className="form-group">
        <div>
          <strong className="css-iiypcb">{props.name}</strong>
        </div>
        <div className="css-179a3wy">
          <button
            type="button"
            value="false"
            className={mode == "false" ? "css-nj0g27" : "css-jr2coq"}
            onClick={(e) => {
              props.addFetureFilter(props.id, "false");
              setMode("false");
            }}
          >
            <i className="glyphicon glyphicon-remove" />
          </button>
          <button
            type="button"
            value="null"
            className="css-12u7yum"
            onClick={(e) => {
              setMode("null");
              props.addFetureFilter(props.id, "null");
            }}
          >
            <i className="glyphicon glyphicon-asterisk" />
          </button>
          <button
            type="button"
            value="true"
            className={mode == "true" ? "css-1d86i1s" : "css-pg6z3l"}
            onClick={(e) => {
              setMode("true");
              props.addFetureFilter(props.id, "true");
            }}
          >
            <i className="glyphicon glyphicon-ok" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Mode;

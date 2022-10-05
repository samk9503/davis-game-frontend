import React,{ useEffect, useState } from "react";

const FromTo = (props) => {
  const [from, setFrom] = useState(
    props.value ? (props.value.length > 0 ? props.value[0].from : null) : null
  );
  const [to, setTo] = useState(
    props.value ? (props.value.length > 0 ? props.value[0].to : null) : null
  );
  useEffect(() => {
    props.addFetureFilterFromTo(props.id, { from: from, to: to });
  }, [from, to]);
  return (
    <div className="form-group css-q4oe17">
      <div className="feature-header">
        <strong className="css-iiypcb">{props.name}</strong>
      </div>
      <div className="css-amj929">
        <div>
          <input
            onChange={(e) => setFrom(e.target.value)}
            value={from}
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
            onChange={(e) => setTo(e.target.value)}
            value={to}
            type="number"
            placeholder="∞"
            className="form-control"
            name="maxPlayers"
            defaultValue=""
          />
        </div>
      </div>
    </div>
  );
};
export default FromTo;

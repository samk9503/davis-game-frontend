import React from "react";

const TopTaples = (props) => {
  return (
    <table className="css-5k1z86">
        {props.top?(<thead>
            <tr>
                <th>Country</th>
                <th>{props.players?"Players":"Servers"}</th>
            </tr>
        </thead>):(<></>)}
      <tbody>
        {props.props.map((e) => (
          <tr>
            <th>{e.name}</th>
            <td>{e.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default TopTaples;

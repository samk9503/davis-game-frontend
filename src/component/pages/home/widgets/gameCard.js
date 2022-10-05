import React from "react";
const GameCard=props=>{
    return (
    <a className="css-52z428" href={"/servers/"+props.smallName}>
      <img src={props.imgUrl} width="208" height="97" alt={props.name} className="css-1qnf57e" />
    </a>
    );
}
export default GameCard;
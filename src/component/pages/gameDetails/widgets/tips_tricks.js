import React, { useState } from "react";
const TipsTricks = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
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
          Tips and Tricks
        </span>
      </button>
      <div className="collapse in" style={{ display: isOpen ? "" : "none" }}>
        <h2 className="h3">Tips and Tricks</h2>
        <p>
          {" "}
          Below you will find a list of the best / most popular servers in the
          world. The list includes the server rank, name, player count, location
          (distance from your computer), and other game-specific information.
        </p>
        <p>
          {" "}
          Server rank is based on the objective popularity of a server. We
          calculate rank based on the amount of time players have spent on the
          server in the preceding seven (7) days. Ranks are re-caculated daily
          at 01:00 UTC. We do not take player votes or any other factor into
          account.
        </p>
        <p>
          {" "}
          The "NR" rank means that a server is suspected of botting, inflating,
          or otherwise distorting its real player count. These servers are
          hidden from the server list by default but can appear in your
          term-specific searches. We advise avoiding these servers for your
          safety.
        </p>
        <p>
          {" "}
          When performing server searches, we recommend wrapping terms with
          quotes " " to return exact matches.
        </p>
        <p>
          {" "}
          The server status buttons allow you to filter between offline (red
          "x"), online (green "check"), or both (gray "asterisk").
        </p>
        <p>
          {" "}
          Using the "Players" filter, you can set a minimum or maximum number of
          players you want the server to have.
        </p>
        <p>
          {" "}
          The "Max Distance" filter allows you to set a limit on how far away
          the server is from your location. We use a GeoIP database to determine
          both the server's physical location as well as your location. This is
          a useful approximation for how low your latency / ping to the server
          should be. Most games do not provide ping information via the query
          protocol, so our "Max Distance" filter should provide you with a good
          approximation. You can also use this to help you locate more regional
          servers.
        </p>
        <p>
          {" "}
          The "Countries" filter allow you to search based on what country we
          think the server is in. At the moment, this is a whitelist search
          only, so you'll have to select the countries you want to play in.{" "}
        </p>
      </div>
    </div>
  );
};
export default TipsTricks;

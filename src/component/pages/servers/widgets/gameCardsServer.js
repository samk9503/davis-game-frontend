import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const GameCardServer = (props) => {
  const [valuesServer, setValuesServer] = useState(null);
  const [valuesPlayers, setValuesplayer] = useState(null);
  const [dataServer, setDataServer] = useState(null);
  const [dataPlayers, setDataPlayers] = useState(null);
  const [optionsServer, setOptionsServer] = useState(null);
  const [optionsPlayer, setOptionsPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (valuesServer != null) {
      setDataServer({
        labels: valuesServer,
        datasets: [
          {
            data: valuesServer,
            fill: false,
            borderWidth: 1.7,
            backgroundColor: "rgb(21, 21, 21)",
            borderColor: "#ff0700",
          },
        ],
      });
      setDataPlayers({
        labels: valuesPlayers,
        datasets: [
          {
            data: valuesPlayers,
            fill: false,
            borderWidth: 1.7,
            backgroundColor: "rgb(21, 21, 21)",
            borderColor: "#ff0700",
          },
        ],
      });
      setOptionsServer({
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },

        elements: {
          point: {
            radius: 0,
          },
        },
        showTooltips: false,
        scales: {
          yAxes: {
            min: Math.min(...valuesServer),
            max: Math.max(...valuesServer) + 1,
            scaleLabel: {
              display: false,
            },
            grid: {
              display: false,
            },
            ticks: {
              display: false, // it should work
            },
          },
          xAxes: {
            scaleLabel: {
              display: false,
            },
            grid: {
              display: false,
            },
            ticks: {
              display: false, // it should work
            },
          },
        },
      });
      setOptionsPlayer({
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        showTooltips: false,
        scales: {
          yAxes: {
            min: Math.min(...valuesPlayers),
            max: Math.max(...valuesPlayers) + 10,
            scaleLabel: {
              display: false,
            },
            grid: {
              display: false,
            },
            ticks: {
              display: false, // it should work
            },
          },

          xAxes: {
            scaleLabel: {
              display: false,
            },
            grid: {
              display: false,
            },
            ticks: {
              display: false, // it should work
            },
          },
        },
      });
      setLoading(false);
    }
  }, [valuesServer, valuesPlayers]);
  useEffect(() => {
    const getData = () => {
      setTimeout(() => {
        var valueS = [];
        var valueP = [];
        props.chartsV
          .filter(
            (item) =>
              item.attributes.name == "games." + props.id + ".servers.online"
          )
          .sort((a, b) =>
            b.attributes.timestamp.localeCompare(a.attributes.timestamp)
          )
          .reverse()
          .forEach((element) => {
            valueS.push(parseInt(element.attributes.value));
          });
        setValuesServer(valueS);
        props.chartsV
          .filter(
            (item) => item.attributes.name == "games." + props.id + ".players"
          )
          .sort((a, b) =>
            b.attributes.timestamp.localeCompare(a.attributes.timestamp)
          )
          .reverse()
          .forEach((element) => {
            valueP.push(parseInt(element.attributes.value));
          });
        setValuesplayer(valueP);
      }, 1000);
    };
    getData();
  }, []);
  return (
    <tr>
      <td style={{ width: 30 }}>
        <img src={props.imgUrl} width={24} height={24} alt={props.name} />
      </td>
      <td>
        <a href={"/servers/" + props.id}>{props.name}</a>
      </td>
      <td className="players">
        {props.players + " "}
        <a className="stats-chart" href={"/servers/" + props.id + "/stats"}>
          <div className="css-18xbe34">
            {loading ? (
              <></>
            ) : (
              <Line data={dataPlayers} options={optionsPlayer} />
            )}
          </div>
        </a>
      </td>
      <td className="servers">
        {props.servers + " "}
        <a className="stats-chart" href={"/servers/" + props.id + "/stats"}>
          <div className="css-18xbe34">
            {loading ? (
              <></>
            ) : (
              <Line data={dataServer} options={optionsServer} />
            )}
          </div>
        </a>
      </td>
      <td style={{ width: 48 }}>
        <a href={"/servers/" + props.id + "/stats"}>Stats</a>
      </td>
    </tr>
  );
};
export default GameCardServer;

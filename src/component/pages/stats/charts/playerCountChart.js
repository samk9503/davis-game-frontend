import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Loading from "../../../widgets/loading";
ChartJS.register(
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const PlayerCountChart = (props) => {
  const [valuesServer, setValuesServer] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataServer, setDataServer] = useState(null);
  const [optionsServer, setOptionsServer] = useState(null);
  const [days, setDays] = useState(30);

  useEffect(() => {
    const getData = () => {
      var now = new Date();
      var stop =
        now.getUTCFullYear() +
        "-" +
        ("0" + (now.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + now.getUTCDate()).slice(-2) +
        "T" +
        ("0" + now.getUTCHours()).slice(-2) +
        ":" +
        ("0" + now.getUTCMinutes()).slice(-2) +
        ":00.000Z";

      var howManyDays = days * 24 * 60 * 60 * 1000;
      var beforeVDAY = new Date(now.getTime() - howManyDays);
      var start =
        beforeVDAY.getUTCFullYear() +
        "-" +
        ("0" + (beforeVDAY.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + beforeVDAY.getUTCDate()).slice(-2) +
        "T" +
        ("0" + beforeVDAY.getUTCHours()).slice(-2) +
        ":" +
        ("0" + beforeVDAY.getUTCMinutes()).slice(-2) +
        ":00.000Z";
      axios
        .get(
          "https://api.battlemetrics.com/metrics?metrics[0][name]=games." +
            props.id +
            ".players&metrics[0][range]=" +
            start +
            ":" +
            stop +
            "&metrics[0][resolution]=60"
        )
        .then((res) => {
          var data = [];
          var labels = [];

          res.data.data.forEach((element) => {
            switch (props.url) {
              case "rank-history":
                data.push(parseInt(element.attributes.value));
              case "time-played-history":
                let hours = Math.floor(element.attributes.value / 3600);
                data.push(parseInt(hours));
            }
            labels.push(
              element.attributes.timestamp
                .slice(0, -14)
                .replace("-", "/")
                .replace("-", "/")
            );
          });
          setValuesServer(data);
          setLabels(labels);
        });
    };
    getData();
  }, [days]);
  useEffect(() => {
    if (valuesServer.length > 0) {
      setDataServer({
        labels: labels,
        datasets: [
          {
            data: valuesServer,
            fill: true,
            borderWidth: 4,
            backgroundColor: "rgba(255, 10, 13, 0.1)",
            borderColor: "#ff0700",
            fill: "start",
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
            radius: 3,
          },
        },
        showTooltips: false,
        scales: {
          yAxes: {
            reverse: props.url == "rank-history" ? true : false,
            min:
              props.url == "rank-history"
                ? Math.min(...valuesServer)
                : Math.min(...valuesServer) - Math.max(...valuesServer) * 0.05,
            max:
              props.url == "rank-history"
                ? Math.max(...valuesServer)
                : Math.max(...valuesServer) + Math.max(...valuesServer) * 0.05,

            scaleLabel: {
              display: false,
            },
            grid: {
              display: true,
              color: "#555",
              drawBorder: true,
              borderDash: [3, 1],
            },
            ticks: {
              display: true,
              autoSkip: true,
              color: "white",
              min: 1,
              stepSize:
                props.url == "rank-history"
                  ? Math.max(...valuesServer) * 0.4
                  : Math.max(...valuesServer) * 0.1,
              font: {
                size: 8,
                weight: "50",
                lineHeight: 0,
              },
            },
          },
          xAxes: {
            scaleLabel: {
              display: false,
            },
            grid: {
              display: true,
              color: "#555",
              drawBorder: true,
              borderDash: [2, 1],
            },
            ticks: {
              labelOffset: +22,
              font: {
                size: 8,
                weight: "50",
                lineHeight: 0,
              },
              display: true,
              autoSkip: true,
              maxTicksLimit: 6,
              color: "white",
              minRotation: 0,
              maxRotation: 0,
            },
          },
        },
      });
      setLoading(false);
    }
  }, [valuesServer]);
  return loading ? (
    <Loading />
  ) : (
    <div className="col-md-6">
      <h4>
        {props.title + " "}
        <div className="timeseries-range css-6rhxv9">
          <a
            rel="nofollow"
            className={"css-p0j53r " + (days === 7 ? "active" : "")}
            href="/servers/minecraft/6446791?groupRank=7D"
            onClick={(e) => {
              e.preventDefault();
              setDays(7);
            }}
          >
            7D
          </a>
          <a
            rel="nofollow"
            className={"css-p0j53r " + (days === 30 ? "active" : "")}
            href="/servers/minecraft/6446791?groupRank=1M"
            onClick={(e) => {
              e.preventDefault();
              setDays(30);
            }}
          >
            1M
          </a>
          <a
            rel="nofollow"
            className={"css-p0j53r " + (days === 90 ? "active" : "")}
            href="/servers/minecraft/6446791?groupRank=3M"
            onClick={(e) => {
              e.preventDefault();
              setDays(90);
            }}
          >
            3M
          </a>
        </div>
      </h4>
      <div className="css-cssveg">
        <Line data={dataServer} options={optionsServer} />
      </div>
    </div>
  );
};
export default PlayerCountChart;

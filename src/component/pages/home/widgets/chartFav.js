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
const ChartFav = (props) => {
  const [valuesServer, setValuesServer] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataServer, setDataServer] = useState(null);
  const [optionsServer, setOptionsServer] = useState(null);

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
      var howManyDays = 1 * 1 * 60 * 60 * 1000;
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
          "https://api.battlemetrics.com/servers/" +
            props.id +
            "/" +
            "player-count-history" +
            "?start=" +
            start +
            "&stop=" +
            stop
        )
        .then((res) => {
          var data = [];
          var labels = [];
          res.data.data.forEach((element) => {
            let hours = Math.floor(element.attributes.value);
            data.push(parseInt(hours));
            labels.push("");
          });
          setValuesServer(data);
          setLabels(labels);
        });
    };
    getData();
  }, []);
  useEffect(() => {
    if (valuesServer.length > 0) {
      setDataServer({
        labels: labels,
        datasets: [
          {
            data: valuesServer.reverse(),
            fill: true,
            borderWidth: 2,
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
            radius: 1,
          },
        },
        showTooltips: false,
        scales: {
          yAxes: {
            reverse: false,
            min: 0,
            max: props.max,

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
              min: 0,
              stepSize: props.max < 100 ? 10 : parseInt(props.max / 4),
              font: {
                size: 8,
                weight: "50",
                lineHeight: 0,
              },
              callback: function(label) {
                if (label != props.max) {
                  return `${this.getLabelForValue(label)}`;
                }else{
                    return ''
                }
              },
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
      <Line data={dataServer} options={optionsServer} width={'100%'} height={'100%'} />
  );
};
export default ChartFav;

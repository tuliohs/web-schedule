import React from "react";
import Chart from "chart.js";
import { getLineReview } from 'api/apiChart'

export default function CardLineChart({ avaiable = false }) {
  const [dados, setData] = React.useState([])

  React.useEffect(() => {
    const aa = async () => {
      await getLineReview()
        .then(c => {
          setData(c.data)
        }).catch(e => console.log("err", e))
    }
    aa()
  }, [])

  React.useEffect(() => {
    var config = {
      type: "line",
      data: {
        labels: dados.labels,
        datasets: dados.datasets,
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, [dados]);
  const relativeProp = !avaiable ? "" : "relative"
  return (
    <>
      <div className={relativeProp + "  flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-800"}>
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className={relativeProp + "  w-full max-w-full flex-grow flex-1"}>
              <h6 className="uppercase text-gray-200 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-white text-xl font-semibold">Revisions By Day</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className={relativeProp + " h-350-px"}>
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}

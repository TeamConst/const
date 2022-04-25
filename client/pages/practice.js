import { dehydrate, QueryClient, useQuery } from "react-query";
import { fetchOffer } from "../hooks";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { ResponsiveLine } from "@nivo/line";

const barColor = "#0095ff";
const lineColor = "rgba(200, 30, 15, 1)";
const areaColor = "#0095ff";

// `v` is used for bars
// `v1` is used for line
// `v2` is used for area
const gridXValues = [
  "1.1",
  "2.1",
  "3.1",
  "4.1",
  "5.1",
  "6.1",
  "7.1",
  "8.1",
  "9.1",
];

const data = [
  {
    id: "Class Average",
    data: [
      {
        x: "1.1",
        y: 0,
      },
      {
        x: "1.2",
        y: 0,
      },
      {
        x: "1.3",
        y: 0,
      },
      {
        x: "1.4",
        y: 0,
      },
      {
        x: "1.5",
        y: 0,
      },
      {
        x: "1.6",
        y: 0,
      },
      {
        x: "1.7",
        y: 0,
      },
      {
        x: "2.1",
        y: 0,
      },
      {
        x: "2.2",
        y: 0,
      },
      {
        x: "2.3",
        y: 0,
      },
      {
        x: "2.4",
        y: 0,
      },
      {
        x: "2.5",
        y: 0,
      },
      {
        x: "2.6",
        y: 0,
      },
      {
        x: "2.7",
        y: 0,
      },
      {
        x: "2.8",
        y: 0,
      },
      {
        x: "3.1",
        y: 0,
      },
      {
        x: "3.2",
        y: 0,
      },
      {
        x: "3.3",
        y: 0,
      },
      {
        x: "3.4",
        y: 0,
      },
      {
        x: "3.5",
        y: 0,
      },
      {
        x: "3.6",
        y: 0,
      },
      {
        x: "3.7",
        y: 0,
      },
      {
        x: "4.1",
        y: 0,
      },
      {
        x: "4.2",
        y: 0,
      },
      {
        x: "4.3",
        y: 0,
      },
      {
        x: "4.4",
        y: 69,
      },
      {
        x: "4.5",
        y: 45,
      },
      {
        x: "4.6",
        y: 81,
      },
      {
        x: "4.7",
        y: 0,
      },
      {
        x: "4.8",
        y: 0,
      },
      {
        x: "5.1",
        y: 0,
      },
      {
        x: "5.2",
        y: 84,
      },
      {
        x: "5.3",
        y: 0,
      },
      {
        x: "5.4",
        y: 88,
      },
      {
        x: "5.5",
        y: 89,
      },
      {
        x: "5.6",
        y: 73,
      },
      {
        x: "5.7",
        y: 40,
      },
      {
        x: "5.8",
        y: 86,
      },
      {
        x: "5.9",
        y: 84,
      },
      {
        x: "6.1",
        y: 0,
      },
      {
        x: "6.2",
        y: 0,
      },
      {
        x: "6.3",
        y: 0,
      },
      {
        x: "6.4",
        y: 0,
      },
      {
        x: "6.5",
        y: 0,
      },
      {
        x: "6.6",
        y: 0,
      },
      {
        x: "6.7",
        y: 0,
      },
      {
        x: "6.8",
        y: 0,
      },
      {
        x: "6.9",
        y: 0,
      },
      {
        x: "6.10",
        y: 0,
      },
      {
        x: "7.1",
        y: 0,
      },
      {
        x: "7.2",
        y: 0,
      },
      {
        x: "7.3",
        y: 0,
      },
      {
        x: "7.4",
        y: 0,
      },
      {
        x: "7.5",
        y: 0,
      },
      {
        x: "7.6",
        y: 0,
      },
      {
        x: "7.7",
        y: 0,
      },
      {
        x: "7.8",
        y: 0,
      },
      {
        x: "7.9",
        y: 0,
      },
      {
        x: "8.1",
        y: 0,
      },
      {
        x: "8.2",
        y: 0,
      },
      {
        x: "8.3",
        y: 0,
      },
      {
        x: "8.4",
        y: 0,
      },
      {
        x: "8.5",
        y: 0,
      },
      {
        x: "8.6",
        y: 0,
      },
      {
        x: "8.7",
        y: 0,
      },
      {
        x: "8.8",
        y: 0,
      },
      {
        x: "8.9",
        y: 0,
      },
      {
        x: "8.10",
        y: 0,
      },
      {
        x: "9.1",
        y: 0,
      },
      {
        x: "9.2",
        y: 0,
      },
    ],
  },
  {
    id: "Avg: smuTest",
    data: [
      {
        x: "1.1",
        y: 0,
      },
      {
        x: "1.2",
        y: 0,
      },
      {
        x: "1.3",
        y: 0,
      },
      {
        x: "1.4",
        y: 0,
      },
      {
        x: "1.5",
        y: 0,
      },
      {
        x: "1.6",
        y: 0,
      },
      {
        x: "1.7",
        y: 0,
      },
      {
        x: "2.1",
        y: 0,
      },
      {
        x: "2.2",
        y: 0,
      },
      {
        x: "2.3",
        y: 0,
      },
      {
        x: "2.4",
        y: 0,
      },
      {
        x: "2.5",
        y: 0,
      },
      {
        x: "2.6",
        y: 0,
      },
      {
        x: "2.7",
        y: 0,
      },
      {
        x: "2.8",
        y: 0,
      },
      {
        x: "3.1",
        y: 0,
      },
      {
        x: "3.2",
        y: 0,
      },
      {
        x: "3.3",
        y: 0,
      },
      {
        x: "3.4",
        y: 0,
      },
      {
        x: "3.5",
        y: 0,
      },
      {
        x: "3.6",
        y: 0,
      },
      {
        x: "3.7",
        y: 0,
      },
      {
        x: "4.1",
        y: 0,
      },
      {
        x: "4.2",
        y: 0,
      },
      {
        x: "4.3",
        y: 0,
      },
      {
        x: "4.4",
        y: 100,
      },
      {
        x: "4.5",
        y: 67,
      },
      {
        x: "4.6",
        y: 83,
      },
      {
        x: "4.7",
        y: 0,
      },
      {
        x: "4.8",
        y: 0,
      },
      {
        x: "5.1",
        y: 0,
      },
      {
        x: "5.2",
        y: 100,
      },
      {
        x: "5.3",
        y: 0,
      },
      {
        x: "5.4",
        y: 100,
      },
      {
        x: "5.5",
        y: 100,
      },
      {
        x: "5.6",
        y: 51,
      },
      {
        x: "5.7",
        y: 51,
      },
      {
        x: "5.8",
        y: 51,
      },
      {
        x: "5.9",
        y: 100,
      },
      {
        x: "6.1",
        y: 0,
      },
      {
        x: "6.2",
        y: 0,
      },
      {
        x: "6.3",
        y: 0,
      },
      {
        x: "6.4",
        y: 0,
      },
      {
        x: "6.5",
        y: 0,
      },
      {
        x: "6.6",
        y: 0,
      },
      {
        x: "6.7",
        y: 0,
      },
      {
        x: "6.8",
        y: 0,
      },
      {
        x: "6.9",
        y: 0,
      },
      {
        x: "6.10",
        y: 0,
      },
      {
        x: "7.1",
        y: 0,
      },
      {
        x: "7.2",
        y: 0,
      },
      {
        x: "7.3",
        y: 0,
      },
      {
        x: "7.4",
        y: 0,
      },
      {
        x: "7.5",
        y: 0,
      },
      {
        x: "7.6",
        y: 0,
      },
      {
        x: "7.7",
        y: 0,
      },
      {
        x: "7.8",
        y: 0,
      },
      {
        x: "7.9",
        y: 0,
      },
      {
        x: "8.1",
        y: 0,
      },
      {
        x: "8.2",
        y: 0,
      },
      {
        x: "8.3",
        y: 0,
      },
      {
        x: "8.4",
        y: 0,
      },
      {
        x: "8.5",
        y: 0,
      },
      {
        x: "8.6",
        y: 0,
      },
      {
        x: "8.7",
        y: 0,
      },
      {
        x: "8.8",
        y: 0,
      },
      {
        x: "8.9",
        y: 0,
      },
      {
        x: "8.10",
        y: 0,
      },
      {
        x: "9.1",
        y: 0,
      },
      {
        x: "9.2",
        y: 0,
      },
    ],
  },
];

const createMarkers = (data, gridXValues, currentPosition) => {
  const weekMarkers = gridXValues.map((value) => {
    return {
      axis: "x",
      value,
      lineStyle: { stroke: "#000", strokeWidth: 1 },
    };
  });
  /** Special cases: The very last marker and the current position of the course. */
  weekMarkers.push({
    axis: "x",
    value: data[0].data[data[0].data.length - 1].x,
    lineStyle: { stroke: "#000", strokeWidth: 1 },
  });

  if (currentPosition !== "") {
    weekMarkers.push({
      axis: "x",
      value: currentPosition,
      lineStyle: { stroke: "red", strokeWidth: 3 },
    });
  }

  return weekMarkers;
};

export const formatValue = (value) => {
  const [week, screen] = value.split(".");

  return `${screen === "1" ? week : ""}`;
};

const verifyData = (data) => {
  if (!data) return true;
  return data.some((value) => value.y !== data[0].y);
};

export const checkMesh = (data = []) => {
  const [courseData = {}, studentData = {}] = data;

  if (courseData.data.length < 2) {
    return false;
  }
  console.log(
    "checkMesh :",
    verifyData(courseData.data) || verifyData(studentData.data)
  );

  return verifyData(courseData.data) || verifyData(studentData.data);
  // return verifyData(courseData.data) && verifyData(studentData.data);
};

const emptyTooltip = () => null;

const filterData = (data) => {
  const newData = data.map((d) => {
    const newElem = { id: d.id };
    const newElemData = d.data.map((dataa) => {
      return { x: dataa.x, y: Math.round(dataa.y) };
    });
    newElem.data = newElemData;
    return newElem;
  });

  console.log("newData :", newData);
  return newData;
};

const Practice = ({ data, gridXValues, onClick, currentPosition }) => {
  return (
    <div style={{ height: 250 }}>
      <ResponsiveLine
        // data={filterData(data)}
        data={data}
        margin={{ top: 20, right: 50, bottom: 60, left: 50 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", stacked: false, min: 0, max: 100 }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 7,
          tickRotation: 0,
          legend: "Weeks",
          legendOffset: 50,
          legendPosition: "middle",
          format: (value) => formatValue(value),
        }}
        axisLeft={null}
        colors={{ scheme: "category10" }}
        enablePoints={false}
        enableGridY={false}
        crosshairType="x"
        onClick={onClick}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="y"
        pointLabelYOffset={-12}
        // enableSlices="x"
        debugMesh
        useMesh={true} // As of 31-05-19, a d3 issue causes a crash if less than 3 points are drawn.
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 5,
            translateY: 60,
            itemsSpacing: 3,
            itemDirection: "left-to-right",
            itemWidth: 60,
            itemHeight: 15,
            itemOpacity: 0.75,
            symbolSize: 8,
            symbolShape: "square",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      ></ResponsiveLine>
    </div>
  );
};

export default Practice;

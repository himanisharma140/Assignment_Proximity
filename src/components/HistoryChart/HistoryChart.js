import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./HistoryChart.scss";

const dummyHistoryObject = {
  Delhi: [
    {
      city: "Delhi",
      aqi: 303.9955573644944,
      timeStamp: 2343223
    },
    {
      city: "Delhi",
      aqi: 303.0473196100626,
      timeStamp: 2345223
    }
  ],
  Mumbai: [
    {
      city: "Mumbai",
      aqi: 180.4532880409185,
      timeStamp: 2343223
    }
  ],
  Bengaluru: [
    {
      city: "Bengaluru",
      aqi: 90.23942071701057,
      timeStamp: 2343223
    }
  ]
};

const HistoryChart = () => {
  const chartComponentRef = useRef(null);
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);
  // this is a dummy object, please replace the default value as well as how this state changes with input
  const [historyObject, setHistoryObject] = useState(dummyHistoryObject);

  const getTimeForChart = (timeStamp) => {
    const time = new Date(timeStamp);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return `${hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${time.getSeconds()} ${hours >= 12 ? "pm" : "am"}`;
  };

  useEffect(() => {
    setSeries(createSeries());
  }, [historyObject]);

  useEffect(() => {
    const allTimeStamps = [];
    for (const each of Object.keys(historyObject)) {
      allTimeStamps.push(
        ...historyObject[each].map((itm) => getTimeForChart(itm.timeStamp))
      );
    }
    setCategories(allTimeStamps);
  }, [historyObject]);

  const createSeries = () => {
    const baseStructure = {
      type: "spline",
      color: "grey",
      dashStyle: "Solid",
      showInLegend: true,
      marker: {
        radius: 2
      }
    };
    return Object.keys(historyObject).map((itm) => {
      return {
        ...baseStructure,
        name: itm,
        data: historyObject[itm].map((itm) => itm.aqi)
      };
    });
  };

  const getOptions = () => ({
    chart: {
      type: "line"
    },
    title: {
      text: "Cities with AQI history"
    },
    xAxis: {
      categories: categories
    },
    yAxis: {
      title: {
        text: "AQI (Air quality index)"
      }
    },
    tooltip: {
      borderColor: "#2c3e50"
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: true
      }
    },
    series: series,
    credits: {
      enabled: false
    }
  });

  return (
    <section className="history-chart">
      <HighchartsReact highcharts={Highcharts} options={getOptions()} />
    </section>
  );
};

export default HistoryChart;

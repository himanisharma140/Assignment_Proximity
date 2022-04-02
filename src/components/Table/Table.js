import { useSelector } from "react-redux";
import TableRow from "./components/TableRow";
import "./Table.scss";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useEffect, useState } from "react";

const tableHeadings = ["City", "Current AQI", "Last Updated"];

const client = new W3CWebSocket("wss://city-ws.herokuapp.com/");
const Table = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      console.log(message);
      const retrievedData = JSON.parse(message.data);
      console.log(retrievedData);
      const dnew = {
        city: retrievedData.city,
        aqi: retrievedData.aqi
      };
      setData([...data, dnew]);
    };
  });
  return (
    <section className="table">
      <table>
        <thead>
          <tr>
            {tableHeadings.map((itm) => (
              <th key={itm}>{itm}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((itm) => (
            <th key={itm}>{itm}</th>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Table;

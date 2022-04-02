import { useSelector } from "react-redux";
import TableRow from "./components/TableRow";
import "./Table.scss";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const tableHeadings = ["City", "Current AQI", "Last Updated"];
const client = new W3CWebSocket("ws://127.0.0.1:8000");
const Table = () => {
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
        <tbody></tbody>
      </table>
    </section>
  );
};

export default Table;

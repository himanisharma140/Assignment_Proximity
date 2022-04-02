import React from "react";
import HistoryChart from "../../components/HistoryChart";
import Table from "../../components/Table";
import "./Home.scss";

const Home: React.FC = () => {
  return (
    <div className="home">
      <header>
        <h2>Live City wise AQI Chart (Air Quality Index)</h2>
      </header>
      <main className="body">
        <Table />
        <HistoryChart />
      </main>
    </div>
  );
};

export default Home;

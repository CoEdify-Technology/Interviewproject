import React from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

class Chart extends React.Component {
  state = {
    json: [],
  };
  componentDidMount() {
    axios.get(`http://localhost:3001/api/data`).then((res) => {
      const json = res.data.slice(1, 15);
      this.setState({ json });
    });
  }
  filterHatchback = (event) => {
    if (event.target.value === "") {
      axios.get(`http://localhost:3001/api/data`).then((res) => {
        const json = res.data.slice(1, 15);
        this.setState({ json });
        console.log(json);
      });
    } else {
      const hatchbackCar = this.state.json.filter(
        (list) => list.Type === event.target.value
      );
      this.setState({ json: hatchbackCar });
    }
  };
  render() {
    return (
      <div>
        <BarChart width={730} height={250} data={this.state.json}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Number" fill="#8884d8" />
          <Bar dataKey="Type" fill="#82ca9d" />
        </BarChart>
        <div>
          <input type="text" onChange={this.filterHatchback}></input>
        </div>
      </div>
    );
  }
}
export default Chart;

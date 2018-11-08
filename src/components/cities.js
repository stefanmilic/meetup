import React, { Component } from "react";
import fetchJsonp from "fetch-jsonp";
import Events from "./events";
export default class Cities extends Component {
  state = {
    cities: []
  };
  componentDidMount = () => {
    fetchJsonp(
      `https://api.meetup.com/2/cities?&sign=true&photo-host=public&country=rs&page=20
&callback=callback`,
      {
        jsonpCallbackFunction: "callback"
      }
    )
      .then(res => res.json())
      .then(data => {
        // console.log(data.results);
        this.setState({ cities: data.results });
      });
  };
  render() {
    let id = parseInt(this.props.match.params.id);
    const { cities } = this.state;
    const style = {
      fontSize: 16
    };
    const city = cities.map(city => {
      return city.id === id ? (
        <div key={city.id} className="card">
          <div className="card-body">
            <h5 className="card-title">{city.city}</h5>
            <Events city={city} />
          </div>
        </div>
      ) : (
        false
      );
    });

    return <div>{city}</div>;
  }
}

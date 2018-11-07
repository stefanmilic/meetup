import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import fetchJsonp from "fetch-jsonp";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      cities: []
    };
  }

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
        // console.log(data);
        this.setState({ cities: data.results });
      });
  };

  render() {
    const { cities } = this.state;
    const city = cities.map(city => {
      return (
        <li className="list-group-item" key={city.id}>
          <NavLink className="links" to={`/${city.id}`}>
            {" "}
            {city.city}
          </NavLink>
        </li>
      );
    });
    return (
      <div className="App">
        <ul className="list-group">{city}</ul>
      </div>
    );
  }
}

export default Home;

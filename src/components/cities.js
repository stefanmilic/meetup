import React, { Component } from "react";
import fetchJsonp from "fetch-jsonp";

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
            <div style={style} className="card-text">
              <p>
                <em> Country name:</em> {city.localized_country_name}
              </p>
              <p>
                <em>Id</em> : {city.id}
              </p>
              <p>
                <em>Distance</em> : {city.distance}
              </p>
              <p>
                <em>Lat:</em> {city.lat}
              </p>
              <p>
                <em>Lon:</em> {city.lon}
              </p>
              <p>
                <em>Member count: </em> {city.member_count}
              </p>
              <p>
                <em>Zip:</em> {city.zip}
              </p>
            </div>
          </div>
        </div>
      ) : (
        false
      );
    });

    return <div>{city}</div>;
  }
}

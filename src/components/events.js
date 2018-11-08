import React, { Component } from "react";
import fetchJsonp from "fetch-jsonp";
import ReactHtmlParser from "react-html-parser";

export default class events extends Component {
  constructor() {
    super();
    this.state = {
      events: []
    };
  }

  componentDidMount = () => {
    const { city } = this.props;
    fetchJsonp(
      `https://api.meetup.com/find/upcoming_events?photo-host=public&page=10&sig_id=267210762&lon=+${
        city.lon
      }&lat=${
        city.lat
      }&sig=286164959ab66bd35e9ec26fab78c61f24b94653&callback=callback`,
      {
        jsonpCallbackFunction: "callback"
      }
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ events: data.data.events });
      });
  };
  render() {
    const { events } = this.state;
    // console.log(events);
    if (events.length) {
      const event = events.map(event => {
        // console.log(event.description);
        return (
          <div id="accordion" key={event.id}>
            <ul className="list-group">
              <li className="list-group-item">
                <a
                  className="links"
                  data-toggle="collapse"
                  href={"#collapseExample" + event.id}
                >
                  {event.name}
                </a>
              </li>
            </ul>
            <div
              className="collapse"
              id={"collapseExample" + event.id}
              data-parent="#accordion"
            >
              <div className="description">
                <div className="card-text">
                  {ReactHtmlParser(event.description)}
                </div>
              </div>
            </div>
          </div>
        );
      });
      return <div>{event}</div>;
    } else {
      return <h4 className="card-body">No comming events in this city</h4>;
    }
  }
}

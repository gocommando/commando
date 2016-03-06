import React, { Component } from 'react';
import Card, { Content } from 'components/Card';
import Loading from 'components/Loading';

const BASE_URI = 'https://forecast.io/embed/#';

function queryString (data) {
  let encode = encodeURIComponent;
  return Object.keys(data).map(function (k) {
    return [encode(k), encode(data[k])].join('=');
  }).join('&');
}

function Forecast (props) {
  return (
    <iframe type='text/html' frameBorder='0'
            height='245' width='100%'
            src={ BASE_URI + queryString(props) } />
  );
}

export default class Weather extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      lat: null,
      lon: null,
      color: '#222324',
      font: 'Helvetica Neue'
    };
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      this.setState({
        lat: coords.latitude,
        lon: coords.longitude
      });
    });
  }

  render () {
    return (
      <Card>
        <Content>
          { this.state.lat
              ? <Forecast { ...this.state } />
              : <Loading /> }
        </Content>
      </Card>
    );
  }
}

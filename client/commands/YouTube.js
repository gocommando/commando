import React, { Component, PropTypes } from 'react';
import Card, { Media, Body, Content } from 'components/Card';

function Player ({ videoId }) {
  return (
    <div className='youtube-player'>
      <iframe type='text/html'
              width='640' height='390'
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              frameBorder='0'
              allowFullScreen />
    </div>
  );
}

function VideoItem ({ video, onClick }) {
  const handleClick = (e) => {
    e.preventDefault();
    onClick(video);
  };

  return (
    <a href='#' className='card-list-item' onClick={ handleClick }>
      <i className='fa fa-chevron-right pull-right'></i>
      { video.snippet.title }
    </a>
  );
}

function VideoList ({ videos, onClick }) {
  const videoItems = videos.map((video, i) => {
    return <VideoItem video={ video } key={i} onClick={ onClick } />;
  });

  return (
    <div>{ videoItems }</div>
  );
}

export default class YouTube extends Component {
  static propTypes = {
    videos: PropTypes.array.isRequired
  };

  constructor (props, context) {
    super(props, context);
    this.state = {
      video: this.props.videos[0]
    };
  }

  handleActivate (video) {
    this.setState({ video });
  }

  render () {
    const otherVideos = this.props.videos.filter(video => {
      return video !== this.state.video;
    });

    return (
      <Card>
        <Content>
          <Media>
            <p className='subtitle'>
              { this.state.video.snippet.title }
            </p>
          </Media>

          <Body>
            <Player videoId={ this.state.video.id.videoId } />
          </Body>
        </Content>

        <VideoList videos={ otherVideos } onClick={ ::this.handleActivate } />
      </Card>
    );
  }
}

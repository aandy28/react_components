import React from "react";
import { render } from "react-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import _ from "lodash";
import "./tabbed_carousel.css";

class Tabs extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected: this.props.selected,
      isPlaying: true
    };
    this.checkIsPlaying();
  }

  handleClick(index, event) {
    event.preventDefault();
    this.setState({
      selected: index
    });
  }

  componentDidUpdate(prevProps, prevState)
  {
    if (prevState.isPlaying != this.state.isPlaying)
    {
      this.checkIsPlaying();
    }
  }

  componentWillUnmount()
  {
    clearInterval(this.interval);
  }

  checkIsPlaying() {
    if (this.state.isPlaying)
    {
      this.interval = setInterval(() => {
        this.setState({
          selected: (this.state.selected + 1) % 4
        })
      }, 7000)
    }
  }

  _renderTitles() {
    function labels(child, index) {
      let activeClass = (this.state.selected === index ? 'active' : '');
      return (
        <li key={index}>
          <a href="#" 
            className={activeClass}
            onClick={this.handleClick.bind(this, index)}>
            {child.props.label}
          </a>
        </li>
      );
    }
    return (
      <ul className="tabs__labels">
        {this.props.children.map(labels.bind(this))}
      </ul>
    );
  }

  playScroll()
  {
    this.setState({isPlaying: true});
    this.checkIsPlaying();
  }

  pauseScroll()
  {
    this.setState({isPlaying: false});
    clearInterval(this.interval);
    // clearInterval();
  }

  _renderContent() {
    return (
      <div><PlayPause selected={this.state.selected} showHide={this.state.isPlaying} play={this.playScroll.bind(this, this.state.selected)} pause={this.pauseScroll.bind(this, this.state.selected)} />
      <div className="tabs__content">
        
        <ReactCSSTransitionGroup 
          transitionName="opacTrans" 
          component="div" 
          className="gallery-image" 
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          transitionAppear={true}
          transitionAppearTimeout={500}>
          {this.props.children[this.state.selected]}
        </ReactCSSTransitionGroup>
      </div>
      </div>
    );
  }

  render () {
    
    return (
      <div className="tabs">
        {this._renderContent()}
        {this._renderTitles()}
      </div>
    );
  }
}

Tabs.defaultProps = 
{
  selected: 0
}

class PlayPause extends React.Component
{
  play()
  {
    this.props.play();
  }

  pause()
  {
    this.props.pause();
  }

  render()
  {
    let playButton = <button ref="Play" onClick={this.play.bind(this)}><i className="fa fa-play" aria-hidden="true"></i></button>;
    let pauseButton = <button ref="Pause" onClick={this.pause.bind(this)}><i className="fa fa-pause" aria-hidden="true"></i></button>
    return (
      <div className="playPause">
      {
        this.props.showHide ? pauseButton : playButton
      }
      </div>)
  }
}

class NationalPromotions extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      promotions: this.props.data.promotions
    }
  }

  render() {
    let promotions = this.state.promotions;

    return (
      <div>
        
        <Tabs selected={0}>
          {_.map(promotions, function(promo, key){ 

            let index = Math.round(key)-1;
            return (
              <div key={'item-'+index} label={promo.title}>
                
                  <div className="animated" key={'item-'+index}><a href={promo.url}><img src={promo.asset_url} alt={promo.title} /></a></div>
                
              </div>
            ) 
          })}

        </Tabs>
      </div>
    );
  }
}

export default NationalPromotions;

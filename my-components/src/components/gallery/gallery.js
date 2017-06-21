import React from "react";
import { render } from "react-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "./gallery.css";

class Gallery extends React.Component
{
  constructor(props)
  {
    super(props)

    this.state = {
      images: this.props.data,
      selectedImage: this.props.data[0]
    }
  }


  handleThumbClick(selectedImage){

    this.setState({
      selectedImage
    })
  }

  render()
  {
    const {images, selectedImage} = this.state;
    const totalImages = images.length;
    const divStyle = image => ({
      backgroundImage: 'url('+ image +')'
    });

    return(
      <div className="image-gallery">

        <ReactCSSTransitionGroup transitionName="opacTrans" component="div" className="gallery-image" transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          <div key={selectedImage} style={divStyle(selectedImage)}></div>
        </ReactCSSTransitionGroup>
        {totalImages > 1 &&
          <div className="image-scroller">
            {images.map((image, index) => (

              <div key={index} onClick={this.handleThumbClick.bind(this,image)} style={divStyle(image)} className='thumb-item '></div>
            ))}
          </div>
        }
      </div>
    )
  }
}


export default Gallery;

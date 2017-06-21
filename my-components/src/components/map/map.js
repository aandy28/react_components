/*global google*/
import React from "react";
import axios from "axios";
import _ from "lodash";
import cluster_1 from './1.png';
import cluster_2 from './2.png';
import cluster_3 from './3.png';
import marker_img from './marker.png';
import custom_helper from "../helpers/helpers.js";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";
import './map.css';

// import ViewDetails from "./view-details";

let ClusterStyles = [{
    height: 50,
    url: cluster_1,
    width: 50
    },
    {
    height: 60,
    url: cluster_2,
    width: 60
    },
    {
    height: 70,
    url: cluster_3,
    width: 70
    }
  ];

const BranchesMap = withGoogleMap(props => (

  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={6}
    defaultCenter={{ lat: 54.7408371, lng: -4.1813227 }}
    onClick={props.onMapClick}
    onMarkerClick={props.onMarkerClick.bind(this)}
  >

    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
      styles={ClusterStyles}
      noRedraw={true}
    >
      {props.markers.map((marker, index) => {
        return(
          <Marker
                {...marker}
                key={index}
                noRedraw={true}
                onClick={(marker) => { props.onMarkerClick(props.markers[index])}}
              />
              )
      })}
    </MarkerClusterer>
  </GoogleMap>
));

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.getAllBranchs = this.getAllBranchs.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.setMapMarkers = this.setMapMarkers.bind(this);
    this.centerMap = this.centerMap.bind(this);

    this.state = {
      search_term: "",
      loading: true,
      loading_message: "Retrieving all Branchs...",
      lat: "",
      long: "",
      branches: [],
      markers: [],
      show_find_location: true,
      marker_Branch: ""
    };
  }

  componentDidMount() {
    var field = 'q';
    var url = window.location.href;
    if(url.indexOf('?' + field + '=') !== -1)
    {
      this.handleQueryString(url);
    }  
    else if(url.indexOf('&' + field + '=') !== -1)
    {
      this.handleQueryString(url);
    }else{
      this.getAllBranchs();
    }

  }

  handleQueryString(url)
  {
    // this.setState({ loading: true, loading_message: "Searching branches...", error_message: "" });
    // let params =  (/^[?#]/.test(url) ? url.slice(1) : url)
    // .split('&')
    // .reduce((params, param) => {
    //   let [ key, value ] = param.split('=');
    //   params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
    //   return params;
    // }, { });

    // axios
    //   .get(`/branches/search?q=${params.q}`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json"
    //     }
    //   })
    //   .then(response => {
    //     let branches = [];
    //     response.data.Branch.map((branch, index) => {
          
    //       if (branch.longitude) {
    //         branches.push(branch);
    //       }
    //     });
    //     this.setState({
    //       loading: false,
    //       branches: branches,
    //       marker_Branch: ""

    //     });
    //     this.setMapMarkers();
    //   })
    //   .catch(response => console.log(response));
    // this.setState({search_term: params.q});
  }

  handleMarkerClick(marker)
  {
    this.setState({marker_Branch: marker.id});
  }

  handleOnChange(e) {
    this.setState({ search_term: e.target.value });
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.search();
    }
  }

  getAllBranchs() {
    custom_helper.getAllBranches()
      .then(function(data){
        this.setState({
          loading: false,
          branches: data.branches,
          marker_Branch: ""
        })
        this.setMapMarkers();
      }.bind(this))
  }

  setMapMarkers() {
    let newMarkers = [];
    _.each(this.state.branches, branch => {
      newMarkers.push({
        position: {
          lat: branch.latitude,
          lng: branch.longitude
        },
        id: branch.id,
        // TODO: Fix get asset pipeline url
        icon: marker_img
      });
    });
    this.setState({
      markers: newMarkers
    });
    this.centerMap();
  }

  centerMap() {
    const branchBounds = [];

    _.each(this.state.branches, branch => {
      branchBounds.push(
        new google.maps.LatLng(branch.latitude, branch.longitude)
      );
    });

    const bounds = new google.maps.LatLngBounds();
    branchBounds.forEach(bound => bounds.extend(bound));

    if (bounds.getCenter()) {
      return bounds;
    }
  }


  search() {
    this.setState({ loading: true, loading_message: "Searching branches...", error_message: "" });
    axios
      .get(`/branches/search?q=${this.state.search_term}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
      .then(response => {
        let branches = [];
        response.data.branches.map((branch, index) => {
          if (branch.longitude) {
            branches.push(branch);
          }
          return branches;
        });
        this.setState({
          loading: false,
          branches: branches,
          marker_Branch: ""

        });
        this.setMapMarkers();
      })
      .catch(response => console.log(response));
  }

  render() {

    let summary = this.state.branches.length > 0
      ? <div className="summary">
          Found <strong>{this.state.branches.length}</strong> branche(s)
        </div>
      : "";
    // TODO: Get logo asset from asset pipeline
    let loading = this.state.loading === true
      ? <div className="loading-branches">
          <div className="message">
            <div className="sk-folding-cube">
              <div className="sk-cube1 sk-cube" />
              <div className="sk-cube2 sk-cube" />
              <div className="sk-cube4 sk-cube" />
              <div className="sk-cube3 sk-cube" />
            </div>
            {this.state.loading_message}
          </div>
        </div>
      : "";
      let filteredBranches = this.state.branches.filter(
        (branch) => {

          return this.state.marker_Branch !== "" ? branch.id === this.state.marker_Branch : branch
          
          //return branch.id.toString().indexOf(this.state.marker_Branch.toString()) !== -1;
        }
      );

    return (
      <div className="branches">
        {loading}
        <div className="">
          
          <div className="row">
            
            <div className="col-md-6 col-lg-4 branches-search-area">
              {summary}
              <div className="branches-results">
                <ul>
                  {filteredBranches.map((branch, index) => {
                    let branch_address = [];
                    _.each(branch.address, line => {
                      if (line) {
                        branch_address.push(line);
                      }
                    });

                    return (
                      <li key={index}>
                        <h4>{branch.name}</h4>
                        <span className="branch-address">
                          {branch_address.map((l, i) => {
                            return (
                              <span key={i} className="address-line">{l}</span>
                            );
                          })}
                        </span>
                        {branch.telephone.length ? <span className="detail telephone">
                          <strong><i className="material-icons">call</i></strong>{branch.telephone}
                        </span> : null}

                        {branch.email.length ? <span className="detail email">
                          <strong><i className="material-icons">email</i></strong>{branch.email}
                        </span> : null}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-8 branches-map">
              <BranchesMap
                containerElement={
                  <div
                    style={{ height: `100%`, width: `100%`, display: `block` }}
                  />
                }
                mapElement={
                  <div
                    style={{ height: `100%`, width: `100%`, display: `block` }}
                  />
                }
                onMapLoad={_.noop}
                onMapClick={_.noop}
                markers={this.state.markers}
                onMarkerRightClick={_.noop}
                onMarkerClick={this.handleMarkerClick.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { Map as default };
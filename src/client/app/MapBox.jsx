import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature, Popup, ZoomControl, Marker, Cluster } from "react-mapbox-gl";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const styles = {
  marker: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    backgroundColor: '#51D5A0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #C9C9C9'
  },
  active: {
    width: 15,
    height: 15,
    borderRadius: '50%',
    backgroundColor: '#51D5A0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #C9C9C9'
  },
  activeIcon: {
    width: '40px',
    height: '40px',
    maxHeight: 'auto',
    maxWidth: 'auto'
  },
  icon: {
    width: '20px',
    height: '20px',
    maxHeight: 'auto',
    maxWidth: 'auto'
  }
}

class MapBox extends React.Component {

	render () {
		return (
		<div style={this.props.visible===false && {'margin-top':'150px'} || this.props.visible===true && {'margin-top':'0px'}} >
  		<ReactMapboxGl
  		  style="mapbox://styles/mapbox/streets-v8"
            center={[-90.35, 37.5]}
            zoom={[2.7]}
            accessToken={'pk.eyJ1IjoidHdhbGs0ODIxIiwiYSI6ImNqMWk3ajQ3YjAxazMyd28wbmxpeG5pOW0ifQ.pD4Uic9vRI0_fh0_XV0tCg'}
            containerStyle={{
  		        height: "50vh",
  		        width: "100vw"
  		      }}
            onClick={this.props.removePopup.bind(this)}>
  		 
  		 {  this.props.remainingParks &&
  		 	this.props.remainingParks.map((park) => (
                <Marker
                  key={park.id}
                  style={(this.props.activePark && (park.id === this.props.activePark.id)) ||
                  (this.props.activeParks && (this.props.activeParks.indexOf(park.id) >= 0 )) ? styles.active : styles.marker}
                  coordinates={[park.longitude, park.latitude]}
                  onClick={this.props.addPopup.bind(this, park)}
                  onMouseEnter = {this.props.setActivePark.bind(this, park)} 
                  onMouseLeave = {this.props.setActivePark.bind(this, null)}
                  >
                </Marker>
              ))           
            }  

            {  this.props.filteredParks &&
        this.props.filteredParks.map((park) => (

          
             
            <Marker
                  key={park.id}
                  style={{}}
                  coordinates={[park.longitude, park.latitude]}
                  onClick={this.props.addPopup.bind(this, park)}
                  onMouseEnter = {this.props.setActivePark.bind(this, park)} 
                  onMouseLeave = {this.props.setActivePark.bind(this, null)}>

                  <img style= {(this.props.activePark && (park.id === this.props.activePark.id)) ||
                  (this.props.activeParks && (this.props.activeParks.indexOf(park.id) >= 0 )) ? styles.activeIcon : styles.icon}
                 src="https://cdn1.iconfinder.com/data/icons/map-objects/154/map-object-fir-forest-park-512.png" />

                </Marker>
               
                       
            ))
        }           

        { this.props.popup && 
        
                <Popup
                  coordinates={[this.props.popup.longitude, this.props.popup.latitude]}
                  offset={ [0, -35] }
                  >
                  <div>
                    <h5>{this.props.popup.name}</h5>
                    <Link to={`park/${this.props.popup.parkcode}/`}>
                      <p>Go to page</p>
                    </Link>
                    <p style={{color:"blue"}} onClick={this.props.removePopup.bind(this)}> Hide </p>
                  </div>
                </Popup>
        
        }

        </ReactMapboxGl>
       

       </div>
    )
	}
}

const mapStateToProps = (state) => {
    return {
      visible: state.visibleFilter.visible,
    };
};

export default connect(mapStateToProps)(MapBox);



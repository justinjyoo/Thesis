import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature, Popup, ZoomControl, Marker, Cluster } from "react-mapbox-gl";
import { Link } from 'react-router-dom'

const styles = {
  marker: {
    width: 15,
    height: 15,
    borderRadius: '50%',
    backgroundColor: '#51D5A0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #C9C9C9'
  },
  active: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: '#51D5A0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #C9C9C9'
  }
}

export default class MapBox extends Component {

  

	render () {
		return (
		<div>
		<ReactMapboxGl
		  style="mapbox://styles/mapbox/streets-v8"
          center={[-98.35, 39.5]}
          zoom={[2]}
          accessToken={'pk.eyJ1IjoidHdhbGs0ODIxIiwiYSI6ImNqMWk3ajQ3YjAxazMyd28wbmxpeG5pOW0ifQ.pD4Uic9vRI0_fh0_XV0tCg'}
          containerStyle={{
		        height: "80vh",
		        width: "80vw"
		      }}
          onClick={this.props.removePopup.bind(this)}>
		 
		 {  this.props.parks &&
		 	this.props.parks.map((park) => (
              <Marker
                key={park.id}
                style={this.props.activePark && (park.id === this.props.activePark.id) ? styles.active : styles.marker}
                coordinates={[park.longitude, park.latitude]}
                onClick={this.props.addPopup.bind(this, park)}
                onMouseEnter = {this.props.setActivePark.bind(this, park)} 
                onMouseLeave = {this.props.setActivePark.bind(this, null)}>
              </Marker>
            ))           
          }  

          {  this.props.remainingParks &&
      this.props.remainingParks.map((park) => {

        if (park.id === this.props.activePark.id) {
          return 
          <Marker
                key={park.id}
                style={styles.marker}
                coordinates={[park.longitude, park.latitude]}
                onClick={this.props.addPopup.bind(this, park)}>

                <img style= {{
                  maxHeight:'40px',
                  maxWidth:'40px',
                  height: 'auto',
                  width: 'auto'
                }} src="https://cdn1.iconfinder.com/data/icons/map-objects/154/map-object-fir-forest-park-512.png" />

              </Marker>
            } else {
              return
              <Marker
                key={park.id}
                style={styles.marker}
                coordinates={[park.longitude, park.latitude]}
                onClick={this.props.addPopup.bind(this, park)}>

                <img style= {{
                  maxHeight:'20px',
                  maxWidth:'20px',
                  height: 'auto',
                  width: 'auto'
                }} src="https://cdn1.iconfinder.com/data/icons/map-objects/154/map-object-fir-forest-park-512.png" />

              </Marker>
            }
                     
          })
      }           

      { this.props.popup && 
      
              <Popup
                coordinates={[this.props.popup.longitude, this.props.popup.latitude]}
                offset={ [0, -35] }
                >
                <div>
                  <h2>{this.props.popup.name}</h2>
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
import React from 'react';
import FilterRow from './FilterRow.jsx'
import ParkList from './ParkList.jsx';
import ParkView from './ParkView.jsx';
import ShoppingCart from './ShoppingCart.jsx';
import AddToCart from './AddToCart.jsx';
import MapView from './Map.jsx';
import axios from 'axios';
import SidebarFilters from './sidebarFilters.jsx';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, List, Accordion } from 'semantic-ui-react';
import { getParks } from '../actions/getParks.js';
import {connect} from 'react-redux';
import {showFilters} from '../actions/actions.js';
import NavBar from './NavBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  componentDidMount() {
    this.props.getParks(this.props.filters)
  }

  render () {
    return (
    	<div>
        <NavBar parks={this.props.parks} />
        <Button onClick={() => {this.props.toggleVisibility(this.props.visible)}}>Toggle Visibility</Button>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='push' width='thin' visible={!this.props.visible} icon='labeled' vertical inverted>
            <SidebarFilters visible={!this.props.visible} />
          </Sidebar>
          <Sidebar.Pusher>
          <Segment basic>
            <MapView parks={this.props.parks}/>
            <ParkList />
          </Segment> 
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <ShoppingCart />
        <AddToCart />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      filters: state.updateFiltersSelections.activities,
      parks: state.getParksReducer.parks,
      visible: state.visibleFilter.visible
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getParks: (filters) => dispatch(getParks(filters)),
        toggleVisibility: (visible) => dispatch(showFilters(visible))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);


import React from 'react';
import { Sidebar, Segment, Button, Menu, Icon, List, Accordion } from 'semantic-ui-react';
import FilterRow from './FilterRow.jsx';
import { connect } from 'react-redux';
import {showFilters} from '../actions/actions.js'


class SidebarFilters extends React.Component {

  render() {
    return (
      <Sidebar as={Menu} animation='push' visible={this.props.visible} icon='labeled' horizontal inverted>
        <Menu.Item name='home'>
          <List>
          <List.Header>Activities</List.Header>
            {this.props.updateFiltersSelections.activities.slice(0, 5).map((filter) => <FilterRow getParks={this.props.getParks} filter={filter} isSelected={filter.isSelected} name={filter.name} key={filter.name} category={'Activities'}/>)}
          </List>
          <Accordion>
            <Accordion.Title>
              <Icon name='dropdown' />
              See All Activities
            </Accordion.Title>
            <Accordion.Content>
              <List>
                {this.props.updateFiltersSelections.activities.slice(5, 21).map((filter) => <FilterRow getParks={this.props.getParks} filter={filter} isSelected={filter.isSelected} name={filter.name} key={filter.name} />)}
              </List>
            </Accordion.Content>
          </Accordion>
        </Menu.Item>
        <Menu.Item name='gamepad'>
          <List>
          <List.Header>Popularity</List.Header>
           {this.props.updateFiltersSelections.popularity.slice(0, 2).map((filter) => <FilterRow getParks={this.props.getParks} filter={filter} isSelected={filter.isSelected} name={filter.name} key={filter.name} category={'Popularity'}/>)}
          </List>
        </Menu.Item>
        <Menu.Item name='camera'>
          <Icon name='camera' />
            Channels
        </Menu.Item>
      </Sidebar>
    )
  }
      
}


const mapStateToProps = (state) => {
  return {
      updateFiltersSelections: state.updateFiltersSelections,
  };
};

export default connect(mapStateToProps)(SidebarFilters)

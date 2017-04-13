import React from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import {Pet} from "./Pet.jsx";
class App extends React.Component {

  constructor(props) {
    super();
    this.state = {
      cats: this.createCatList(),
      loading: true,
      error: false
    }
  }
  
/*
 * Initialize the cats array
 */ 
  createCatList() {
    return { male: [], female: [] }
  }

/*
 * Sort the list of cats
 */ 
  sortList(_list) {
    if (_list == undefined) return
    return Object.keys(_list).reduce((object, key) => {
      object[key] = (_list[key] || []).sort()
      return object;
    }, {})
  }

/*
 *filter only cats 
 */ 
filterCats(_animals){
 return (_animals || []).filter(pet => pet.type === 'Cat').map(pet => pet.name)
}

/*
 * Categorize the pets
 */ 
  categorizeData(_data) {
    if (_data == undefined ||_data == []) return
    return _data

      // filter in only 'male' and 'female' people
      .filter(_item => ['male', 'female'].indexOf(_item.gender.toLowerCase()) >= 0)

      // reduce to new format
      .reduce((_pets, _item) => {
        const key = _item.gender.toLowerCase()
        _pets[key] = _pets[key].concat(this.filterCats(_item.pets))
        return _pets
      }, this.createCatList());
  }

/*
 * Process the data received from get service call
 */ 
  processData(_data) {
    if (_data == undefined || _data == []) return;
    this.setState({
      cats: this.sortList(this.categorizeData(_data)),
      loading: false
    });
  }

  componentDidMount() {
    axios.get(`http://agl-developer-test.azurewebsites.net/people.json`)
      .then(response => this.processData(response.data))
      .catch(error => this.setState({ loading: false, error: true }));
  }

/*
 * Render the html
 */ 

  render() {
    return <div className="container">
      <div className="row">
        <div className="col-xs-10 col-xs-offset-1">
          <h1>Pets By Owner Gender</h1>
          {this.state.loading ? <label>Loading...</label> :
            this.state.error ? <label>Error: Something bad happened</label> : <div className="col-xs-8">
              {this.renderCats(this.state.cats.male, 'Male')}
              {this.renderCats(this.state.cats.female, 'Female')}
            </div>}
        </div>
      </div>
    </div>
  }

/*
 * Render the Pet component
 */ 
  renderCats(cats, ownersGender) {
    return <Pet gender={ownersGender} cats={cats}/>
  }
}

/*
 * Render the component after DOM is loaded
 */ 
document.addEventListener('DOMContentLoaded', function() {
  render(<App />, document.getElementById('app'));
});

export default App;
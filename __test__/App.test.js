'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import App from "../src/app/components/App.jsx";
import Pet from "../src/app/components/Pet.jsx";
import renderer from 'react-test-renderer';
import {mount,shallow} from "enzyme";
import axios from 'axios';
import 'babel-polyfill'
var data = require('./data.json');

describe('Sorting of the Pets', () => {
  
  test('should sort the given array of pets for males and females',()=>{
      let app = new App;
     const result = app.sortList({
        male: ['Garfield', 'Tom', 'Nemo'],
        female: ['Sam', 'Max']
      })

      expect(result.male.length).toBe(3)
      expect(result.female.length).toBe(2)
      expect(result.male[0]).toBe("Garfield")
      expect(result.female[0]).toBe("Max")
      expect(result.female[1]).toBe("Sam")
  });
  test('should not throw an error, but sort if either of the array is empty',()=>{
      let app = new App;
     const result = app.sortList({
        male: ['Garfield', 'Tom', 'Nemo'],
        female: []
      })

      expect(result.male.length).toBe(3)
      expect(result.female.length).toBe(0)
      expect(result.male[1]).toBe("Nemo")
  });
  test('should not throw an error, but sort if either of the array is undefined',()=>{
      let app = new App;
     const result = app.sortList({
        male: ['Garfield', 'Tom', 'Nemo'],
        female: undefined
      })

      expect(result.male.length).toBe(3)
      expect(result.female.length).toBe(0)
      expect(result.male[1]).toBe("Nemo")
  });
  test('should not throw an error, but sort if both of the array is undefined or empty',()=>{
      let app = new App;
     const result = app.sortList({
        male: [],
        female: undefined
      })
      expect(result).toBeDefined()
      expect(result.female.length).toBe(0)
      expect(result.male.length).toBe(0)

  });
  test('should not throw an error, if array is undefined',()=>{
      let app = new App;
      const result = app.sortList(undefined);

      expect(result).toBeFalsy()
      expect(result).toBeUndefined()
     
  });
});

describe('Categorizing of the Pets', () => {
  
  test('should sort the given array of pets for males and females',()=>{
      let app = new App;
     const result = app.categorizeData(data)

      expect(result.male.length).toBe(4)
      expect(result.female.length).toBe(3)
      expect(result.male[0]).toBe("Garfield")
      expect(result.female[0]).toBe("Garfield")
      expect(result.female[1]).toBe("Tabby")
  });
  test('should sort the given array of pets for males and females if there are no males',()=>{
      let app = new App;
     const result = app.categorizeData([
            {
                "name": "Samantha",
                "gender": "Female",
                "age": 40,
                "pets": [
                    {
                        "name": "Tabby",
                        "type": "Cat"
                    }
                ]
            },
            {
                "name": "Alice",
                "gender": "Female",
                "age": 64,
                "pets": [
                    {
                        "name": "Simba",
                        "type": "Cat"
                    },
                    {
                        "name": "Nemo",
                        "type": "Fish"
                    }
                ]
            }
        ])

      expect(result).toBeDefined()
      expect(result.male.length).toBe(0)
      expect(result.female.length).toBe(2)
      expect(result.female[0]).toBe("Tabby")
      expect(result.female[2]).toBeUndefined()
  });
  test('should sort the given array of pets for males and females if there are no cats in female',()=>{
      let app = new App;
     const result = app.categorizeData([
            {
                "name": "Samantha",
                "gender": "Male",
                "age": 40,
                "pets": [
                    {
                        "name": "Tabby",
                        "type": "Cat"
                    }
                ]
            },
            {
                "name": "Alice",
                "gender": "Female",
                "age": 64,
                "pets": [
                    {
                        "name": "Simba",
                        "type": "Dog"
                    },
                    {
                        "name": "Nemo",
                        "type": "Fish"
                    }
                ]
            }
        ])

      expect(result).toBeDefined()
      expect(result.female.length).toBe(0)
      expect(result.male.length).toBe(1)
      expect(result.male[0]).toBe("Tabby")
      expect(result.female[2]).toBeUndefined()
  });
  test('should sort the given array of pets for males and females, if any pets array is null for owner',()=>{
      let app = new App;
     const result = app.categorizeData(data)

      expect(result.male.length).toBe(4)
      expect(result.female.length).toBe(3)
      expect(result.male[0]).toBe("Garfield")
      expect(result.female[0]).toBe("Garfield")
      expect(result.female[1]).toBe("Tabby")
  });
  test('should not throw an error, if array is undefined',()=>{
      let app = new App;
      const result = app.categorizeData(undefined);

      expect(result).toBeFalsy()
      expect(result).toBeUndefined()
     
  });
  test('should not throw an error, if array is empty',()=>{
      let app = new App;
      const result = app.categorizeData([]);

      expect(result).toBeDefined()
       expect(result.female.length).toBe(0)
        expect(result.male.length).toBe(0)
     
  });

});

describe('Create cat list', () => {
  
  test("should have empty data for males and females",()=>{
      let app = new App;
     const result = app.createCatList();
     expect(result).toBeDefined()
     expect(result.male.length).toBe(0)
     expect(result.female.length).toBe(0)

      
  });
 });

describe('Process data ', () => {
  
   test('Should not throw error if data is empty',()=>{
      let app = new App;
     const result = app.processData([]);
     expect(result).toBeUndefined();
          
   });
   test('Should not throw error if data is undefined',()=>{
      let app = new App;
     const result = app.processData(undefined);
     expect(result).toBeUndefined();
            
   });
});
describe('Render app component', () => {
 
   test('Should show Pets list ',()=>{
      let app = new App;
     
     let component = mount(<App />);

          component.setState({ cats:{
                        male: ['Garfield', 'Nemo', 'Tom'],
                        female: ['Max','Sam']
                    },loading:false});
        
    expect(component.find('ul').first().children().length).toEqual(3)
    expect(component.find('ul').last().children().length).toEqual(2)
    expect(component.find('ul').last().children().last().text()).toEqual('Sam')
    expect(component.find('ul').first().children().last().text()).toEqual('Tom')
  });
     test('Should show loading if there are no pets yet received from service ',()=>{
      let app = new App;
     
     let component = mount(<App />);

          component.setState({ cats:{},loading:true});
        
    expect(component.find('label').text()).toEqual('Loading...');
    
  });
  test('Should show loading if there is a service error ',()=>{
      let app = new App;
     
     let component = mount(<App />);

     component.setState({ cats:{},error:true,loading:false});
        
    expect(component.find('label').text()).toEqual('Error: Something bad happened');
    
  });

});
describe('Should render cats list in page', () => {
 
   test('Should show Pets list for Males',()=>{
    let app = new App;
    const result= app.renderCats( ['Garfield', 'Nemo', 'Tom'],"Male")
    expect(result).toBeDefined()
  });
  test('Should show Pets list for Females',()=>{
     let app = new App;
     const result= app.renderCats( ['Garfield', 'Nemo', 'Tom'],"Female")
     expect(result).toBeDefined()
  });
   test('Should not throw error if there cats array is empty',()=>{
     let app = new App;
     const result= app.renderCats( [],"Female")
     expect(result).toBeDefined()
  });
   

});

describe('Should Filter only cats', () => {
  test('Should not throw error if there cats array is empty',()=>{
     let app = new App;
     const result= app.filterCats( [])
     expect(result).toBeDefined()
  });
  test('Should return cats name',()=>{
     let app = new App;
     const result= app.filterCats( [
                    {
                        "name": "Simba",
                        "type": "Cat"
                    }
                ]
          
        )
        console.log(result);
     expect(result).toBeDefined()
     expect(result.length).toBe(1)
    expect(result[0]).toEqual("Simba")
  });
  test('Should return empty array, if the last pet is not cat',()=>{
     let app = new App;
     const result= app.filterCats([
                    {
                        "name": "Simba",
                        "type": "Dog"
                    },
                     {
                        "name": "Nemo",
                        "type": "Fish"
                    }
                ]
            
        )
     expect(result).toBeDefined()
     expect(result.length).toBe(0)
  });
});


describe('Should render cats list in page after dom load', () => {
 function fakeDOMLoaded() {
  const fakeEvent = document.createEvent('Event');
  fakeEvent.initEvent('DOMContentLoaded', true, true);
  window.document.dispatchEvent(fakeEvent);
}
fakeDOMLoaded();
   test('Render component in app element',()=>{
    let app = new App;
    let component = mount(<App />);

          component.setState({ cats:{
                        male: ['Garfield', 'Nemo', 'Tom'],
                        female: ['Max','Sam']
                    },loading:false});
        
    expect(component.find('ul').first().children().length).toEqual(3)
    expect(component.find('ul').last().children().length).toEqual(2)
    expect(component.find('ul').last().children().last().text()).toEqual('Sam')
    expect(component.find('ul').first().children().last().text()).toEqual('Tom')
  });
 
});


import axios from 'axios';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';

//REACTDOM lets you append things to the actual DOM

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fruits: [],
    };

    //need to bind this or it will break the app, something to do with THIS keyword being bound correctly
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  // when page gets run, the component mounts once
  //on page load you run everything here
  //setting states of fruit
  componentDidMount() {
    //when component mounts (aka only on the first time we open the page), we will run a get request to our server on the backend which has a route called fruitList

    //client -> server -> api -> server -> client
    //allows us to transfer data securely instead of potentially exposing on the front end - bank account/api keys/etc

    axios.get('/fruitList').then((response) => {
      //set's the state of our fruitsArray to the response of the data, which is just the array of objects

      this.setState({
        fruits: this.state.fruits.concat(response.data),
        //response data is concatted to fruits
      });
    });
  }

  hideModal(event) {
    document.getElementById('modal-container').classList.add('hidden');
  }

  handleOnClick(event) {
    //event.target.id is equal to the fruit name because it's tied to the click handler
    //initiliaze currentFruitClickedOn to empty string
    document.getElementById('modal-container').classList.remove('hidden');

    var currentFruitClickedOn = '';
    //iterate over this.state.fruits to find which element.name matches the current fruit clicked on
    this.state.fruits.forEach((element) => {
      //if the element.name in state matches the img.id we clicked on
      if (event.target.id === element.name) {
        //set currentFruitClicked on equal to element
        currentFruitClickedOn = element;
        console.log(currentFruitClickedOn);
        document.getElementById('name').innerHTML = currentFruitClickedOn.name;
        document.getElementById('modalId').innerHTML =
          '<b>ID: </b>' + currentFruitClickedOn.id;
        document.getElementById('modalGenus').innerHTML =
          '<b>Genus: </b>' + currentFruitClickedOn.genus;
        document.getElementById('modalFamily').innerHTML =
          '<b>Family: </b>' + currentFruitClickedOn.family;
        document.getElementById('modalOrder').innerHTML =
          '<b>Order: </b>' + currentFruitClickedOn.order;
        document.getElementById('modalNutritions').innerHTML = `
          <b>Calories: </b>
          ${currentFruitClickedOn.nutritions.calories}          
          <hr>
          <b>Carbohydrates: </b>
          ${currentFruitClickedOn.nutritions.carbohydrates} 
          <hr>
          <b>Fat: </b>
           
          ${currentFruitClickedOn.nutritions.fat} 
          <hr>
          <b>Protein: </b>
           
          ${currentFruitClickedOn.nutritions.protein} 
          <hr>
          <b>Sugar: </b>
           
          ${currentFruitClickedOn.nutritions.sugar} 
          `;

        console.log(document.getElementById('modal').innerHTML);
      }
    });
    //currentFruitClickedOn now contains the entire object with all the info of the fruit name
    console.log(currentFruitClickedOn);
    // so you need to implement the modal with the info presented in currentFruitClickedOn
  }

  render() {
    return (
      //returns a div which standard react components do
      <div className='background'>
        {/* maps over each element in our this.state.fruits array, and returns a div along with an image */}
        <div className='grid-container'>
          {this.state.fruits.map((element) => (
            <div className='fruit-card'>
              <div className='fruitName'>{element.name}</div>
              <img
                src={`https://passport-media.s3-us-west-1.amazonaws.com/images/eng-intern-interview/${element.name.toLowerCase()}.png`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://cdn.pixabay.com/photo/2021/09/07/04/32/04-32-21-616_1280.png';
                }}
                id={element.name}
                onClick={this.handleOnClick}
                className='grid-item'
              />
            </div>
          ))}
        </div>

        <div id='modal-container' className='modal-content hidden'>
          <div className='modal-header'>
            <span className='close' onClick={this.hideModal}>
              &times;
            </span>
            <h2 id='name'></h2>
          </div>
          <div className='modal-body'>
            <h2>Nutrition Facts</h2>
            <hr
              style={{ height: 5, backgroundColor: 'black', color: 'black' }}
            ></hr>
            <p id='modalNutritions'></p>
            <hr
              style={{ height: 8, backgroundColor: 'black', color: 'black' }}
            ></hr>
            <p id='modalId'></p>

            <p id='modalGenus'></p>
            <p id='modalFamily'></p>
            <p id='modalOrder'></p>
          </div>
          <div className='modal-footer'></div>
        </div>
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));

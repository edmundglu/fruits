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
        document.getElementById('modal').innerHTML = JSON.stringify(
          currentFruitClickedOn,
          null,
          4
        );
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
            <pre id='modal'></pre>
          </div>
          <div className='modal-footer'></div>
        </div>
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));

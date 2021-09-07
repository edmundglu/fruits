import axios from 'axios';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fruits: [],
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentDidMount() {
    axios.get('/fruitList').then((response) => {
      this.setState({
        fruits: this.state.fruits.concat(response.data),
      });
    });
  }

  hideModal(event) {
    document.getElementById('modal-container').classList.add('hidden');
  }

  handleOnClick(event) {
    document.getElementById('modal-container').classList.remove('hidden');

    var currentFruitClickedOn = '';

    this.state.fruits.forEach((element) => {
      if (event.target.id === element.name) {
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
      }
    });
  }

  render() {
    return (
      <div className='background'>
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

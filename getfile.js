import React from 'react';
import {addExpense} from '../actions/expenses';
import configureStore from '../store/configureStore';
import { Provider } from 'react-redux';
import AppRouter from '../routers/AppRouter';
import axios from 'axios';


class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      persons: []
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url:'http://www.json-generator.com/api/json/get/cfYCxYCwGG?indent=2',
      responseType: 'stream'
    })
    .then(res => {
      const persons = res.data;
      this.setState({ persons, isLoaded: true})
    })
    .catch(function(error){
      this.setState({
        isLoaded: true,
        error
      })
    })
  }
  render(){
    const {error, isLoaded, persons} = this.state;
    const store = configureStore();
    if(error){
      return <div>Error: {error.message}</div>
    } else if(!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        persons.map(person => (
          store.dispatch(addExpense({ description: person.first_name, note: person.last_name, amount: person.age, createAt: person.phone_number }))
        )
      ),
        <Provider store={store}>
          <AppRouter/>
        </Provider>
      );
    }
  }
}


// ReactDOM.render(<MyComponent />, document.getElementById('app'));
export default MyComponent

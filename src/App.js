import React,{ Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeList from './container/RecipeList';

class App extends Component {
  render(){
      return(
        <RecipeList/>
      )
  }
}
export default App;

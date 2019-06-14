import React,{ Component } from 'react';
import RecipeDetail from "../component/RecipeDetail";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

class RecipeList extends Component {
    state = {
        recipes: [],
        addMode: false
    };

    componentDidMount() {
        axios.get('http://10.0.1.119:8080/api/v1/recipes').then(res => {
            const recipes = res.data;
            this.setState({recipes: recipes});
        });
    }

    delete = (id) => () => {
        axios.delete('http://10.0.1.119:8080/api/v1/recipes/' + id).then(res => {
            this.setState({
                recipes: this.state.recipes.filter(item => item.id !== id)
            });
            console.log(res.data);
        });
    };

    toggleAddMode = () => {
        this.setState({addMode: !this.state.addMode});
    };

    add = (recipe) => {
        let recipeWithDescAndIngredients = {...recipe, id:this.state.recipes[this.state.recipes.length-1].id+1, ingredients: [{
                "recipeId": 71,
                "ingredientId": 1,
                "name": "Dark rum (Appleton Estate Reserve)",
                "quantity": 2,
                "unit": "oz"
            }], instructions: 'breeeeeh'};

        axios.post('http://10.0.1.119:8080/api/v1/recipes/', recipeWithDescAndIngredients )
            .then( res => {
                console.log(res);
                this.setState({
                    recipes: this.state.recipes.concat(
                        {...recipe, id: this.state.recipes.length}),
                });
            })
        this.setState({addMode:false});
    };
    render() {
        return(
            <div className="container">
                <div className="row">
                    {this.state.recipes.map( recipe =>
                        <div className="col-sm-12 col-lg-2 col-md-3">
                            <RecipeDetail key={recipe.id} recipeProp={recipe} deleteProp={this.delete}/>
                        </div>)
                    }
                    <div className="col-md-3">
                        {
                            this.state.addMode ?
                                <RecipeDetail add={this.add} addMode={this.state.addMode}/> :
                                <FontAwesomeIcon onClick={this.toggleAddMode} icon={faPlusSquare}/>
                        }
                    </div>
                </div>
            </div>
        )
    }
} export default RecipeList;
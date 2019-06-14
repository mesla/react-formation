import React,{ Component } from 'react';
import {Card, CardImg, CardBody, CardTitle, CardText, Button} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

class RecipeDetail extends Component {
    state = {
        recipeState: this.props.recipeProp,
        editMode: !this.props.recipeProp || false,
        ingredients:[]
    };

    toggleEditMode = () => {
        this.setState({ editMode: !this.state.editMode});
        if(this.props.addMode) this.props.add(this.state.recipeState);
        if(this.state.editMode) this.update();
    };

    update = () => {
      axios.patch('http://10.0.1.119:8080/api/v1/recipes/', this.state.recipeState).then(res => {
          console.log(res);
      })
    };

    onPictureChange = event => {
        this.setState({recipeState: {...this.state.recipeState, picture: event.target.value}})
    };
    onNameChange = event => {
        this.setState({recipeState: {...this.state.recipeState, name: event.target.value}})
    };
    onDescriptionChange = event => {
        this.setState({recipeState: {...this.state.recipeState, description: event.target.value}})
    };

    render() {
        let {recipeState} = this.state;
        return (
            <Card>
                <CardImg top width="100%" src={recipeState && recipeState.picture} alt="Card image cap" />
                { this.state.editMode && <input value={recipeState && recipeState.picture} onChange={this.onPictureChange}/> }
                <CardBody>
                    {
                        this.state.editMode ?
                            <input value={recipeState && recipeState.name} onChange={this.onNameChange}/> :
                            <CardTitle>{recipeState.name}</CardTitle>
                    }
                    {
                        this.state.editMode ?
                            <textarea value={recipeState && recipeState.description} onChange={this.onDescriptionChange}/> :
                            <CardText>{recipeState.description}</CardText>
                    }
                    {this.props.recipeProp && <Button onClick={this.props.deleteProp(recipeState.id)}><FontAwesomeIcon icon={faTrash}/></Button>}
                    <Button onClick={this.toggleEditMode}><FontAwesomeIcon icon={faPen}/></Button>
                </CardBody>
            </Card>
        )
    }
} export default RecipeDetail;
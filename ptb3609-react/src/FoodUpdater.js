import React from 'react';
import { Row, Col } from 'reactstrap';
import './Nutrikit.css';

class FoodUpdater extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            field: 'name',
            food: '',
            data: ''
        };

        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleChangeFood = this.handleChangeFood.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);
    }

    handleChangeField(event){
        this.setState({
            field: event.target.value
        });
    }

    handleChangeFood(event){
        this.setState({
            food: event.target.value
        });
    }

    handleChangeData(event){
        this.setState({
            data: event.target.value
        });
    }

    render(){
        return(
            <Row xs="4">
                <Col xs="auto">
                    <label>
                        Food:
                        <textarea value={this.state.food} onChange={this.handleChangeFood}/>
                    </label>
                </Col>

                <Col xs="auto">
                    <label>Field:</label>
                    <br></br>
                    <select value={this.state.field} onChange={this.handleChangeField}>
                        <option>name</option>
                        <option>calories</option>
                        <option>total_fat</option>
                        <option>sat_fat</option>
                        <option>trans_fat</option>
                        <option>protein</option>
                        <option>total_carbs</option>
                    </select>
                </Col>

                <Col xs="auto">
                    <label>
                        Data:
                        <textarea value={this.state.data} onChange={this.handleChangeData}/>
                    </label>
                </Col>

                <Col xs="auto">
                    <br></br>
                    <button type="button" value={[this.state.food, this.state.field, this.state.data]} onClick={this.props.handleUpdate}>Submit</button>
                </Col>
            </Row>
        );
    }
}


export default FoodUpdater;

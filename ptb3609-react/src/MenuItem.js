import React from 'react';
import './Nutrikit.css';

class MenuItem extends React.Component{
    constructor(props){
        super(props);

        this.state = {value: ''};
    }

    addFoodSelection(calories, food){
        return(
            <option value={calories}>{food}</option>
        )
    }

    createMenu(foodList){
        var foodMenu = foodList.foodList
        var food;
        var calories;
        let opt = [];
        if(foodMenu.length > 0){
            for(var i=0; i<foodMenu.length;i++){
                food = foodMenu[i].food;
                calories = foodMenu[i].calories;
                opt.push(<option value={calories} id={food}>{food}</option>)
            }

            return opt
        }
        return <option>Select a category</option>
    }

    render(){
        return(
            <span>
                <label class="block" for="menuItems">Menu Items</label>
                <select class='select' id="menuItems" size={5} onChange={this.props.handleChange}>
                    <this.createMenu foodList={this.props.foods}/>
                </select>
            </span>
        );
    }
}

export default MenuItem;
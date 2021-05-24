//import React, {useState} from 'react';
//import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import React from 'react';
import './Nutrikit.css';

class Categories extends React.Component{
    constructor(props){
        super(props);

        this.state = {value: ''};
    }

    render(){
        return(
            <span>
                <label class="block" for="foodGroups">Categories</label>
                <select id="foodGroups" onChange={this.props.handleChange}>
                    <option></option>
                    <option>Proteins</option>
                    <option>Fruits</option>
                    <option>Vegetables</option>
                    <option>Grains</option>
                    <option>Dairy</option>
                </select>
            </span>
        );
    }
}


export default Categories

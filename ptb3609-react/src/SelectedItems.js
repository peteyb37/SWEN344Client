import React from 'react';
import './Nutrikit.css';

class SelectedItems extends React.Component{

    buildMenu(selItems){
        let opt = [];
        var selMenu = selItems.selItems;
        var curItem;

        if(selMenu.length > 0){
            for(var i=0; i<selMenu.length;i++){
                curItem = selMenu[i];

                opt.push(<option value={curItem}>{curItem}</option>);
            }
            return opt
        }
        return <></>
        
    }

    render(){
        return(
            <span>
                <label class="block" for="selectedItems">Selected Items</label>
                <select class='select' id="selectedItems" size={5} onChange={this.props.handleChange}>
                    <this.buildMenu selItems={this.props.foods}/>
                </select>
        <p id="calories" class="block">Total Calories: {this.props.totalCal}</p>
            </span>
        );
    }
}

export default SelectedItems;
import React from 'react';
import './Nutrikit.css';
import Categories from './Categories';
import MenuItem from './MenuItem';
import EditButton from './EditButton';
import SelectedItems from './SelectedItems';
import ProgressBar from './ProgressBar';
import NutritionLabel from './NutritionLabel';
import GoalCal from './GoalCal';
import FoodUpdater from './FoodUpdater';

class Nutrikit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedCategory: '',
            selectedMenuItemCalorie: '',
            selectedMenuItemName: '',
            selectedItems: [],
            selectedItemsCalories: [],
            selectedResultItem: '',
            addRemove: true,
            goalCalories: 2000,
            //States for update food method
            newUpdate: false,
            newData: '',
            newChange: '',
            newFood: ''
        }
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeMenuItem = this.handleChangeMenuItem.bind(this);
        this.handleClickButton = this.handleClickButton.bind(this);
        this.handleChangeSelectedItems = this.handleChangeSelectedItems.bind(this);
        
        this.handleUpdateForm = this.handleUpdateForm.bind(this);

        this.addHundred = this.addHundred.bind(this);
        this.addTen = this.addTen.bind(this);
        this.subHundred = this.subHundred.bind(this);
        this.subTen = this.subTen.bind(this);
    }

    handleChangeCategory(event){
        this.setState({
            selectedCategory: event.target.value
        });
    }

    handleChangeMenuItem(event){
        this.setState({
            selectedMenuItemCalorie: event.target.value,
            selectedMenuItemName: event.target.options[event.target.selectedIndex].text,
            addRemove: true
        });
    }

    handleClickButton(event){
        if(this.state.addRemove){
            if(this.state.selectedCategory !== '' && this.state.selectedMenuItemName !== 'Select a category' && this.state.selectedMenuItemName !== ''){
                let allSelectedItems = this.state.selectedItems;
                allSelectedItems.push(this.state.selectedMenuItemName);
                let allSelectedItemCalories = this.state.selectedItemsCalories;
                allSelectedItemCalories.push(this.state.selectedMenuItemCalorie);
                
                this.setState({
                    selectedItems: allSelectedItems,
                    selectedItemsCalories: allSelectedItemCalories
                });
            }
            
        }else{

            let allSelectedItems = this.state.selectedItems;
            var index = allSelectedItems.indexOf(this.state.selectedResultItem);
            allSelectedItems.splice(index, 1);
            let allSelectedItemCalories = this.state.selectedItemsCalories;
            allSelectedItemCalories.splice(index, 1);

            this.setState({
                selectedItems: allSelectedItems,
                selectedItemsCalories: allSelectedItemCalories
            });
        }

    }

    handleChangeSelectedItems(event){
        this.setState({
            selectedResultItem: event.target.value,
            addRemove: false
        });
    }

    handleUpdateForm(event){

        const targVals = event.target.value

        var targValsSplit = targVals.split(",")

        var data = targValsSplit[2]
        var food = targValsSplit[0]
        var change = targValsSplit[1]

        console.log("Data: " + data + "   Food: " + food + "    Change: " + change)

        this.setState({
            newData: data,
            newChange: change,
            newFood: food,
            newUpdate: true
        });
    }

    getMenu(props){
        let foodType = [];
        if(this.state.selectedCategory === 'Proteins'){
            foodType = this.props.proteins;
        }else if(this.state.selectedCategory === 'Fruits'){
            foodType = this.props.fruits;
        }else if(this.state.selectedCategory === 'Vegetables'){
            foodType = this.props.vegetables;
        }else if(this.state.selectedCategory === 'Dairy'){
            foodType = this.props.dairy;
        }else if(this.state.selectedCategory === 'Grains'){
            foodType = this.props.grains;
        }

        if(foodType[0] !== null){
            return foodType
        }
        return [];
    }

    getNutritionMenu(props){

        if(this.state.selectedMenuItemName !== ''){
            for(const key of Object.entries(this.props)){
                for(const food of Object.entries(key[1])){
                    if(this.state.selectedMenuItemName === food[1].food){
                        return food[1]
                    }
                }
            }
        }
        return ""
    }

    getNutritionSelected(props){

        let tfat = 0;
        let sat = 0;
        let trans = 0;
        let prot = 0;
        let tcarbs = 0;

        if(this.state.selectedItems.length !== 0){
            for(var i = 0; i < this.state.selectedItems.length; i++){
                for(const key of Object.entries(this.props)){
                    for(const food of Object.entries(key[1])){
                        if(this.state.selectedItems[i] === food[1].food){
                            tfat = tfat + food[1].total_fat;
                            sat = sat + food[1].saturated_fat;
                            trans = trans + food[1].trans_fat;
                            prot = prot + food[1].protein;
                            tcarbs = tcarbs + food[1].total_carbohydrates;
                        }
                    }
                }
            }
        }

        var foodInfo = {
            'total_fat' : tfat, 
            'saturated_fat' : sat, 
            'trans_fat' : trans, 
            'protein' : prot, 
            'total_carbohydrates' : tcarbs
        }

        return foodInfo

    }

    getNutritionLabel(){
        let MenuFood = this.getNutritionMenu();
        let SelectedFoodInfo = this.getNutritionSelected();
        return <NutritionLabel MenuSelection={MenuFood} totalCal={this.getTotalCalories()} foodInfo={SelectedFoodInfo}/>
    }



    getTotalCalories(){
        let calCount = 0;
        for(var i=0; i<this.state.selectedItemsCalories.length; i++){
            calCount = calCount + parseInt(this.state.selectedItemsCalories[i]);
        }
        return calCount;
    }

    addTen(){
        let tempCal = this.state.goalCalories + 10
        this.setState({
            goalCalories : tempCal
        });
    }

    addHundred(){
        let tempCal = this.state.goalCalories + 100
        this.setState({
            goalCalories : tempCal
        });
    }

    subTen(){
        let tempCal = this.state.goalCalories - 10
        if(tempCal < 0){
            tempCal = 0;
        }
        this.setState({
            goalCalories : tempCal
        });
    }

    subHundred(){
        let tempCal = this.state.goalCalories - 100
        if(tempCal < 0){
            tempCal = 0;
        }
        this.setState({
            goalCalories : tempCal
        });
    }

    //API Calls to fetch DB
    componentDidMount(){

        if(this.state.newUpdate){

            console.log("NEW UPDATE BABY")

            const formData = new FormData();
            formData.append('food', this.state.newFood);
            formData.append('data', this.state.newData);
            formData.append('change', this.state.newChange)

            fetch('/food', {
                method: 'PUT',
                body: formData
            }).then(response => response.json())
            .then((json) => {
                console.log("Success")
             })
            .catch(error => {
                console.log("ERROR BAD FETCHBY BOY")
            });

            this.setState({
                newUpdate : false
            });
        }






        fetch('/food?category=proteins')
        .then(
            (response) =>
            {
                if(response.status === 200)
                {
                    return(response.json()) ;
                }else{
                    console.log("HTTP error:" + response.status + ":" +  response.statusText);
                    return ([ ["status ", response.status]]);
                }
            }
        )
        .then((jsonOutput) =>
            {
                for(var i = 0; i < 5; i++){
                    this.props.proteins.push(jsonOutput[i])
                } 
            }
        )


        fetch('/food?category=fruits')
        .then(
            (response) =>
            {
                if(response.status === 200)
                {
                    return(response.json()) ;
                }else{
                    console.log("HTTP error:" + response.status + ":" +  response.statusText);
                    return ([ ["status ", response.status]]);
                }
            }
        )
        .then((jsonOutput) =>
            {
                for(var i = 0; i < 5; i++){
                    this.props.fruits.push(jsonOutput[i])
                } 
            }
        )



        fetch('/food?category=vegetables')
        .then(
            (response) =>
            {
                if(response.status === 200)
                {
                    return(response.json()) ;
                }else{
                    console.log("HTTP error:" + response.status + ":" +  response.statusText);
                    return ([ ["status ", response.status]]);
                }
            }
        )
        .then((jsonOutput) =>
            {
                for(var i = 0; i < 5; i++){
                    this.props.vegetables.push(jsonOutput[i])
                } 
            }
        )


        fetch('/food?category=grains')
        .then(
            (response) =>
            {
                if(response.status === 200)
                {
                    return(response.json()) ;
                }else{
                    console.log("HTTP error:" + response.status + ":" +  response.statusText);
                    return ([ ["status ", response.status]]);
                }
            }
        )
        .then((jsonOutput) =>
            {
                for(var i = 0; i < 5; i++){
                    this.props.grains.push(jsonOutput[i])
                } 
            }
        )


        fetch('/food?category=dairy')
        .then(
            (response) =>
            {
                if(response.status === 200)
                {
                    return(response.json()) ;
                }else{
                    console.log("HTTP error:" + response.status + ":" +  response.statusText);
                    return ([ ["status ", response.status]]);
                }
            }
        )
        .then((jsonOutput) =>
            {
                for(var i = 0; i < 5; i++){
                    this.props.dairy.push(jsonOutput[i])
                } 
            }
        )

    }

    componentDidUpdate(){
        if(this.state.newUpdate){

            const formData = new FormData();
            formData.append('food', this.state.newFood);
            formData.append('data', this.state.newData);
            formData.append('change', this.state.newChange)

            fetch('/food', {
                method: 'PUT',
                body: formData
            }).then(response => response.json())
            .then((json) => {
                console.log("Success")
             })
            .catch(error => {
                console.log("Error: Could not update")
            });

            this.setState({
                newUpdate : false
            });
        }
    }



    render(){
        return(
            <body>
                <h1 class="headingOne">NutriKit Food Planner</h1>
                <h3 class="subHeading">NutriKit allows you to select your groceries, and track your nutritional progress (good or bad)</h3>
                <br></br>
                <div class>
                    <div class="container">
                        <div class="row justify-content-around">
                            <div class="col-md-auto">
                                <Categories handleChange={this.handleChangeCategory}/>
                            </div>
                            <div class="col-md-auto">
                                <MenuItem handleChange={this.handleChangeMenuItem} foods={this.getMenu()}/>
                            </div>
                            <div class="col-md-auto">
                                <EditButton handleChange={this.handleClickButton} buttonType={this.state.addRemove}/>
                            </div>
                            <div class="col-md-auto">
                                <SelectedItems handleChange={this.handleChangeSelectedItems} foods={this.state.selectedItems} totalCal={this.getTotalCalories()}/>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-md-auto">
                                <a href="https://www.fatsecret.com/calories-nutrition/">
                                    <div class="col-md-auto">
                                        *Nutritional information source
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="row"><br></br></div>
                        <div class="row justify-content-center">
                            <div class="col-md-auto">
                                {this.getNutritionLabel()}
                            </div>
                        </div>
                        <div class="row"><br></br></div>
                        <div class="row justify-content-center">
                            <div class="col-md-auto">
                                <a href="https://www.fda.gov/food/new-nutrition-facts-label/daily-value-new-nutrition-and-supplement-facts-labels">
                                    <div class="col-md-auto">
                                        *Indicators based off of a 2,000 calorie diet
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="row"><br></br></div>
                        <div class="row justify-content-center">
                            <div class="col-md-auto">
                                <GoalCal handleSubHundred={this.subHundred} handleSubTen={this.subTen} handleAddTen={this.addTen} handleAddHundred={this.addHundred} gCal={this.state.goalCalories}/>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col">
                                <ProgressBar totalCal={this.getTotalCalories()} gCal={this.state.goalCalories}/>
                            </div>
                        </div>
                        <div class="row"><br></br></div>
                        <div class="row"><br></br></div>
                        <div class="row"><br></br></div>
                        <div class="row"><br></br></div>
                        <div class="row justify-content-center">
                            Food Updater: Enter type of food (ex. steak), select field, and enter data (ex. 50.5).
                        </div>
                        <div class="row justify-content-center">
                            *MUST REFRESH FOR CHANGES TO TAKE EFFECT*
                        </div>
                        <div class="row"><br></br></div>
                        <div class="row justify-content-center">
                            <div class="col-md-auto">
                                <FoodUpdater handleUpdate={this.handleUpdateForm}/>
                            </div>
                        </div>
                        <div class="row"><br></br></div>
                    </div>
                </div>
            </body>
            
        );
    }
}

export default Nutrikit;
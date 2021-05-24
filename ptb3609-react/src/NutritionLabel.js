import React from 'react';
import { Card, CardTitle, CardSubtitle, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

const NutritionLabel = (props) => {

    //Based on a 2000 Calorie Diet
    let tfatDV = 78;
    let tCalDV = 2000;
    let satDV = 20;
    let protDV = 50;
    let tCarbDV = 275;

    const getPercentDV = (num) => {
        return 0.2 * num
    }

    const getDV = (num, type, size) => {
        if(type === "tfat"){
            if(num < getPercentDV(tfatDV) && size === "portion"){
                return "success"
            }else if(num < tfatDV && size === "full"){
                return "success"
            }else{
                return "danger"
            }
        }else if(type === "sat"){
            if(num < getPercentDV(satDV) && size === "portion"){
                return "success"
            }else if(num < satDV && size === "full"){
                return "success"
            }else{
                return "danger"
            }
        }else if(type === "prot"){
            if(num < getPercentDV(protDV) && size === "portion"){
                return "success"
            }else if(num < protDV && size === "full"){
                return "success"
            }else{
                return "danger"
            }
        }else if(type === "tcarbs"){
            if(num < getPercentDV(tCarbDV) && size === "portion"){
                return "success"
            }else if(num < tCarbDV && size === "full"){
                return "success"
            }else{
                return "danger"
            }
        }else if(type === "cal"){
            if(num < getPercentDV(tCalDV) && size === "portion"){
                return "success"
            }else if(num < tCalDV && size === "full"){
                return "success"
            }else{
                return "danger"
            }
        }else{
            return "info"
        }
        
        
        
        
    }


    const getMenuInfo = () => {

        let food = "Menu Food Item";
        let cal = 0;
        let sat = 0;
        let tran = 0;
        let totalfat = 0;
        let prot = 0;
        let totalcarb = 0;

        if(props.MenuSelection !== ""){
            food = props.MenuSelection.food;
            cal = props.MenuSelection.calories;
            totalfat = props.MenuSelection.total_fat;
            sat = props.MenuSelection.saturated_fat;
            tran = props.MenuSelection.trans_fat;
            prot = props.MenuSelection.protein;
            totalcarb = props.MenuSelection.total_carbohydrates;
        }

        let tfatColorDV = getDV(totalfat, "tfat", "portion")
        let satColorDV = getDV(sat, "sat", "portion")
        let protColorDV = getDV(prot, "prot", "portion")
        let tCarbsColorDV = getDV(totalcarb, "tcarbs", "portion")
        let calColorDV = getDV(cal, "cal", "portion")

        return  <Col sm="6" xs="auto">
                    <Card body inverse color={calColorDV}>
                        <CardTitle tag="h5">{food}</CardTitle>
                        <CardSubtitle tag="h6">Calories: {cal}</CardSubtitle>
                        <ListGroup flush>
                            <ListGroupItem color={tfatColorDV}>Total Fat: {totalfat}g</ListGroupItem>
                            <ListGroupItem color={satColorDV}>Sat Fat: {sat}g</ListGroupItem>
                            <ListGroupItem color="info">Trans Fat: {tran}g</ListGroupItem>
                            <ListGroupItem color={protColorDV}>Protein: {prot}g</ListGroupItem>
                            <ListGroupItem color={tCarbsColorDV}>Total Carbs: {totalcarb}g</ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
    }





    const getSelectionInfo = () => {

        let food = "Selected Food Items";
        let cal = props.totalCal;
        let sat = props.foodInfo.saturated_fat;
        let tran = props.foodInfo.trans_fat;
        let totalfat = props.foodInfo.total_fat;
        let prot = props.foodInfo.protein;
        let totalcarb = props.foodInfo.total_carbohydrates;

        let tfatColorDV = getDV(totalfat, "tfat", "full")
        let satColorDV = getDV(sat, "sat", "full")
        let protColorDV = getDV(prot, "prot", "full")
        let tCarbsColorDV = getDV(totalcarb, "tcarbs", "full")
        let calColorDV = getDV(cal, "cal", "full")

        return  <Col sm="6" xs="auto">
                    <Card body inverse color={calColorDV}>
                        <CardTitle tag="h5">{food}</CardTitle>
                        <CardSubtitle tag="h6">Calories: {cal}</CardSubtitle>
                        <ListGroup flush>
                            <ListGroupItem color={tfatColorDV}>Total Fat: {Number(totalfat).toFixed(2)}g</ListGroupItem>
                            <ListGroupItem color={satColorDV}>Sat Fat: {Number(sat).toFixed(2)}g</ListGroupItem>
                            <ListGroupItem color="info">Trans Fat: {Number(tran).toFixed(2)}g</ListGroupItem>
                            <ListGroupItem color={protColorDV}>Protein: {Number(prot).toFixed(2)}g</ListGroupItem>
                            <ListGroupItem color={tCarbsColorDV}>Total Carbs: {Number(totalcarb).toFixed(2)}g</ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
    }



    return (
        <Row md="2">
            {getMenuInfo()}
            {getSelectionInfo()}
        </Row>
    );
};

export default NutritionLabel;
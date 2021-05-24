import React from 'react';
import './Nutrikit.css';
import { Button, Row, Col, Alert } from 'reactstrap';

const GoalCal = (props) => {

    return (
        <Row xs="5">
            <Col xs="auto">
                <Button color="danger" onClick={props.handleSubHundred} active>-100</Button>
            </Col>
            <Col xs="auto">
                <Button color="danger" onClick={props.handleSubTen} active>-10</Button>
            </Col>
            <Col xs="auto">
                Total Calorie Goal:
                <Alert color="dark">{props.gCal}</Alert>
            </Col>
            <Col xs="auto">
                <Button color="success" onClick={props.handleAddTen} active>+10</Button>
            </Col>
            <Col xs="auto">
                <Button color="success" onClick={props.handleAddHundred} active>+100</Button>
            </Col>
        </Row>
    );
}




export default GoalCal;
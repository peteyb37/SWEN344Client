import React from 'react';
import './Nutrikit.css';
import { Button } from 'reactstrap';

const EditButton = (props) => {

    const getAddButtonStatus = () => {
        if(props.buttonType){
            return <Button color="success" onClick={props.handleChange} active>Add</Button>
        }else{
            return <Button color="success" onClick={props.handleChange} disabled>Add</Button>
        }
    }

    const getRemoveButtonStatus = () => {
        if(props.buttonType){
            return <Button color="danger" onClick={props.handleChange} disabled>Remove</Button>
        }else{
            return <Button color="danger" onClick={props.handleChange} active>Remove</Button>
        }
    }


    return (
        <div>
            <br></br>
            {getAddButtonStatus()}{' '}
            <br></br>
            <br></br>
            {getRemoveButtonStatus()}{' '}
        </div>
    );
}
//}



export default EditButton;
import React,  { useState } from 'react';
import { Col, Row, Form, Button, Alert } from 'react-bootstrap';

import FormInput from '../collections/form/input/index';

import { validateExpiryDate, validateCardNumber } from './validator';
import axios from 'axios';

type formValues = {
    ccNumber: number,
    cvcNumber: number,
    expiryDate: string,
}
const RegisterCard= () => {
    const userInfo = {
        firstName: "LO-FI",
    };
    //form validators
    const [submitSuccess, setSuccess] = useState(false);
    const [submitError, setFormSubmitError] = useState(false);
    const [expiryError, setCardExpiryError] = useState<{message: string; isValid: boolean}>({
        message: "",
        isValid: true,
    });
    const [cardNumberError, setCardNumberError] = useState<{message: string; isValid: boolean}>({
        message: "",
        isValid: true,
    });

    const [cardValues,setValues] = useState<formValues>({
        ccNumber : 0,
        cvcNumber : 0,
        expiryDate: ""
    });
   
    const inputHandleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setValues({...cardValues,[event.target.name] : event.target.value});
    };

    const saveCardDetails = async (cardData: { ccNumber: number; cvcNumber: number, expiryDate: string } ) => {
        
        const saveCardAPI = "";//SOME_API_URL
        
        if (saveCardAPI !== "") {
            try {
                const saveResponse = await axios.post<formValues>(
                    saveCardAPI,
                    cardData,
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                      },
                    },
                  );
              
                  console.log(JSON.stringify(saveResponse, null, 4));
                  return true;
            } catch (error) {
                setFormSubmitError(true);
                return false;
            }
        }
        return true;// default set to true for demo only
    }
    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const { ccNumber, cvcNumber, expiryDate } = cardValues;
        
        const isValidExpiryRes = validateExpiryDate(expiryDate);
        setCardExpiryError(isValidExpiryRes);

        const isValidCardRes = validateCardNumber(ccNumber.toString());
        setCardNumberError(isValidCardRes);

        if (expiryError.isValid && cardNumberError.isValid) {
            //console.log("validation passed");
            const saveResponse = await saveCardDetails(cardValues);
            //console.log("cardValues:", cardValues);
            console.log("Card Number:", ccNumber);
            console.log("CVV:", cvcNumber);
            console.log("Expiry Date:", expiryDate);
            if (saveResponse) {
                setSuccess(true);
            } 
         } 
    };

    return (

        <div className="container p-3 register-card"> 
            <div className="form-header">
                <h2 className="header">Welcome {userInfo.firstName}</h2>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className="register-card">
                <Row className="form-fields">
                    {!cardNumberError.isValid && (
                        <Alert  variant="danger" onClose={() => setCardNumberError({message: "", isValid:true})} dismissible>
                            {cardNumberError.message}
                        </Alert>
                    )}
                    {!expiryError.isValid && (
                        <Alert  variant="danger" onClose={() => setCardExpiryError({message: "", isValid:true})} dismissible>
                            {expiryError.message}
                        </Alert>
                    )}
                    {submitError && (
                        <Alert  variant="danger" onClose={() => setFormSubmitError(false)} dismissible>
                            Card details not saved!
                        </Alert>
                    )}
                    {submitSuccess && (
                        <Alert  variant="success" onClose={() => setSuccess(false)} dismissible>
                            Card details save successfully!
                        </Alert>
                    )}
                    <Form.Group controlId="formCCNumber">
                        <FormInput required={true} type={"text"} label={"Credit card number"} name={"ccNumber"} value={cardValues.ccNumber} changeHandler={inputHandleChange} placeHolder={"Credit card number"} maxLength={16} pattern="([0-9]{16}?)" />
                    </Form.Group>
                    <Row className="group">
                        <Form.Group as={Col} controlId="formCVCNumber">
                            <FormInput required={true} type={"text"} label={"CVC"} name={"cvcNumber"} value={cardValues.cvcNumber} changeHandler={inputHandleChange} placeHolder={"CVC"} maxLength={3} pattern="([0-9]{3}?)" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formExpiryDate">
                            <FormInput required={true} type={"text"} label={"expiry"} name={"expiryDate"} value={cardValues.expiryDate} changeHandler={inputHandleChange} placeHolder={"expiry"} textMuted={"Expiry date format MM/YY"} maxLength={5} pattern="([0-9]{2}[/]?){2}" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <div className="text-center">
                            <Button type={"submit"} variant={"primary"} size="lg">Submit</Button>
                        </div>
                    </Row>
                    
                </Row>
            </form>
        </div>
    );
};
export default RegisterCard;
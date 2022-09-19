import React,  { useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';

import FormInput from '../collections/form/input/index';

type formValues = {
    ccNumber: number,
    cvcNumber: number,
    expiryDate: any,
}
const RegisterCard= () => {
    const userInfo = {
        firstName: "John",
    };
    
    const [cardValues,setValues] = useState<formValues>({
        ccNumber : 0,
        cvcNumber : 0,
        expiryDate: "",
    });

    const inputHandleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setValues({...cardValues,[event.target.name] : event.target.value});
    };

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log("cardValues:", cardValues);
    };

    return (
        <div className="container p-3 register-card"> 
            <div className="form-header">
                <h2 className="header">Welcome {userInfo.firstName}</h2>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className="mb-3">
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formCCNumber">
                        <FormInput required={true} type={"text"} label={""} name={"ccNumber"} changeHandler={inputHandleChange} placeHolder={"Credit card number"} maxLength={16} pattern="([0-9]{16}?)" />
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formCVCNumber">
                            <FormInput required={true} type={"text"} label={""} name={"cvcNumber"} changeHandler={inputHandleChange} placeHolder={"CVC"} maxLength={3} pattern="([0-9]{3}?)" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formExpiryDate">
                            <FormInput required={true} type={"text"} label={""} name={"expiryDate"} changeHandler={inputHandleChange} placeHolder={"expiry"} textMuted={"Expiry date format MM/YY"} maxLength={5} pattern="([0-9]{2}[/]?){2}" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <div className="mb-3 col text-center">
                            <Button type={"submit"} variant={"primary"} size="lg">Submit</Button>
                        </div>
                    </Row>
                    
                </Row>
            </form>
        </div>
    );
};
export default RegisterCard;
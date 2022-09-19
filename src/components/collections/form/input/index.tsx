import React from 'react';
import { Form } from 'react-bootstrap';

type FormInputProps = {
    name: string,
    type: string,
    placeHolder: string,
    required: boolean,
    label?: string, 
    controlID?: string,
    maxLength?: number,
    textMuted?: string,
    pattern?: string,
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

const FormInput = (props: FormInputProps) => {
    return ( !props ? <></> :
        <div className="mb-3">
        {props.label && <Form.Label>{props.label}</Form.Label> }
        <Form.Control required={props.required} type={props.type} name={props.name} onChange={props.changeHandler} placeholder={props.placeHolder} maxLength={props.maxLength} pattern={props.pattern} />
        {props.textMuted && <Form.Text className="text-muted">{props.textMuted}</Form.Text> }
        </div>
      
    )
};  
export default FormInput;
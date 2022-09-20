import React from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';

type FormInputProps = {
    name: string,
    type: string,
    placeHolder: string,
    required: boolean,
    label?: string, 
    value?: number | string, 
    controlID?: string,
    maxLength?: number,
    textMuted?: string,
    pattern?: string,
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

const FormInput = (props: FormInputProps) => {
    return ( !props ? <></> :
        <div className=" mb-3">
            <FloatingLabel controlId={props.controlID} label={props.label} className="mb-3">
                <Form.Control required={props.required} type={props.type} name={props.name} onChange={props.changeHandler} placeholder={props.placeHolder} maxLength={props.maxLength} pattern={props.pattern} />
                {props.textMuted && <Form.Text className="text-muted">{props.textMuted}</Form.Text>}
            </FloatingLabel>
        </div>
      
    )
};  
export default FormInput;
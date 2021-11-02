import * as React from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';


export default function FormInput({id,name,placeHoder,type,label,...rest}){



    return <FormGroup row>
        <Label
        for={id}
        sm={2}
        >
        {label}
        </Label>
        <Col sm={10}>
        <Input
            id={id}
            name={name}
            placeholder={placeHoder}
            type={type}
            {...rest}
        />
        </Col>
    </FormGroup>
}
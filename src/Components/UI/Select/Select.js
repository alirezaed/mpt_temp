import * as React from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';

export default function Select({id,name,options,label,...rest}){



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
            type="select"
            {...rest}
        >
            {options.map(item=><option key={item.value} value={item.value}>
                {item.title}
            </option>)}
        </Input>
        </Col>
    </FormGroup>
}
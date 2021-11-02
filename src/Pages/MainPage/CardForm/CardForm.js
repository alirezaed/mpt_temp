import * as React from 'react';
import useForm from '../../../Hook/useForm';
import Select from '../../../Components/UI/Select/Select';
import { Button, Form } from 'reactstrap';
import FormInput from '../../../Components/UI/FormInput/FormInput';

export default function CardForm({task,onSave}){

    const title = useForm(task && task.Title);
    const description = useForm(task && task.Description);
    const category = useForm(task && task.Category);


    const handleSave=()=>{
        onSave({
            Id : task.Id,
            Title : title.value,
            Description : description.value,
            Category : category.value,
            CreatedBy : 1,
            CreatedDate : task.Id === 0 ? new Date() : task.CreatedDate,
            Date : new Date(),
            Color : 'blue'
        });
    }

    return <Form>
        <FormInput id="title" name="title" {...title} label="Title"  />
        <FormInput id="description" name="description"  label="Description" {...description} />
        <Select options={["Planning","Doing"].map(item=>({value:item,title:item}))} name="category" id="category" {...category} label="Category" />
        <Button onClick={handleSave}>Save</Button>
    </Form>
}
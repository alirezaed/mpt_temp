import * as React from 'react';
import TaskContainer from './TaskContainer/TaskContainer';
import classes from './MainPage.module.css';
import Modal from '../../Components/UI/Modal/Modal';
import CardForm from './CardForm/CardForm';
import { TaskServiceFake } from '../../Service/TaskService';

export default function MainPage(){

    const [task,setTask] = React.useState();

    const categories =["Planning","Doing"]

    const handleAddCard=(category)=>{
        setTask({
            Category:category
        });
    }
    
    const handleShowCard=(task)=>{
        setTask(task);
    }

    const handleCloseModal=()=>{
        setTask(undefined);
    }

    const handleSave=(task)=>{
        const service = new TaskServiceFake();
        service.save(task).then(res=>{
            console.log(res);//message saved
            handleCloseModal();
        });
    }

    return <div className={classes.container}>
        <Modal title="Save Item" open={task && !!task.Category} onToggle={handleCloseModal} >
            <CardForm task={task} onSave={handleSave}/>
        </Modal>
        {categories.map(item=><TaskContainer 
            refresh={task} 
            key={item} 
            category={item}
            onAdd={handleAddCard} 
            onCardClick={handleShowCard} />)}
    </div>
}

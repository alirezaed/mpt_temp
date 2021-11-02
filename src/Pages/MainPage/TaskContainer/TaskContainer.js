import * as React from 'react';
import { TaskServiceFake } from '../../../Service/TaskService';


export default function TaskContainer({category,onAdd,onCardClick,refresh}){

    const [tasks,setTasks] = React.useState([]);

    React.useEffect(()=>{
        const service = new TaskServiceFake();
        service.getAll(category).then(res=>{
            setTasks(res.Data);
        });
    },[refresh]);

    const handleAddClick=()=>{
        onAdd && onAdd(category);
    }

    const handleCardClick=(item)=>{
        onCardClick && onCardClick(item);
    }

    return <div>
        <div>
            <button onClick={handleAddClick}>➕</button>
            {category}
        </div>
        <div>
            {tasks.map(item=><div key={item.Id} onClick={handleCardClick.bind(this,item)}>{item.Title}</div>)}
        </div>
    </div>
}

import { SortableContext, useSortable } from '@dnd-kit/sortable';
import TrashIcon from '../icons/TrashIcon';
import {  type Columns, type Id, type Task } from '../types';
import { CSS } from "@dnd-kit/utilities"
import { useState } from 'react';
import PlusIcon from '../icons/PlusIcon';
import TaskCard from './TaskCard';
import { useMemo } from 'react';


interface Props{
    column: Columns;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string) => void;
    createTask: (column: Id) => void;
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void;
    tasks: Task[];
}

function ColumnContainer(props : Props) {
    const { column, deleteColumn, updateColumn, createTask, tasks, deleteTask, updateTask } = props;

    const [editMode, setEditMode] = useState(false);

    const tasksIds = useMemo(()=>{
      return tasks.map(task => task.id);
    }, [tasks]); // Recompute when tasks change

const {setNodeRef, attributes, listeners, transform, transition, isDragging} =  useSortable({
    id: column.id,
    data:{
      type:"Column",
      column,
    },
    disabled: editMode,
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if(isDragging) {
    return (
    <div ref={setNodeRef}
    style={style}
     className="bg-gray-800 opacity-50 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col border-2 border-rose-500"
    >
    </div>)
  }

  return (
    <div 
    ref={setNodeRef}
    style={style}
    className="bg-gray-800 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      {/* Column Title */}
      <div 
      {...attributes}
      {...listeners}
      onClick={() => {setEditMode(true)}}
      className="border-gray-700 text-white font-bold h-[60px] cursor-all-scroll rounded-md rounded-b-none p-3 border-4 flex items-center justify-between">
        <div className='flex gap-2'>
          <div className='flex justify-center rounded-full bg-gray-800 px-2 py-1 text-sm'>0</div>
        {!editMode && column.title}
        {editMode && (
          <input
          className='bg-black focus:border-rose-500 border rounded outline-none px-2'
          value={column.title}
          onChange={(e)=> updateColumn(column.id, e.target.value)}
          autoFocus
          onBlur={() => {setEditMode(false)}}
          onKeyDown={(e) => {
            if(e.key !== "Enter") return;
            setEditMode(false);
          }}
        />
        )}
        </div>
      <button className="cursor-pointer stroke-gray-500 hover:stroke-white hover:bg-gray-700 px-1 py-2 rounded" onClick={()=>{deleteColumn(column.id)}}><TrashIcon /></button>
      </div>



      {/* Column Task Container */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
       <SortableContext items={tasksIds}>
       { tasks.map(task =>(
        <TaskCard key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
       ))
       }  
       </SortableContext>
      </div>


      {/* Column Footer */}
      <button className="flex gap-2 items-center border-gray-800 border-2 rounded-md p-3 hover:bg-gray-900 hover:text-rose-500 transition-colors duration-200 cursor-pointer active:bg-black" onClick={()=>{createTask(column.id)}}
      ><PlusIcon /> Add Task</button>
    </div>
  )
}

export default ColumnContainer;
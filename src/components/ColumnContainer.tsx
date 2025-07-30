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
    }, [tasks]);

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
     className="bg-gray-100 dark:bg-gray-700 opacity-50 w-[350px] h-[500px] max-h-[500px] rounded-xl flex flex-col border-2 border-blue-400 shadow-lg"
    >
    </div>)
  }

  return (
    <div 
    ref={setNodeRef}
    style={style}
    className="bg-gray-50 dark:bg-gray-800 w-[350px] h-[500px] max-h-[500px] rounded-xl flex flex-col shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Column Title */}
      <div 
      {...attributes}
      {...listeners}
      onClick={() => {setEditMode(true)}}
      className="bg-white dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white font-semibold h-[60px] cursor-grab rounded-xl rounded-b-none p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200">
        <div className='flex gap-3 items-center'>
          <div className='flex justify-center items-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2.5 py-1 text-xs font-medium min-w-[24px]'>
            {tasks.length}
          </div>
        {!editMode && <span className="text-gray-900 dark:text-white font-medium">{column.title}</span>}
        {editMode && (
          <input
          className='bg-white dark:bg-gray-600 focus:border-blue-500 border border-gray-300 dark:border-gray-500 rounded-md outline-none px-3 py-1 text-gray-900 dark:text-white font-medium'
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
      <button className="cursor-pointer stroke-gray-400 dark:stroke-gray-500 hover:stroke-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-md transition-all duration-200" onClick={()=>{deleteColumn(column.id)}}><TrashIcon /></button>
      </div>

      {/* Column Task Container */}
      <div className="flex flex-grow flex-col gap-3 p-4 overflow-x-hidden overflow-y-auto">
       <SortableContext items={tasksIds}>
       { tasks.map(task =>(
        <TaskCard key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
       ))
       }  
       </SortableContext>
      </div>

      {/* Column Footer */}
      <button className="flex gap-2 items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded-lg m-4 p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200 cursor-pointer font-medium" onClick={()=>{createTask(column.id)}}
      ><PlusIcon /> Add Task</button>
    </div>
  )
}

export default ColumnContainer;

import type { Id, Task } from "../types";
import TrashIcon from "../icons/TrashIcon";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

function TasksCard({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const {setNodeRef, attributes, listeners, transform, transition, isDragging} =  useSortable({
      id: task.id,
      data:{
        type:"Task",
        task,
      },
      disabled: editMode,
    })

     const style = {
        transition,
        transform: CSS.Transform.toString(transform),
      }

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if(isDragging) {
    return (
      <div ref={setNodeRef}
      style={style}
      className="bg-white dark:bg-gray-700 p-4 h-[100px] min-h-[100px] items-center text-left rounded-lg border-2 border-blue-400 cursor-grab opacity-50 shadow-lg"
      />
    );
  }

  if (editMode) {
    return (
      <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
        className="bg-white dark:bg-gray-700 p-4 h-[100px] min-h-[100px] items-center text-left rounded-lg border-2 border-blue-500 cursor-grab shadow-sm"
      >
        <textarea className="h-[90%] w-full resize-none focus:outline-none border-none rounded bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400" 
        value={task.content}
        autoFocus
        placeholder="Task Content Here"
        onBlur={toggleEditMode}
        onKeyDown={ (e) => {
          if (e.key === "Enter" && e.shiftKey) toggleEditMode(); 
        }}
        onChange={(e) => updateTask(task.id, e.target.value)}
      />
      </div>
    );
  }

  return (
    <div
    ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white dark:bg-gray-700 p-4 h-[100px] min-h-[100px] items-center text-left rounded-lg hover:shadow-md hover:ring-2 hover:ring-blue-200 dark:hover:ring-blue-500 cursor-grab relative task transition-all duration-200 border border-gray-200 dark:border-gray-600"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      onClick={toggleEditMode}
    >
     <p className="my-auto h-[90%] width-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
       {task.content}
     </p>
      {mouseIsOver && (
        <button
          className="stroke-gray-500 hover:stroke-red-500 absolute right-3 top-1/2 -translate-y-1/2 bg-gray-50 dark:bg-gray-600 hover:bg-red-50 dark:hover:bg-red-900/20 p-1.5 rounded-md opacity-70 hover:opacity-100 transition-all duration-200"
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task.id);
          }}
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
}

export default TasksCard;
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
        type:"task",
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
      className="bg-gray-900 p-2.5 h-[100px] min-h-[100px] items-center text-left rounded-xl border-2 border-rose-500 cursor-grab opacity-30"
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
        className="bg-gray-900 p-2.5 h-[100px] min-h-[100px] items-center text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab"
      >
        <textarea className="h-[90%] w-full resize-none focus:outline-none border-none rounded bg-transparent text-white" 
        value={task.content}
        autoFocus
        placeholder="Task Content Here"
        onBlur={toggleEditMode}
        onKeyDown={ (e) => {
          if (e.key === "Enter" && e.shiftKey)toggleEditMode(); 
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
      className="bg-gray-900 p-2.5 h-[100px] min-h-[100px] items-center text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      onClick={toggleEditMode}
    >
     <p className="my-auto h-[90%] width-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap text-white">
       {task.content}
     </p>
      {mouseIsOver && (
        <button
          className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800 p-1.5 rounded opacity-60 hover:opacity-100"
          onClick={() => {
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

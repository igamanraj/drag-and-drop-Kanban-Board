import PlusIcon from "../icons/PlusIcon";
import { useState } from "react";
import type { Columns, Id } from "../types";
import ColumnContainer from "./ColumnContainer";

function KanBanBoard() {
  const [columns, setColumns] = useState<Columns[]>([]);

  console.log(columns);

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px] ">
      <div className="m-auto flex gap-2">
        <div className="flex gap-4">
          {columns.map((col) => (
              <ColumnContainer key={col.id} column={col} deleteColumn={deleteColumn} />
          ))}
        </div>
        <button
          className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-1 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2 flex gap-2"
          onClick={() => {
            createNewColumn();
          }}
        >
          <PlusIcon /> Add Column
        </button>
      </div>
    </div>
  );

  function createNewColumn() {
    const columnToAdd: Columns = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter(col => col.id !== id);
    setColumns(filteredColumns);
  }

  function generateId() {
    return Math.floor(Math.random() * 10001);
  }
}

export default KanBanBoard;

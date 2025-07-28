import { Column } from "../types";

interface Props{
    column: Column
}

function ColumnContainer(props : Props) {
    const { column } = props;
  return (
    <div className="bg-gray-800 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      {/* Column Title */}
      <div className="p-2 border-b border-gray-700 text-white font-bold h-[60px]">
        {column.title}
      </div>
      {/* Column Task Container */}
      <div className="flex flex-grow">
        Content
      </div>
      {/* Column Footer */}
      <div>Footer Content</div>
    </div>
  )
}

export default ColumnContainer;
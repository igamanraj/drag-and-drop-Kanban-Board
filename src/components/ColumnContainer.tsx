import TrashIcon from '../icons/TrashIcon';
import { Column, type Id } from '../types';

interface Props{
    column: Column;
    deleteColumn: (id: Id) => void;
}

function ColumnContainer(props : Props) {
    const { column, deleteColumn } = props;
  return (
    <div className="bg-gray-800 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      {/* Column Title */}
      <div className="border-gray-700 text-white font-bold h-[60px] cursor-all-scroll rounded-md rounded-b-none p-3 border-4 flex items-center justify-between">
        <div className='flex gap-2'>
          <div className='flex justify-center rounded-full bg-gray-800 px-2 py-1 text-sm'>0</div>
        {column.title}
        </div>
      <button className="cursor-pointer stroke-gray-500 hover:stroke-white hover:bg-gray-700 px-1 py-2 rounded" onClick={()=>{deleteColumn(column.id)}}><TrashIcon /></button>
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
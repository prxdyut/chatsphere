import { LuSearch } from "react-icons/lu";
import { IoAddOutline } from "react-icons/io5";
export default function ChatsSearch() {
  return (
    <div className=" relative flex gap-4">
      <div className=" absolute  p-2 left-1  top-1 rounded">
        <LuSearch className=" " fontSize={18}/>
      </div>
      <input
        className=" pl-10 hover:bg-gray-100 focus:bg-gray-200 w-full rounded px-3 py-2 outline-none"
        placeholder="Search"
      />
    </div>
  );
}

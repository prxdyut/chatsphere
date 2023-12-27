export function RecievedWithAvatar({ content }) {
  return (
    <div className=" max-w-[60%]  flex gap-2">
      <img
        className=" aspect-square h-6 rounded-full "
        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
      <div className="px-4 flex flex-col pr-6 py-2 gap-2 bg-white w-max rounded-2xl rounded-tl-none">
        {content}
        <p className=" text-right opacity-75 text-xs">11:23 PM</p>
      </div>
    </div>
  );
}

export function RecievedWithoutAvatar({ content }) {
  return (
    <div className="px-4 max-w-[60%]  flex flex-col pr-6 py-2 gap-2 bg-white w-max rounded-2xl rounded-tl-none">
      {content}
      <p className=" text-right opacity-75 text-xs">11:23 PM</p>
    </div>
  );
}

export function Sent({ content }) {
  return (
    <div className="px-4 flex flex-col max-w-[60%] pr-6 py-2 gap-2 self-end bg-gray-200 w-max rounded-2xl  rounded-br-none">
      {content}
      <p className=" opacity-75 text-xs">11:23 PM</p>
    </div>
  );
}

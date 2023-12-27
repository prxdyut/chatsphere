export default function Divider({ title }) {
  return (
    <div className={`my-4 flex border relative `}>
      <p className={" absolute left-4 bg-white px-2 -top-2 text-xs opacity-75 uppercase "}>
        {title}
      </p>
    </div>
  );
}

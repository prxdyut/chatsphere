export default async function getRooms(userId, setRooms) {
  let { data } = await fetch(
    "http://localhost:5000/rooms?userId=" + userId
  ).then((res) => res.json());
  setRooms([...data]);
}

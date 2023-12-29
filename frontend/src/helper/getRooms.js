export default async function getRooms(userId, setRooms) {
  let { data } = await fetch(
    "http://195.35.23.178:5000" + "/rooms?userId=" + userId
  ).then((res) => res.json());
  setRooms([...data]);
}

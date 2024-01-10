export default async function getRooms(userId, setRooms) {
  let { data } = await fetch(
    (location.hostname == "localhost"
    ? "http://localhost:5000"
    : "https://api.chatsphere.pradyutdas.online" ) + "/rooms?userId=" + userId
  ).then((res) => res.json());
  setRooms([...data]);
}

export default async function getRooms(userId, setRooms) {
  let { data } = await fetch(
    "https://api.chatsphere.pradyutdas.online" + "/rooms?userId=" + userId
  ).then((res) => res.json());
  setRooms([...data]);
}

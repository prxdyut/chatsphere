import { apiUrl } from "./apiUrl";

export default async function getRooms(userId, setRooms) {
  let { data } = await fetch(
    apiUrl + "/rooms?userId=" + userId
  ).then((res) => res.json());
  setRooms([...data]);
}

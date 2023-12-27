export default async function getUsers(userIds, ownid, setCurrentUsers, users) {
  const USER_IDs = userIds.filter((id) => id != ownid);
  let data = users;
  const res = data.filter(({ id }) => USER_IDs.includes(id));
  setCurrentUsers(res);
}

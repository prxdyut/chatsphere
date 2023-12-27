export default async function getPeople(savePeople, users) {
  const PEOPLE_IDs = localStorage?.getItem("people")?.split(",") || [];
  let USERS = [];
  if (PEOPLE_IDs.length > 0) {
    USERS = users || [];
  } else {
    return false;
  }
  const PEOPLE_DATA = PEOPLE_IDs.map((id) =>
    USERS?.find(({ id: userId }) => userId == id)
  );
  
  const PEOPLE = PEOPLE_DATA.map(
    ({ id, username, imageUrl, firstName, lastName }) => ({
      id,
      username,
      imageUrl,
      name: firstName + " " + lastName,
    })
  );
  savePeople(PEOPLE);
}

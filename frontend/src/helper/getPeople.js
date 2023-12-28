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
    (data) => ({
      username : data?.username,
      imageUrl: data?.imageUrl,
      name: data?.firstName + " " + data?.lastName,
      id: data?.id
    })
  );
  savePeople(PEOPLE);
}

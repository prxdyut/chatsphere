import { apiUrl } from "./apiUrl";

export default function newMember(users, room, onError, onSuccess, update) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    users, room
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(apiUrl + "/room", requestOptions)
    .then((response) => response.json())
    .then((e) => {
      if (e.error) {
        onError(e.error);
      } else {
        onSuccess(`Added ${e.modifiedCount} Member`);
        update()
      }
    })
    .catch((error) => onError(JSON.stringify(error)));
}

export default function removeMember(users, room, onError, onSuccess, update) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    users, room
  });

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
console.log('yo')
  fetch("http://localhost:5000" + "/room", requestOptions)
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

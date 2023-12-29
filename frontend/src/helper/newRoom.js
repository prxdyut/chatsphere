export default function newRoom(users, name, by, onError, onSuccess, rooms, setRooms) {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    users,
    name,
    by,
    created: new Date()
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://195.35.23.178:5000" + "/room", requestOptions)
    .then((response) => response.json())
    .then((e) => {
      if (e.error) {
        onError(e.error);
      } else {
        setRooms([...rooms, e])
        onSuccess(e)
      }
    })
    .catch((error) => onError(JSON.stringify(error)));
}

import { useAuth, useUser } from "@clerk/clerk-react";

export default async function addToContact(
  input,
  userId,
  onError,
  onSuccess,
  onComplete,
  users
) {
  onError("");
  onSuccess("");
  let USER;
  const PEOPLE = localStorage?.getItem("people")?.split(",") || [];
  const IS_EMAIL = input.split("").includes("@");
  const USERS = users;
  if (IS_EMAIL) {
    const EMAILS = USERS.flatMap(
      ({ id, emailAddresses, firstName, lastName }) =>
        emailAddresses.map(
          ({ emailAddress, verification }) =>
            verification.status == "verified" && {
              id,
              emailAddress,
              name: firstName + " " + lastName,
            }
        )
    ).filter((a) => a);
    USER = EMAILS.find(({ emailAddress }) => emailAddress == input);
  } else {
    const USERNAMES = USERS.flatMap(
      ({ id, username, firstName, lastName }) => ({
        id,
        username,
        name: firstName + " " + lastName,
      })
    ).filter((a) => a);

    USER = USERNAMES.find(({ username }) => username == input);
  }

  if (USER) {
    const IS_ALREADY_IN_CONTACTS = PEOPLE.includes(USER.id);
    const IS_SELF = userId == USER.id;
    if (IS_SELF) {
      onError("You can not add yourself to your Contacts");
    } else if (IS_ALREADY_IN_CONTACTS) {
      onError(USER.name + " is already in your Contacts");
    } else {
      localStorage.setItem("people", [...PEOPLE, USER.id]);
      onSuccess(USER.name + " was added to your Contacts");
    }
  } else onError(input + " does not exist");
  onComplete();
  return;
}

export const checkInTheArrayIfTheFirstLetterMatches = (
  array,
  parameter,
  character
) => {
  return array.filter((obj) =>
    Boolean(
      obj[parameter].trim().split("")[0].toLowerCase() ==
        character.toLowerCase()
    )
  );
};

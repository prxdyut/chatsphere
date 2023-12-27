import React, { useContext } from "react";
import Divider from "./Divider";
import { checkInTheArrayIfTheFirstLetterMatches } from "../helper/checkInTheArrayIfTheFirstLetterMatches";
import { PeopleContext } from "../contexts/people";

export default function PeopleList({}) {
  const { people } = useContext(PeopleContext);

  const Alphabets = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode("A".charCodeAt(0) + index)
  );

  function Person({ name, image }) {
    return (
      <div className=" cursor-pointer block p-2 rounded  w-full hover:bg-gray-200">
        <div className=" flex align-middle justify-center items-center">
          <img
            className=" aspect-square h-10 w-10 rounded-full  object-cover"
            src={image}
            alt=""
          />
          <div className=" pl-4 flex-grow gap-1 flex flex-col  justify-center">
            <p className=" font-semibold flex-grow text-start">{name}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 flex flex-col gap-2">
      {people.length > 0 ? (
        Alphabets.map((char, i) => (
          <div
            key={i}
            className={
              !checkInTheArrayIfTheFirstLetterMatches(people, "name", char)
                .length > 0 && "hidden"
            }
          >
            <Divider title={char} />
            {checkInTheArrayIfTheFirstLetterMatches(people, "name", char).map(
              ({ name, imageUrl }, i) => (
                <React.Fragment key={i}>
                  <Person name={name} image={imageUrl} />
                </React.Fragment>
              )
            )}
          </div>
        ))
      ) : (
        <p className=" text-center text-xl opacity-75 mt-4">No Contacts</p>
      )}
    </div>
  );
}
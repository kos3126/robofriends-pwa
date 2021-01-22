import React from "react";
import Card from "./Card";

const CardList = ({ robots }) => {
  if (!robots) {
    return new Error("Nooooooo!");
  }
  return (
    <div>
      {robots.map(({ id, name, email }) => (
        <Card key={id} id={id} name={name} email={email} />
      ))}
    </div>
  );
};

export default CardList;

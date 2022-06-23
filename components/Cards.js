import { useContext } from "react";
import React, { useState } from "react";
import { LugusContext } from "../context/LugusContext";
import Card from "./Card";

const styles = {
  wrapper: "h-full w-full flex gap-[20px] flex-col ml-[60px] -mt-[50px]",
  title: "text-xl font-bolder mb-[20px] mt-[30px] ml-[30px]",
  cards: "flex items-center flex-wrap gap-[120px]",
};

const Cards = () => {
  const { assets } = useContext(LugusContext);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>New Release</div>
      <div className={styles.cards}>
        {assets.map((item) => {
          let asset = item.attributes;
          return <Card key={item.id} item={item.attributes} />;
        })}
      </div>
    </div>
  );
};

export default Cards;

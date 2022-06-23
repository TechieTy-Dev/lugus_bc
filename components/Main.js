import React, { useContext } from "react";
import { LugusContext } from "../context/LugusContext";
import Cards from "./Cards";
import Features from "./Features";
import Header from "./Header";

const styles = {
  wrapper: "h-full w-full flex flex-col mt-[50px] pr-[50px] overflow-hidden",
  recentTitle: "text-2xl font-bold text-center mb-[20px] text-center mt-[40px]",
  recentTransactionList: "flex flex-col",
  transactionCard:
    "flex justify-between mb-[20px] p-[30px] bg-[#42667e] text-white rounded-xl shadow-xl font-bold gap-[20px] text-xl",
};

const Main = () => {
  const { recentTransactions } = useContext(LugusContext);

  return (
    <div className={styles.wrapper}>
      <Header />
      <Features />
      <Cards />
      {recentTransactions.length > 0 && (
        <h1 className={styles.recentTitle}> Recent Transactions </h1>
      )}
      {recentTransactions &&
        recentTransactions.map((transactions, index) => {
          console.log(transactions);
          return (
            <div className={styles.recentTransactionList}>
              <div className={styles.transactionCard}>
                <p>From: {transactions.attributes.from_address}</p>
                <p> To: {transactions.attributes.to_address}</p>
                <p>
                  Hash: {""}
                  <a
                    target={"_blank"}
                    rel="noopener noreferrer"
                    href={`https://rinkeby.etherscan.io/tx/${transactions.attributes.hash}`}
                  >
                    {transactions.attributes.hash.slice(0, 10)}
                  </a>
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Main;

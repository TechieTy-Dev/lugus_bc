import React, { UseContext } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { LugusContext } from "../context/LugusContext";
import Transaction from "../components/Transaction";

const styles = {
  wrapper: "h-full w-full flex bg-[#fff]",
  main: "w-full h-ful flex flex-col mt-[50px]",
  tableContainer: "w-full h-full flex flex-col p-[100px] justify-center",
  pageTitle: "text-2xl font-bold text-left mt-[50px] mb-[30px]",
  transactions: "flex gap-[50px] flex-row flex-wrap",
};

const History = () => {
  const { ownedItems } = UseContext(LugusContext);
  return (
    <div className={styles.wrapper}>
      <Sidebar />

      <div className={styles.main}>
        <Header />

        <div className={styles.tableContainer}>
          {ownedItems ? (
            <div className={styles.pageTitle}>Purchase History</div>
          ) : (
            <div className={styles.pageTitle}>No Purchase History</div>
          )}
          <div className={styles.transactions}>
            {ownedItems.map((item, index) => {
              return <Transaction key={index} item={item} index={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;

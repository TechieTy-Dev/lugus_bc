import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import React from 'react';


const styles = {
  wrapper: 'h-full w-full flex bg-[#fff]'
}

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <Main />

    </div>
  )
}

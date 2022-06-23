import React from "react";
import { useContext } from "react";
import { LugusContext } from "../context/LugusContext";
import { ConnectButton } from "web3uikit";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/Lugus_logo.svg";
import { FaBox } from "react-icons/fa";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineHistory } from "react-icons/ai";
import logoFull from "../assets/Lugus.svg";

const styles = {
  wrapper: "h-full w-[300px] flex flex-col bg-[#062e54]",
  profile:
    "w-full py-16 flex flex-col justify-center items-center rounded-r-3xl bg-gradient-to-t from-[#0d141c] to-[#42667e] mt-[40px] mb-[50px] border-2 border-[#f6ab54]",
  profilePicContainer:
    "flex rounded-xl items-center justify-center w-full h-full mb-5",
  profilePic: "rounded-3xl object-cover",
  welcome: "text-md mb-2 font-bold text-2xl text-white",
  usernameInput:
    "bg-transparent border-white border-2 rounded-lg w-[80%] py-2 px-4 text-lg mt-[20px] placeholder:text-white focus:outline-none flex justify-center items-center text-white",
  walletAddress: "text-xl flex w-full justify-center font-extrabold mb-4",
  username: "flex items-center w-full justify-center",
  setNickname:
    "text-lg font-bold flex flex-1 items-center mt-[20px] mb-[20px] text-white",
  logo: "mr-4 flex object-cover",
  companyName: "text-lg font-bold flex flex-1 pl-10 items-center mt-[20px]",
  menuItem: "flex items-center text-lg font-bold cursor-pointer gap-2",
  menu: "flex flex-col w-full h-full px-10 gap-10",
};

const Sidebar = () => {
  const {
    isAuthenticated,
    nickname,
    setNickname,
    username,
    handleSetUsername,
  } = useContext(LugusContext);

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        {isAuthenticated && (
          <>
            <div className={styles.profilePicContainer}>
              <Image
                src={`https://avatars.dicebear.com/api/pixel-art/${username}.svg`}
                alt="profile"
                className={styles.profilePic}
                height={100}
                width={100}
              />
            </div>
            {!username ? (
              <>
                <div className={styles.username}>
                  <input
                    type="text"
                    placeholder="Username..."
                    className={styles.usernameInput}
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </div>
                <button
                  className={styles.setNickname}
                  onClick={handleSetUsername}
                >
                  Set Nickname
                </button>
              </>
            ) : (
              <div>
                <div className={styles.welcome}>Welcome {username}</div>
              </div>
            )}
          </>
        )}
        <div className={styles.connectButton}>
          <ConnectButton />
        </div>
      </div>
      <div className={styles.menu}>
        <Link href="/">
          <div className={styles.menuItem}>
            <Image
              src={logo}
              alt=""
              height={30}
              width={30}
              className={styles.logo}
            />
            My Lugus Account
            <br /> Board
          </div>
        </Link>
        <div className={styles.menuItem}>
          <FaBox />
          Collections
        </div>
        <div className={styles.menuItem}>
          <BsFillBookmarkFill />
          Saved
        </div>
        <div className={styles.menuItem}>
          <BsFillPersonFill />
          Friends
        </div>
        <Link href="/history">
          <div className={styles.menuItem}>
            <AiOutlineHistory />
            Transaction History
          </div>
        </Link>
      </div>
      <div className={styles.companyName}>
        <Image
          src={logoFull}
          alt="Company Name - Lugus"
          height={100}
          width={100}
        />
      </div>
    </div>
  );
};

export default Sidebar;

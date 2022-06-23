import React from "react";
import { useContext } from "react";
import { LugusContext } from "../context/LugusContext";
import logo from "../assets/Lugus_logo2.svg";
import Image from "next/image";
import { CgMenuGridO } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import { FaCoins } from "react-icons/fa";
import {
  ModalProvider,
  Modal,
  useModal,
  ModalTransition,
} from "react-simple-hook-modal";
import "react-simple-hook-modal/dist/styles.css";
import BuyModal from "./BuyModal";

const styles = {
  wrapper: "h-[60px] w-full flex items-center gap-5 px-16",
  logo: " flex items-center ml-[20px] cursor-pointer flex-1",
  search:
    "p-[25px] mr-[30px] w-[400px] h-[40px] bg-white rounded-full shadow-lg flex flex items-center border border-black",
  searchInput:
    "bg-transparent focus:outline-none border-none flex-1 items-center flex",
  menu: "flex items-center gap-6",
  menuItem: "flex items-center text-md font-bold cursor-pointer",
  coins: "ml-[10px]",
};

const Header = () => {
  const { balance, buyTokens, getBalance } = useContext(LugusContext);
  const { openModal, isModalOpen, closeModal } = useModal();

  return (
    <ModalProvider>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Image
            src={logo}
            alt="Lugus"
            height={60}
            width={120}
            className="object-cover"
          />
        </div>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search Your Assets..."
            className={styles.searchInput}
          />
          <IoMdSearch fontSize={20} />
        </div>
        <div className={styles.menu}>
          <div className={styles.menuItem}> New Releases </div>
          <div className={styles.menuItem}>Featured</div>
          {balance ? (
            <div
              className={(styles.balance, styles.menuItem)}
              onClick={openModal}
            >
              {balance}
              <FaCoins className={styles.coins} />
              <Modal isOpen={isModalOpen} transition={ModalTransition.SCALE}>
                <BuyModal close={closeModal} buyTokens={buyTokens} />
              </Modal>
            </div>
          ) : (
            <div
              className={(styles.coins, styles.menuItem)}
              onClick={openModal}
            >
              0 LGC <FaCoins className={styles.coins} />
              <Modal isOpen={isModalOpen} transition={ModalTransition.SCALE}>
                <BuyModal close={closeModal} buyTokens={buyTokens} />
              </Modal>
            </div>
          )}
          <CgMenuGridO fontSize={30} className={styles.menuItem} />
        </div>
      </div>
    </ModalProvider>
  );
};

export default Header;

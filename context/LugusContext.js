import React from "react";
import { createContext, useState, useEffect } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { lugusAbi, lugusCoinAddress } from "../lib/constants";
import { ethers } from "ethers";

const serverUrl = "https://lckrdruoojvn.usemoralis.com:2053/server";
const appId = "VUFAbKrH8ln58kyuNgTPZ4jk0mDTbVeZiqiDrFLi";

export const LugusContext = createContext();

export const LugusProvider = ({ children }) => {
  const [formattedAccount, setFormattedAccount] = useState("");
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [assets, setAssets] = useState([]);
  const [currentAccount, setCurrentAccount] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [amountDue, setAmountDue] = useState("");
  const [etherscanLink, setEtherscanLink] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState("");
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [ownedItems, setOwnedItems] = useState([]);

  const {
    authenticate,
    isAuthenticated,
    enableWeb3,
    Moralis,
    user,
    isWeb3Enabled,
  } = useMoralis();

  Moralis.start({ serverUrl, appId });

  const {
    data: userData,
    error: userDataError,
    isLoading: userDataIsLoading,
  } = useMoralisQuery("_User");

  const {
    data: assetsData,
    error: assetsErrorData,
    isLoading: assetsDataIsLoading,
  } = useMoralisQuery("assets");

  useEffect(() => {
    enableWeb3();
    getAssets();
    getOwnedAssets();
  }, [userData, assetsData, assetsDataIsLoading, userDataIsLoading]);

  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3();
    }
    listenToUpdates();

    if (isAuthenticated) {
      getBalance();
      const currentUsername = user?.get("nickname");
      setUsername(currentUsername);
      const account = user?.get("ethAddress");
      setCurrentAccount(account);
      const formatAccount = account.slice(0, 5) + "..." + account.slice(-5);
      setFormattedAccount(formatAccount);
    } else {
      setCurrentAccount("");
      setFormattedAccount("");
      setBalance("");
    }
  }, [
    isWeb3Enabled,
    isAuthenticated,
    balance,
    setBalance,
    authenticate,
    currentAccount,
    setUsername,
    user,
    username,
  ]);

  const connectWallet = () => {
    enableWeb3();
    authenticate();
  };

  const buyTokens = () => {
    if (!isAuthenticated) {
      connectWallet();
    }

    const amount = ethers.BigNumber.from(tokenAmount);
    const price = ethers.BigNumber.from("100000000000000");
    const calcPrice = amount.mul(price);

    console.log(lugusCoinAddress);

    let options = {
      contractAddress: lugusCoinAddress,
      functionName: "mint",
      abi: lugusAbi,
      msgValue: calcPrice,
      params: {
        amount,
      },
    };
    const transaction = Moralis.executeFunction(options);
    const receipt = transaction.wait();
    setIsLoading(false);
    console.log(receipt);
    setEtherscanLink(
      `https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`
    );
  };

  const handleSetUsername = () => {
    if (user) {
      if (nickname) {
        user.set("nickname", nickname);
        user.save();
        setNickname("");
      } else {
        console.log("Empty Nickname");
      }
    } else {
      console.log("No User");
    }
  };

  const getBalance = async () => {
    try {
      if (!isAuthenticated || !currentAccount) return;
      const options = {
        contractAddress: lugusCoinAddress,
        functionName: "balanceOf",
        abi: lugusAbi,
        params: {
          account: currentAccount,
        },
      };

      if (isWeb3Enabled) {
        const response = await Moralis.executeFunction(options);
        console.log(response.toString());
        setBalance(response.toString());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buyAsset = async () => {
    try {
      if (!isAuthenticated) return;
      console.log("price: ", price);
      console.log("assets: ", assets.name);
      console.log(userData);

      const options = {
        type: "erc20",
        amount: price,
        receiver: lugusCoinAddress,
        contractAddress: lugusCoinAddress,
      };

      let transaction = await Moralis.transfer(options);
      const receipt = await transaction.wait();

      if (receipt) {
        const res = userData[0].add("ownedAssets", {
          ...assets,
          purchaseDate: Date.now(),
          etherscanLink: `https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`,
        });

        await res.save().then(() => {
          alert("You've successfully purchased this asset");
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAssets = async () => {
    try {
      await enableWeb3();
      const query = new Moralis.Query("Assets");
      const results = await query.find();
      setAssets(assetsData);
    } catch (error) {
      console.log(error);
    }
  };

  const listenToUpdates = async () => {
    let query = new Moralis.Query("EthTransactions");
    let subscription = await query.subscribe();
    subscription.on("update", async (object) => {
      console.log("New Transaction");
      console.log(object);
      setRecentTransactions([object]);
    });
  };

  const getOwnedAssets = async () => {
    try {
      if (userData[0]) {
        setOwnedItems((prevItems) => [
          ...prevItems,
          userData[0].attributes.getOwnedAssets,
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LugusContext.Provider
      value={{
        isAuthenticated,
        nickname,
        setNickname,
        username,
        setUsername,
        assets,
        balance,
        setTokenAmount,
        tokenAmount,
        amountDue,
        setAmountDue,
        setIsLoading,
        isLoading,
        formattedAccount,
        setEtherscanLink,
        etherscanLink,
        currentAccount,
        buyTokens,
        buyAsset,
        recentTransactions,
        ownedItems,
      }}
    >
      {children}
    </LugusContext.Provider>
  );
};

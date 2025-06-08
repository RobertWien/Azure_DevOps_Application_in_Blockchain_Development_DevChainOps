"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useActiveWallet } from "thirdweb/react";
import { getAllValidListings } from "thirdweb/extensions/marketplace";
import { useActiveAccount } from "thirdweb/react";
import { defineChain, getContract, sendTransaction } from "thirdweb";
import { client } from "../client";
import { MARKET_CONTRACT_ADDRESS } from "../const/addresses";
import { buyFromListing } from "thirdweb/extensions/marketplace";

type Listing = {
  asset: {
    metadata: {
      name: string;
      image: string;
      description: string;
    };
    supply: bigint;
  };
  currencyValuePerToken: {
    displayValue: string;
  };
};

const SHOP_OWNER_ADDRESS = "";

export default function Shop() {
  const [listings, setListings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const walletInfo = useActiveWallet();
  const account = useActiveAccount();
  const chain = defineChain(walletInfo?.getChain()?.id ?? 11155111);

  const market = getContract({
    address: MARKET_CONTRACT_ADDRESS,
    chain,
    client,
  });

  useEffect(() => {
    const fetchValidListings = async () => {
      try {
        const lists = await getAllValidListings({
          contract: market,
          start: 0,
          count: BigInt(30), // Lấy đủ 18 listings để có 6 hàng x 3 cột
        });
        setListings(lists);
      } catch (error) {
        console.error("Error fetching valid listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchValidListings();
  }, [market]);

  const formatIpfsUrl = (url: string) => {
    return url.replace("ipfs://", "");
  };

  const buyNFtT = async (listingId: number) => {
    if (!account) {
      console.error("Account not found");
      return;
    }

    if (account.address === SHOP_OWNER_ADDRESS) {
      console.error("Shop owner cannot buy NFTs");
      alert("You are the shop owner and cannot buy NFTs.");
      return;
    }

    try {
      const transaction = await buyFromListing({
        contract: market,
        listingId: BigInt(listingId),
        quantity: BigInt(1), 
        recipient: account?.address || "",
      });

      console.log("Transaction prepared:", transaction);

      const receipt = await sendTransaction({
        transaction,
        account: account,
      });

      console.log("Transaction successful! Receipt:", receipt);
      alert("NFT purchased successfully, and the seller has been paid!");
    } catch (error) {
      console.error("Failed to execute the transaction:", error);
      alert("Something went wrong while trying to buy the NFT.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center font-roboto">
        Welcome to My Shop
      </h1>

      {isLoading ? (
        <div>
          <motion.div
            className="flex justify-center items-center h-64"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", repeat: Infinity }}
          >
            <motion.div
              className="border-t-4 border-blue-500 rounded-full w-16 h-16"
              animate={{
                rotate: 360,
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "linear",
              }}
            />
          </motion.div>
          <h1 className="text-3xl font-bold mb-8 text-center font-roboto">
            Loading Lists ...
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full max-w-xs"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="relative h-80 w-full">
                <Image
                  src={formatIpfsUrl(listing.asset.metadata.image)}
                  alt={listing.asset.metadata.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <h2 className="text-xl font-roboto mb-2 text-black">
                  {listing.asset.metadata.name}
                </h2>
                <p className="text-gray-600 text-sm mb-2 h-10 overflow-y-auto font-roboto">
                  {listing.asset.metadata.description}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700 font-roboto">
                    Amount left: {listing.quantity.toString()}
                  </span>
                  <span className="font-bold text-green-600 font-roboto">
                    {listing.currencyValuePerToken.displayValue} ETH
                  </span>
                </div>
                {!account ? (
                  <p>Please Connect Wallet</p>
                ) : (
                  <button
                    onClick={buyNFtT.bind(null, listing.id)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200 font-roboto"
                  >
                    Buy Now
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
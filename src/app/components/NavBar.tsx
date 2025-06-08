"use client";

import { client } from "../client";
import { useActiveWallet } from "thirdweb/react";
import { ConnectButton } from "thirdweb/react";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const walletInfo = useActiveWallet();
  return (
    <nav className="bg-background mb-0 p-0 " >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/img/logo.png"
                alt="Logo"
                width={225}
                height={60}
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold font-roboto">
                Robert NFT Shop
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {walletInfo && (
              <Link href="/shop" className="flex items-center text-white">
                {/* SVG Shop Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="yellow"
                >
                  <path d="M4 2h16a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1zm1 2v16h14V4H5zm3 3h8v2H8V7zm0 4h8v2H8v-2z"/>
                </svg>
                <span className="font-roboto" style={{ color: 'yellow' }}>Visit Shop</span>
              </Link>
            )}
            {walletInfo && (
              <Link href="/profile" className="flex items-center text-white">
                {/* SVG Profile Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="blue"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2a5 5 0 0 1 5 5v11a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v1a3 3 0 0 0 6 0V7a3 3 0 0 0-3-3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-roboto" style={{ color: 'blue' }}>My Profile</span>
              </Link>
            )}
            <ConnectButton
              client={client}
              appMetadata={{
                name: "Robert NFT",
                url: "https://robert.eth",
              }}
              connectButton={{
                label: "Connect Wallet",
                className: "!font-roboto",
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

import { useAccount, useBalance } from "wagmi";
import { useRouter } from "next/router";

import ConnectWalletButton from "~/web3/connectWalletButton";
import Link from "next/link";
import NoSSR from "react-no-ssr";

export default function Header() {
  const account = useAccount();
  const bal = useBalance({ address: account.address });
  const pathname = useRouter().pathname;
  return (
    <div className="fixed left-0 right-0 top-0 flex h-20 w-full items-center justify-between bg-black/40 pl-4 pr-8 backdrop-blur-sm">
      <Link href="/">
        <div className="flex items-center">
          <h2 className="mb-1 text-white">
            {pathname === "/" && "Mothora NFT • Home"}
            {/* {pathname === "/profile" && "Pigeon MVP • My Profile"}
            {pathname === "/courier" && "Pigeon MVP • Courier"}
            {pathname === "/participant" && "Pigeon MVP • Participant"} */}
          </h2>
        </div>
      </Link>

      <NoSSR>
        <div className="flex items-center gap-2">
          {!!account.address ? (
            <div className="flex flex-col">
              <span>Address: {account.address}</span>
              <span>
                Balance: {bal.data?.formatted} {bal.data?.symbol}
              </span>
            </div>
          ) : (
            <ConnectWalletButton />
          )}
        </div>
      </NoSSR>
    </div>
  );
}

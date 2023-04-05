import { useAccount, useBalance, useContractRead } from "wagmi";
import { useRouter } from "next/router";

import ConnectWalletButton from "~/web3/connectWalletButton";
import Link from "next/link";
import NoSSR from "react-no-ssr";
import { abi, contractAddress } from "~/contracts/NFT";

export default function Header() {
  const account = useAccount();
  const bal = useBalance({ address: account.address });
  const pathname = useRouter().pathname;

  const nftCount = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "balanceOf",
    //@ts-ignore
    args: [account.address],
  });

  return (
    <div className="fixed left-0 right-0 top-0 flex h-28 w-full flex-col justify-between bg-black/40 py-2 pl-4 pr-8 backdrop-blur-sm md:h-20 md:flex-row md:items-center">
      <Link href="/">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold text-white">
            {pathname === "/" && "Mothora NFT • Home"}
            {pathname === "/get-by-id" && "Mothora NFT • Get NFT"}
            {pathname === "/mint" && "Mothora NFT • Mint NFT"}
            {pathname === "/my-nfts" && "Mothora NFT • My NFTs"}
          </h2>
        </div>
      </Link>

      <NoSSR>
        <div className="flex items-center gap-2">
          {!!account.address ? (
            <div className="flex flex-col">
              <span className="hidden lg:inline-block">
                Address: {account.address}
              </span>
              <span className="lg:hidden">
                Address: {account.address.slice(account.address.length - 1)}
              </span>
              <span>
                ETH Balance: {Number(bal.data?.formatted).toFixed(4)}{" "}
                {bal.data?.symbol}
              </span>
              <span>NFT Balance: {nftCount.data?.toString() || "0"}</span>
            </div>
          ) : (
            <ConnectWalletButton />
          )}
        </div>
      </NoSSR>
    </div>
  );
}

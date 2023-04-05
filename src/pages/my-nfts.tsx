import { useId } from "react";
import { MdCollectionsBookmark } from "react-icons/md";
import NoSSR from "react-no-ssr";
import { useAccount, useContractRead } from "wagmi";
import EnsureWallet from "~/components/ensureWallet";
import NFTImage from "~/components/nftImage";
import { abi, contractAddress } from "~/contracts/NFT";

export default function MyNFTs() {
  const account = useAccount();
  const id = useId();
  const balance = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "balanceOf",
    //@ts-ignore
    args: [account.address],
  });
  return (
    <NoSSR>
      <div className="flex flex-col gap-2">
        <EnsureWallet />
        <div className="mb-4 flex items-center gap-2 text-4xl">
          <MdCollectionsBookmark size={32} />
          <span>My NFTs ({balance.data?.toString() || "Connecting..."})</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from(Array(balance.data?.toNumber() || 0).keys()).map((i) => (
          <NFTImage
            address={account.address as string}
            tokenId={i}
            key={`${id}-${i}`}
          />
        ))}
      </div>
    </NoSSR>
  );
}

import { useContractRead } from "wagmi";
import { abi, contractAddress } from "~/contracts/NFT";

export default function NFTImage({ tokenId }: { tokenId: number }) {
  const getTokenURI = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "tokenURI",
    //@ts-ignore
    args: [tokenId],
  });
  return (
    <div className="flex w-fit flex-col gap-2 rounded-2xl bg-slate-700/50 px-4 py-4">
      <img
        src={`https://${getTokenURI.data}.ipfs.w3s.link`}
        className="mx-auto w-48 rounded-lg"
      />
      <span>Token ID: {tokenId}</span>
      <span className="w-full max-w-2xl break-all">
        CID: {getTokenURI.data?.toString()}
      </span>
    </div>
  );
}

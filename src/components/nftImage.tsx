import { useContractRead } from "wagmi";
import { abi, contractAddress } from "~/contracts/NFT";

export default function NFTImage({
  address,
  tokenId,
}: {
  address: string;
  tokenId: number;
}) {
  const myTokens = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "tokenOfOwnerByIndex",
    //@ts-ignore
    args: [address, tokenId],
  });
  console.log(myTokens);
  const getTokenURI = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "tokenURI",
    //@ts-ignore
    args: [myTokens?.data || 0],
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

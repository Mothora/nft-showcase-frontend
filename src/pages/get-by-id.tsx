import { useState } from "react";
import { FaBullseye } from "react-icons/fa";
import NoSSR from "react-no-ssr";
import { useContractRead } from "wagmi";
import EnsureWallet from "~/components/ensureWallet";
import { abi, contractAddress } from "~/contracts/NFT";

export default function getById() {
  const [tokenId, setTokenId] = useState<string>("0");

  const [fetchTokenId, setFetchTokenId] = useState<number>(0);

  const getTokenURI = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "tokenURI",
    //@ts-ignore
    args: [fetchTokenId],
  });

  return (
    <NoSSR>
      <div className="flex w-full flex-col">
        <div className="mb-4 flex items-center gap-2 text-4xl">
          <FaBullseye size={32} />
          <span>Fetch NFT by Token ID</span>
        </div>
        <EnsureWallet />
        <div className="flex w-full flex-col pt-4">
          <div className="mx-auto flex w-full max-w-3xl flex-col py-8">
            <label htmlFor="blueprint">Insert token ID</label>
            <input
              type="text"
              className="input mb-2"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
            />
            <button
              className="btn"
              onClick={() => {
                setFetchTokenId(parseInt(tokenId));
                getTokenURI.refetch().catch((e) => console.error(e));
              }}
            >
              Fetch NFT by token ID
            </button>
          </div>

          {getTokenURI.error && (
            <div className="text-red-500">{getTokenURI.error.message}</div>
          )}
          {getTokenURI.data && (
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 rounded-2xl bg-slate-700/50 px-4 py-4">
              <img
                src={`https://${getTokenURI.data}.ipfs.w3s.link`}
                className="mx-auto w-72 rounded-lg"
              />
              <span>Token ID: {fetchTokenId}</span>
              <span className="w-full max-w-2xl break-all">
                CID: {getTokenURI.data?.toString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </NoSSR>
  );
}

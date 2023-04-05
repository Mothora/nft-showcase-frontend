import { useState } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import NoSSR from "react-no-ssr";
import { useContractWrite } from "wagmi";
import EnsureWallet from "~/components/ensureWallet";
import { abi, contractAddress } from "~/contracts/NFT";

export default function Mint() {
  const [cid, setCid] = useState<string>("");

  const mint = useContractWrite({
    address: contractAddress,
    abi: abi,
    mode: "recklesslyUnprepared",
    functionName: "mint",
    args: [cid],
  });
  return (
    <div className="flex w-full max-w-3xl flex-col">
      <NoSSR>
        <EnsureWallet />
        <div className="flex items-center gap-2 text-4xl">
          <AiOutlineAppstoreAdd size={24} />
          <span>Mint</span>
        </div>
        <p className="mb-4">
          The image you want to attach to this NFT has a CID which will be used
          through the IPFS gateway. Do not paste a link, only the CID. <br />
          You can upload an image on{" "}
          <a
            className="text-blue-400"
            target="_blank"
            rel="noreferrer"
            href="https://web3.storage"
          >
            web.storage
          </a>{" "}
          and get a CID if you are unsure.
        </p>
        <label htmlFor="blueprint">CID</label>

        <input
          type="text"
          className="input"
          value={cid}
          onChange={(e) => setCid(e.target.value)}
        />
        <button
          className="btn"
          onClick={() => {
            mint.writeAsync().catch((e) => console.log(e));
          }}
        >
          Write
        </button>
      </NoSSR>
    </div>
  );
}

import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

export default function EnsureWallet() {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  const account = useAccount();
  return account.status === "connected" ? (
    <div>
      {chain?.id != 421613 && (
        <div className="flex flex-col rounded-xl bg-red-900 px-4 py-4">
          <span className="text-xl">WARNING: Incorrect Network</span>
          <b>
            Do NOT send any transactions until you are on <i>Arbitrum Goerli</i>
          </b>
          <span>
            Current chain: {chain?.id} ({chain?.name})
          </span>
          <button className="btn" onClick={() => switchNetwork!(421613)}>
            Switch to Arbitrum Goerli (421613)
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className="w-full rounded-full bg-red-900 px-4 py-4 text-center">
      <p className="text-2xl">Please connect your wallet.</p>
    </div>
  );
}

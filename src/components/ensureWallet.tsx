import { useAccount } from "wagmi";

export default function EnsureWallet() {
  const account = useAccount();
  return account.status === "connected" ? null : (
    <div className="w-full rounded-full bg-red-900 px-4 py-4 text-center">
      <p className="text-2xl">Please connect your wallet.</p>
    </div>
  );
}

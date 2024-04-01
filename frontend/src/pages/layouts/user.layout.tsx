import { useBladeWallet } from "@/providers/blade-wallet.provider";
import { useUser } from "@/providers/user.provider";
import Head from "next/head.js";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  title: string;
  useBg?: boolean
};

export default function UserLayout({ children, title, useBg = true }: Props) {
  const { init: initBlade } = useBladeWallet();
  const { userProfile } = useUser();
  useEffect(() => {
    if (userProfile) {
      initBlade();
    }
  }, [userProfile])
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={`relative flex flex-col bg-black text-white w-full h-full z-0 min-h-[100vh] ${useBg ? 'bg-pattern' : ''}`}>
        {children}
      </div>
    </>
  );
}

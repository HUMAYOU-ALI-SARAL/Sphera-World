'use client'
import { useUser } from '@/providers/user.provider';
import WalletContainer from "@/components/Auth/WalletContainer";
import WalletForm from "@/components/Auth/WalletForm";
import Button from "@/components/Common/Button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';
import BaldeLogo from "public/img/auth/wallet/blade-logo.png";
import Metamask from "public/img/auth/wallet/metamask-logo.png";
import Hashpack from "public/img/auth/wallet/hashpack-logo.png";
import WalletConnect from "public/img/auth/wallet/wallet-connect-logo.png";
import MoonPayLogo from "public/img/auth/wallet/moon-pay-logo.png";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext } from 'next/types';

import styles from '../styles.module.scss';


const wallets = [
    {
        logo: BaldeLogo,
        alt: "blade",
        nextUrl: "/auth/wallet/blade?import=true",
    },
    /* {
        logo: Metamask,
        alt: "metamask",
        nextUrl: "#",
    },
    {
        logo: Hashpack,
        alt: "hashpack",
        nextUrl: "#",
    },
    {
        logo: WalletConnect,
        alt: "wallet-connect",
        nextUrl: "#",
    }, */
];

const Wallet = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const step = router.query.step;
    const { setOpenMoonPay } = useUser();
    return (
        <>
            <WalletContainer
                pageTitle={t("common:wallet")}
                leftSideFirstHeader={
                    {
                        text: t("auth:connecting_to")
                    }
                }
                leftSideSecondHeader={
                    {
                        text: t("auth:web3"),
                        classNames: "text-orange"
                    }
                }
                leftSideDescription={
                    {
                        text: t("auth:chose_how_you_would_like_to_connect")
                    }
                }
            >
                <WalletForm>
                    {step === 'start' &&
                        <div className="flex flex-col w-72">
                            <p className="font-abz text-3xl text-white">{t("auth:select_wallet_setup")}</p>
                            <p className="font-thin text-base mt-4 text-white">{t("auth:to_fully_access_the_sphera_world_platform")}</p>
                            <Button
                                className="mt-8 px-8 rounded font-extralight w-48 text-center"
                                onClick={() => { router.push('/auth/wallet/hedera-setup') }}
                                label={t("common:next")}
                            />
                        </div>
                    }
                    {step === 'hedera-setup' &&
                        <div className="flex flex-col items-center relative">
                            <div className="flex flex-col">
                                <p className="font-abz text-3xl text-white">{t("auth:hedera_wallet_setup")}</p>
                                <p className="font-thin text-base mt-4 text-white w-72">{t("auth:to_fully_access_the_sphera_world_platform")}</p>
                                <Button
                                    className="mt-8 px-8 rounded font-extralight w-48 text-center"
                                    onClick={() => { router.push('/auth/wallet/select') }}
                                    label={t("common:next")}
                                />
                            </div>
                            <Image
                                quality={100}
                                src="/img/auth/wallet/hedera-logo.png"
                                alt="hedera"
                                width={235}
                                height={90}
                                className={`${styles.hederaLogo}`}
                            />
                        </div>
                    }
                    {step === 'select' &&
                        <div className="flex flex-col items-center relative">
                            <div className="flex flex-col">
                                <p className="font-abz text-3xl text-white">{t("auth:select_your_wallet_type")}</p>
                                <p className="font-thin text-base mt-4 text-white w-72">{t("auth:chose_whether_you_would_like_to_create")}</p>
                                <div className='flex gap-x-2'>
                                    <Button
                                        className="mt-8 px-8 rounded font-extralight w-48 text-center"
                                        onClick={() => { router.push('/auth/wallet/blade') }}
                                        label={t("auth:new_wallet")}
                                    />
                                    <Button
                                        className="mt-8 px-8 rounded font-extralight w-48 text-center bg-stone-500"
                                        onClick={() => { router.push('/auth/wallet/connect') }}
                                        label={t("common:import")}
                                    />
                                </div>
                            </div>
                        </div>
                    }
                    {step === 'connect' &&
                        <div className="flex flex-col items-center relative">
                            <div className="flex flex-col">
                                <p className="font-abz text-3xl text-white">{t("auth:connect_existing_wallet")}</p>
                                <p className="font-thin text-base mt-4 text-white w-72">{t("auth:connect_your_existing_wallet")}</p>
                                <div className={`${styles.walletsBtnWrapper}`}>
                                    {wallets.map((value, index: number) => (
                                        <div className={`${styles.walletsBtn}`} key={index}>
                                            <Image
                                                quality={100}
                                                src={value.logo.src}
                                                alt={value.alt}
                                                width={value.logo.width}
                                                height={value.logo.height}
                                                sizes="100vh"
                                                onClick={() => { router.push(value.nextUrl) }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    }
                    {step === 'connected-moonpay' &&
                        <div className="flex flex-col items-center relative">
                            <div className="flex flex-col">
                                <p className="font-abz text-3xl text-white">{t("auth:wallet_connected_succesfully")}</p>
                                <p className="font-thin text-base mt-4 text-white w-72">{t("auth:congratulations_your_account_is_now_created")}</p>
                                <div className='flex gap-x-2 items-center justify-center mt-8'>
                                    <Button
                                        className="px-8 rounded font-extralight w-48 text-center"
                                        onClick={() => { setOpenMoonPay(true) }}
                                        label={t("common:top_up")}
                                    />
                                    <Link href="https://www.moonpay.com/learn" target='blank' >
                                        <Button
                                            className="px-8 rounded font-extralight w-48 text-center"
                                            label={t("common:tutorial")}
                                        />
                                    </Link>
                                    <Link className="font-extralight mb-2 text-base text-white" href='/auth/wallet/connected'>{t("common:skip")}</Link>
                                </div>
                                <div className="flex mt-2">
                                    <p className="font-extralight text-base text-white mr-2">{t("auth:powered_by")}:</p>
                                    <Image
                                        src={MoonPayLogo.src}
                                        alt="moonpay"
                                        width={113}
                                        height={21}
                                    />
                                </div>
                            </div>
                        </div>
                    }
                    {step === 'connected' &&
                        <div className="flex flex-col items-center relative">
                            <div className="flex flex-col">
                                <p className="font-abz text-3xl text-white">{t("auth:wallet_connected_succesfully")}</p>
                                <p className="font-thin text-base mt-4 text-white w-72">{t("auth:congratulations_your_account_is_now_created")}</p>
                                <div className='flex gap-x-2 items-center'>
                                    <Button
                                        className="mt-8 px-8 rounded font-extralight w-48 text-center"
                                        onClick={() => { router.push('/profile') }}
                                        label={t("auth:visit_profile")}
                                    />
                                    <Link href="https://discord.com/invite/CwM2H5GUcR" target='blank' >
                                        <Button
                                            className="mt-8 px-8 rounded font-extralight w-48 text-center"
                                            label={t("auth:join_community")}
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    }
                </WalletForm>
            </WalletContainer>
        </>
    )
}

export default Wallet;

export const getServerSideProps = async ({ locale = 'en' }: GetServerSidePropsContext) => ({
    props: {
        ...(await serverSideTranslations(locale, [
            'auth',
            'common'
        ])),
    },
});

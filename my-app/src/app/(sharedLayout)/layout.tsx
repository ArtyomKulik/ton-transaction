"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {  useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { usePathname } from "next/navigation";
import styles from './layout.module.scss';
import Container from '@/ui/Container/Container';


export default function SharedLayout({ children }: { children: React.ReactNode }) {
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const [balance, setBalance] = useState<string | null>(null);
  const pathname = usePathname();


  useEffect(() => {
    async function fetchBalance() {
      if (userFriendlyAddress) {
        try {
          const response = await fetch(`https://toncenter.com/api/v2/getAddressBalance?address=${userFriendlyAddress}`);
          const data = await response.json();
          if (data.ok) {
            const balanceByAdress = data.result
            setBalance(balanceByAdress)
          } else {
            console.error('Ошибка при получении баланса:', data.error);
          }
        } catch (error) {
          console.error('Ошибка при запросе баланса:', error);
        }
      }
    }
    fetchBalance();
  }, [userFriendlyAddress]);

  return (
    <>
      <header>
      <div className={styles.header_inner}>
          <button className={styles.connectWalletButton} onClick={() => tonConnectUI.openSingleWalletModal('tonkeeper')}>
            Connect Tonkeeper Wallet
          </button>
          <p className={styles.balance}>Баланс: {balance || '0'} TON</p>
          <nav className={styles.nav}>
            {pathname === '/transactions' ? <Link href="/">Назад</Link> : <Link href="/transactions">Транзакции</Link>}
          </nav>
          </div>
      </header>
      <main className={styles.main}>{children}</main>
      </>
  )
}
"use client"

import React from 'react'
import { useTonAddress } from '@tonconnect/ui-react'
import Container from '@/ui/Container/Container';
import styles from './page.module.scss';

export default function page() {
  const userFriendlyAddress = useTonAddress();
  return (
    <Container>
    <div className={styles.walletAddress}>Адрес вашего кошелька: <button title="Скопировать адрес" onClick={() => navigator.clipboard.writeText(userFriendlyAddress)}>{userFriendlyAddress}</button></div>
    </Container>
  )
}

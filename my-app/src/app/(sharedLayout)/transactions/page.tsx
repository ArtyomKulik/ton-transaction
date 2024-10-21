"use client"

import React, { useState } from 'react'
import { SendTransactionRequest, useTonConnectUI } from '@tonconnect/ui-react';
import styles from './page.module.scss';
import Container from '@/ui/Container/Container';


const TON_ADDRESS_REGEX = /^[UEQ][QC][A-Za-z0-9_-]{46}$/;


export default function page() {
   const [tonConnectUI, setOptions] = useTonConnectUI();

const [amount, setAmount] = useState('');
const [address, setAddress] = useState('');
const [notification, setNotification] = useState('');

async function handleTransactionSubmit (e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const transaction: SendTransactionRequest = {
    validUntil: Date.now() + 1 * 60 * 1000, // 1 min
    messages: [
      {
        address: address, // message destination in user-friendly format
        amount: (Number(amount) * 1_000_000_000).toString(), // Toncoin in nanotons
      },
    ],
  };

  try {
   await tonConnectUI.sendTransaction(transaction)
   setNotification('Транзакция отправлена')
  } catch (error) {
    console.error(error)
    setNotification('Ошибка при отправке транзакции')
  }
  setAmount('')
  setAddress('')
}

function handleChangeAmount (e: React.ChangeEvent<HTMLInputElement>) {
      setAmount(e.target.value)
}
function handleChangeAddress (e: React.ChangeEvent<HTMLInputElement>) {
      setAddress(e.target.value);
}
  

  return (
    <Container>
      <h2>Отправка транзакции</h2>
      <form onSubmit={handleTransactionSubmit} className={styles.transactionForm}>
      <label htmlFor="amount">Количество TON</label>
 <input 
    id="amount"
    value={amount}
    onChange={handleChangeAmount} 
    name="amount" 
    type="number" 
  />
  <label htmlFor="address">Адрес</label>
  <input 
    id="address"
    value={address}
    onChange={handleChangeAddress} 
    name="address" 
    type="text" 
  />
    <button className={styles.sendButton} disabled={!amount || !TON_ADDRESS_REGEX.test(address)} type="submit">
        Отправить
      </button>
      </form>
      {notification && (
        <div onClick={() => setNotification('')} className={`${styles.notification} ${notification === 'Транзакция отправлена' ? styles.green : styles.red}`}>
          {notification}
        </div>
      )}
      </Container>
      
  )
}

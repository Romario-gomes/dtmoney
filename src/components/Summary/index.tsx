import  React, { useContext }  from 'react';
import entradaImg from "../../assets/entradas.svg";
import saidasImg from "../../assets/saidas.svg";
import totalImg from "../../assets/total.svg";
import { TransactionsContext } from "../../TransactionsContext";


import { Container } from "./styles";

export function Summary() {
  const { transactions } = useContext(TransactionsContext);

  const totalDeposits = transactions.reduce((acc, transaction) => {
    if(transaction.type === 'deposit') {
      return acc + transaction.amount;
    }

    return acc;
  }, 0);

  const totalWithDraw = transactions.reduce((acc, transaction) => {
    if(transaction.type === 'withdraw') {
      return acc + transaction.amount;
    }

    return acc;
  }, 0);

  const summary = transactions.reduce((acc, transaction) => {
    if(transaction.type === 'deposit') {
      acc.deposits += transaction.amount;
      acc.total += transaction.amount;

    } else {
      acc.withDraws += transaction.amount;
      acc.total -= transaction.amount;
    }
    return acc;
  }, {
    deposits: 0,
    withDraws: 0,
    total: 0,
  });

   
  return (
    <Container>
      
      <div>
        <header>
          <p>Entradas</p>
          <img src={entradaImg} alt="Entradas"/>
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(summary.deposits)} 
        </strong>
      </div>

      <div>
        <header>
          <p>Saidas</p>
          <img src={saidasImg} alt="Saídas"/>
        </header>
        <strong>-{new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(summary.withDraws)} </strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total"/>
        </header>
        <strong>
        {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(summary.total)} 
        </strong>
      </div>
    </Container>
  );
}
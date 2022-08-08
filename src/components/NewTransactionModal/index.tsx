import Modal from "react-modal";
import fecharImg from '../../assets/fechar.svg';
import entradasImg from '../../assets/entradas.svg';
import saidasImg from '../../assets/saidas.svg';
import { api } from "../../services/api";


import { TransactionTypeContainer, RadioBox, Container } from "./styles";
import { FormEvent, useState, useContext } from "react";
import { TransactionsContext } from "../../TransactionsContext";
import { on } from "stream";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
  const { createTransaction } = useContext(TransactionsContext);

  const[title, setTitle] = useState('');
  const[amount, setAmount] = useState(0);
  const[category, setCategory] = useState('');

  const [type, setType] = useState('deposit');

  async function handleCreaetNewTransaction (event: FormEvent) {
    event.preventDefault();

    await createTransaction({ title, amount, category, type });

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit')

    onRequestClose()
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button 
        type="button" 
        onClick={onRequestClose} 
        className="react-modal-close"
      >
        <img src={fecharImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={ handleCreaetNewTransaction }>
        <h2>Cadastrar transação</h2>
        <input 
          type="text" 
          placeholder="Título" 
          onChange={event => setTitle(event.target.value)}
        />

        <input 
          type="number" 
          placeholder="Valor"
        onChange={event => setAmount(Number(event.target.valueAsNumber))}
        
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            isActive= {type === 'deposit'}
            activeColor="green"
            onClick={() => { setType('deposit')}}
          >
            <img src={entradasImg} alt="Entrada" />
            <span>Entrada</span>

          </RadioBox>
          <RadioBox
            type="button"
            isActive= {type === 'withdraw'}
            activeColor="red"

            onClick={() => { setType('withdraw')}}
          >
            <img src={saidasImg} alt="Saída" />
            <span>Saída</span>

          </RadioBox>
         
         
        </TransactionTypeContainer>

        <input 
          type="text" 
          placeholder="Categoria" 
          onChange={event => setCategory(event.target.value)}
        />

        <button type="submit">Cadastrar</button>


      </Container>

    </Modal>
  )
}
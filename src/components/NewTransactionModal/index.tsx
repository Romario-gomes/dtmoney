import Modal from "react-modal";
import fecharImg from '../../assets/fechar.svg';
import entradasImg from '../../assets/entradas.svg';
import saidasImg from '../../assets/saidas.svg';
import { api } from "../../services/api";


import { TransactionTypeContainer, RadioBox, Container } from "./styles";
import { FormEvent, useState } from "react";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
  const[title, setTitle] = useState('');
  const[value, setValue] = useState(0);
  const[category, setCategory] = useState('');

  const [type, setType] = useState('deposit');

  function handleCreaetNewTransaction (event: FormEvent) {
    event.preventDefault();

    const data = {
      title,
      value,
      type,
      category,
    };

    api.post('/transactions', data);
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
        onChange={event => setValue(Number(event.target.valueAsNumber))}
        
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
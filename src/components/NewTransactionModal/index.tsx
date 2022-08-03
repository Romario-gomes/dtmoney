import Modal from "react-modal";
import fecharImg from '../../assets/fechar.svg';
import entradasImg from '../../assets/entradas.svg';
import saidasImg from '../../assets/saidas.svg';


import { TransactionTypeContainer, RadioBox, Container } from "./styles";
import { useState } from "react";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
  const [type, setType] = useState('deposit');

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
      <Container>
        <h2>Cadastrar transação</h2>
        <input type="text" placeholder="Título" />

        <input type="number" placeholder="Valor" />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            isActive= {type === 'deposit'}
            onClick={() => { setType('deposit')}}
          >
            <img src={entradasImg} alt="Entrada" />
            <span>Entrada</span>

          </RadioBox>
          <RadioBox
            type="button"
            isActive= {type === 'withdraw'}
            onClick={() => { setType('withdraw')}}
          >
            <img src={saidasImg} alt="Saída" />
            <span>Saída</span>

          </RadioBox>
         
         
        </TransactionTypeContainer>

        <input type="number" placeholder="Categoria" />

        <button type="submit">Cadastrar</button>


      </Container>

    </Modal>
  )
}
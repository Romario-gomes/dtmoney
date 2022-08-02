import Modal from "react-modal";
import fecharImg from '../../assets/fechar.svg';
import { Container } from "./styles";
interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
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

        <input type="number" placeholder="Categoria" />

        <button type="submit">Cadastrar</button>


      </Container>

    </Modal>
  )
}
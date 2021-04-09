import PropTypes from 'prop-types';
import SweetAlert2 from 'react-sweetalert2';

const Modal = ({ onConfirm, setShow, show, type, ...inputProps }) => {  

  if (type === "error") {
    inputProps.confirmButtonColor = "#f27474";
  }  
  
  if( type === "info") {    
    inputProps.confirmButtonColor = "#3fc3ee";
  }

  if( type === "warning") {    
    inputProps.confirmButtonColor = "#f8bb86";
  }

  const handleOnConfirm = async () => {
    try {      
      onConfirm();
      if (setShow) {
        setShow(false);
      } 
    } catch (error) {
      console.error("Error: ", error);
    }    
  }

  const handleOnClose = async () => {
    try {                  
      if (setShow) {
        setShow(false);
      } 
    } catch (error) {
      console.error("Error: ", error);
    }    
  }

  return (
    <SweetAlert2
      show={show}        
      confirmButtonColor={'#a5dc86'} 
      { ...inputProps }              
      icon={type}     
      onConfirm={ handleOnConfirm }
      didClose={ handleOnClose }
    />
  ); 
}

Modal.propTypes = {
  onConfirm: PropTypes.func,  
  setShow: PropTypes.func,
  showCancelButton: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
  confirmButtonText: PropTypes.string, 
  cancelButtonText: PropTypes.string, 
  title: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.oneOf(['success', 'error', 'question', 'warning', 'info']),  
  show: PropTypes.bool,
}

Modal.defaultProps = {
  title: 'Confirmado',
  text: 'El proceso pudo ser completado con éxito',
  confirmButtonText: "Confirmar", 
  cancelButtonText: "Cancelar", 
  showCancelButton: false, 
  showConfirmButton: true , 
  type: 'success',
  show: false,  
  onConfirm: () => {}, 
  setShow: null,   
}

export default Modal;

import ModalAlert from '../../components/ModalAlert'; //Ejemplos de importación
import Modal from '../../components/ModalAlert/Modal';

//Se importa el ModalAlert, para usarlo con botón.
// Recibe todos los props que Modal más textButton que está en default asignado a "alert"

/*
  Hay dos botones, el de confirmar y el de cancelar. 
  Se pasa un valor booleano si se quiere o  no mostrar.
  El botón de cancelar cierra el modal
  El botón de confirmar ejecuta la funcion pasada a la prop "onConfirm"
*/

/*
En caso de no querer usarlo con boton solo importar el Modal y 
para activar la alerta hay que controlar el estado afuera con un useState
A continuación un ejemplo de como se puede usar:
*/

const [showModal, setShowModal] = useState(false);

  function doSomethingAndShowModal() {
    //do something
    setTimeout( () => {
      setShowModal(true);
    }, 2000); //espera 2 segundos al cargar el componente y muestra el modal
  }

  /*
  Solo cambia el estado al montar el componente, 
  en caso contrario ya que hay un cambio de estado 
  se renderiza y repite la llamada a funcion 
  */  
  useEffect(() => { 
    doSomethingAndShowModal();     
  }, []);

function ExampleAlert() {  
  return (
    <Modal 
    title="Custom Title"
    text="Custom Text"
    type="error"
    confirmButtonText="ConfirmBtnText"
    cancelButtonText="CancelBtnText"
    showCancelButton={true} 
    showConfirmButton={true}       
    onConfirm={ () => console.log('Todo funciona') } 
    setShow={ setShowModal }       
    show={showModal}       
  />  
  )
}
  
export default ExampleAlert;

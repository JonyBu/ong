import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Pencil } from '../../assets/icons/pencil';
import { Thrash } from '../../assets/icons/thrash';

import { logout , update } from '../../redux/actions';
import { useHttp } from '../../hooks/useHttp';
import ModalAlert from '../../components/ModalAlert';
import Modal from '../../components/ModalAlert/Modal';

import UserData from './UserData';
import styles from './index.module.css';
import HeadBand from '../../components/HeadBand';
import { FormModal } from '../../components/FormModal';
import { UserForm } from '../../components/Forms/UserForm';

export default function MyProfile() {
  const userState = useSelector((state) => state.user);
  const [user , setUser] = useState(userState);
  const { firstName , lastName , email , id , image } = user;
  const [dataModal, setDataModal] = useState({ show: false, type: 'success', text: '', title: '' });
  const [isOpen, setIsOpen] = useState(false);
  const { httpDelete } = useHttp();
  const history = useHistory();
  const dispatch = useDispatch();

  const userData = [
    { 
      id: 0,
      content: firstName,
      name: 'Nombre: ',
    },
    { 
      id: 1,
      content: lastName,
      name: 'Apellido: ',
    },
    { 
      id: 2,
      content: email,
      name: 'Email: ',
    },
  ];


  const handleEditUser = () => {
    setIsOpen(true);
  }

  const handleConfirmDeleteUser = async () => {
    try {
      const { data: { message: text } } = await httpDelete(`/users/${id}`);
      
      setDataModal((lastData) => ({ 
        ...lastData, 
        show: true, 
        title: 'Usuario eliminado',
        text,
      }));
    } catch (error) {
      setDataModal({ 
        show: true, 
        type: 'error',
        title: 'Error', 
        text: error.message,
      });
    }
  }
  
  const handleConfirm = () => {
    if (dataModal.type !== 'error') {
      dispatch(logout());
      history.push('/');
    }
  }

  const handleSubmitSuccess = (updatedItem) => {
    setUser(updatedItem)
    dispatch(update(updatedItem))
    setIsOpen(false)
  }

  const handleSubmitError = (error) => {
    setDataModal({ 
      show: true, 
      type: 'error',
      title: 'Error', 
      text: error.message,
    });
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <> 
      <Modal {...dataModal} onConfirm={handleConfirm} /> 
      <FormModal 
        isOpen={isOpen} 
        onCloseModal={ closeModal } 
        onSubmitSuccess =  { handleSubmitSuccess } 
        onSubmitError =  { handleSubmitError } 
        itemToEdit = { userState }
        itemFormRender={(itemToEdit, onSubmitSuccess, onSubmitError, onCloseModal) => {
          return (
            <UserForm
              editValues={itemToEdit}
              onSubmitSuccess={onSubmitSuccess}
              onSubmitError={onSubmitError}
              onCloseModal={onCloseModal}
            />
          );
        }}
        />
      <div className={styles.container}>
        <HeadBand />
        <div className={styles.head}>
          <div className={styles.containerButtons}>
            <button className={styles.buttonEdit} onClick={()=>handleEditUser()}>
              <Pencil />
            </button>
            <ModalAlert 
              type="warning" 
              title="Eliminar usuario" 
              text="¿Estás seguro de que queres eliminar tu usuario?" 
              textButton={<Thrash/>}
              onConfirm={handleConfirmDeleteUser}
              showCancelButton={true}
            />
          </div>
          <h1 className={styles.title}>Mi Perfil</h1>
        </div>
        <div className={styles.body}>
          <img src={image} className={styles.userImage} alt={`${firstName} ${lastName} image`} />
          <UserData data={userData} />
        </div>
      </div>
    </>
  );
};

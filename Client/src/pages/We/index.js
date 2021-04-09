import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useHttp } from '../../hooks/useHttp';
import Loader from '../../components/Loader';
import Modal from '../../components/ModalAlert/Modal';

import Member from './Member';
import styles from './index.module.css';
import { ChildishTitle } from '../../components/ChildishTitle';

export default function We() {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(false);
  const { isFetching, httpGet } = useHttp(); 
  const history = useHistory();
  
  useEffect(() => {
    const getMembers = async () => {
      try {
        const { data: { members } } = await httpGet('/members');
        setMembers(members);
      } catch {
        setError(true);
      }
    };

    getMembers();
  }, []);
  
  const handleConfirmModal = () => {
    setError(false);
    history.push('/');
  }

  return (
     <>
       <Modal 
         title="Error" 
         text="Húbo un error intente más tarde" 
         type="error" 
         show={error}
         onConfirm={handleConfirmModal} 
       />
       <div className={styles.containerWe}>
         <ChildishTitle>
           Nosotros
         </ChildishTitle>
         {
           isFetching
            ?
              <div className={styles.containerLoader}>
                <Loader timeout={10000} />
              </div>
            :
              <div className={styles.containerMembers}>
                {
                  members.map(({ id, ...restProps }) => <Member key={id} {...restProps} /> ) 
                }
                { members.length === 0 && <p>No hay miembros por el momento...</p>}
              </div>
         }
       </div>
     </>
  ); 
}

import React from 'react';
import { TableScreen } from '../../../components/BackofficeTableScreen';

const Contacts = () => {
	return (
		<>
			<TableScreen
				endpoint='contacts'
				frontRouteName='Contactos'
				keysToRender={['name', 'phone', 'email', 'message']}
				fieldsNames={['nombre', 'teléfono', 'email', 'mensaje']}
			/>
		</>
	);
};

export default Contacts;

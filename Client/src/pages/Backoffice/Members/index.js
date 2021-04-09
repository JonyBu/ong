import { TableScreen } from "../../../components/BackofficeTableScreen";
import MemberForm from '../../../components/Forms/MemberForm'


const BackofficeMembers = () => {
    return (
        <>
            <TableScreen
                endpoint="members"
                frontRouteName="members"
                keysToRender={["name", "image"]}
                fieldsNames={["nombre", "imagen"]}
                itemFormRender={(itemToEdit, onSubmitSuccess, onSubmitError, onCloseModal) => {
                    return (
                        <MemberForm
                            editValues={itemToEdit}
                            onSubmitSuccess={onSubmitSuccess}
                            onSubmitError={onSubmitError}
                            onCloseModal={onCloseModal}
                        />
                    );
                }}
                isEditable
            />
        </>
    );
};

export default BackofficeMembers;
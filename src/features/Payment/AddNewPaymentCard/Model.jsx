import React from 'react';
import AddNewPaymentCardDefault from './index';
import CustomModal from '../../../components/elements/CustomModal/CustomModal';

function AddNewPaymentCardModal({
    customerId,
    open,
    setOpen
}) {
    return (
        <CustomModal
            modalVisible={open}
            setModalVisible={setOpen}
            text="Add New Card"
        >
            {open && (
                <AddNewPaymentCardDefault setOpen={setOpen} customerId={customerId} refresh={() => null} />
            )}
        </CustomModal>
    );
}



export default AddNewPaymentCardModal;

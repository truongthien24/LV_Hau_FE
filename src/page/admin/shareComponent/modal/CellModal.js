import { Modal } from 'antd';
import React from 'react'

export const CellModal = (props) => {

    // Props
    const {onSubmit, onCancel, open, children, title} = props;

    // Method
    
    const handleOk = () => {
        onSubmit();
    };

    const handleCancel = () => {
        onCancel()
    };

    // Return
    return (
        <>
            <Modal title={title} open={open} onOk={handleOk} onCancel={handleCancel} footer={null} width={700}>
                {children}
            </Modal>
        </>
    )
}

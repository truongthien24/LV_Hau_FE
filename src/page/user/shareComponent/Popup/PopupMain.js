import { Modal } from 'antd'
import React from 'react'

const PopupMain = ({
    title, showSlice, handleOk, onShowSlice, children, fullWidth
}) => {
    const handleCancel = () => {
        onShowSlice({
            open: false,
            initData: null
        })
    }
    return (
        <Modal title={title} open={showSlice?.open} onOk={handleOk} onCancel={handleCancel} footer={null} width={fullWidth ? 900 : 500}>
            {children}
        </Modal>
    )
}

export default PopupMain
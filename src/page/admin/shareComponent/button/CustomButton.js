import { Button } from 'antd'
import React from 'react'

const CustomButton = ({type, label, onChange, onSubmit, topic = "save", loading = false}) => {
  
  const checkTopicToCss = (topic) => {
    switch(topic) {
      case 'save': return 'ant-btn-save';
      case 'delete': return 'ant-btn-delete';
      default: return 'ant-btn-cancel'
    }
  }

  return (
    <Button type="primary" htmlType={type} className={checkTopicToCss(topic)} loading={loading}>{label}</Button>
  )
}

export default CustomButton
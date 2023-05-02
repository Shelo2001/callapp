import React, { useState } from 'react'
import { Modal, Button, Input, Select } from 'antd'
import { useStore } from 'zustand'
import userStore from '../services/users'
import { Option } from 'antd/es/mentions'

type Props = {
  visible: boolean
  onClose: () => void
  title: string
  content: string
}

const NewUser: React.FC<Props> = ({ visible, onClose, title, content }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [gender, setGender] = useState('')

  const { addUser } = useStore(userStore)
  const handleGenderChange = (value: string) => {
    setGender(value)
  }

  const submitHandler = () => {
    let data = {
      name,
      email,
      phone,
      gender,
      address: {
        street,
        city,
      },
    }
    addUser(data)
    window.location.reload()
  }

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key='cancel' onClick={onClose}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' onClick={submitHandler}>
          Submit
        </Button>,
      ]}
    >
      <div className='modal'>
        <div>
          <label htmlFor='name'>Name</label>
          <Input id='name' onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label htmlFor='email'>Email</label>
          <Input id='email' onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
          <label htmlFor='phone'>Phone</label>
          <Input id='phone' onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div>
          <label htmlFor='street'>Street</label>
          <Input id='street' onChange={(e) => setStreet(e.target.value)} />
        </div>

        <div>
          <label htmlFor='city'>City</label>
          <Input id='city' onChange={(e) => setCity(e.target.value)} />
        </div>

        <div>
          <label htmlFor='gender'>Gender</label>
          <Select
            id='gender'
            style={{ width: '100%' }}
            onChange={handleGenderChange}
          >
            <Option value='male'>Male</Option>
            <Option value='female'>Female</Option>
          </Select>
        </div>
      </div>
    </Modal>
  )
}

export default NewUser

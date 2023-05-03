import React, { useEffect, useState } from 'react'
import { useStore } from 'zustand'
import userStore from '../services/users'
import { Table, Modal, Input, Select, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import NewUser from '../components/NewUser'
import { Option } from 'antd/es/mentions'

const UsersTable: React.FC = () => {
  const {
    getUsers,
    users,
    getUserById,
    user,
    deleteUser,
    updateUser,
    loading,
  } = useStore(userStore)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const dataSource = users.map((u) => ({
    key: u.id,
    name: u.name,
    email: u.email,
    gender: u.gender,
    phone: u.phone,
    street: u.address.street,
    city: u.address.city,
    delete: (
      <Button onClick={() => deleteUser(u.id)} type='primary' danger>
        <DeleteOutlined />
      </Button>
    ),
  }))

  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleModalClose = () => {
    setIsModalVisible(false)
  }

  const columns = [
    {
      title: 'N',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Street',
      dataIndex: 'street',
      key: 'street',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
    },
  ]

  const handleRowDoubleClick = (id: number) => {
    showModal()
    getUserById(id)
  }

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [gender, setGender] = useState('')

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setPhone(user.phone)
      setStreet(user.address.street)
      setCity(user.address.city)
      handleGenderChange(user.gender)
    }
  }, [user])

  const handleGenderChange = (value: string) => {
    setGender(value)
  }

  const handleUpdate = () => {
    let data = {
      id: user.id,
      name,
      email,
      phone,
      gender,
      address: {
        street,
        city,
      },
    }
    updateUser(data, user?.id)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div style={{ padding: '30px' }}>
      <Button
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: '10px' }}
        type='primary'
      >
        Add new user
      </Button>

      {loading ? (
        <p>Loading</p>
      ) : (
        <Table
          onRow={(e) => ({
            onDoubleClick: () => handleRowDoubleClick(e.key),
          })}
          dataSource={dataSource}
          columns={columns}
        />
      )}
      <Modal
        title={user?.name}
        open={isModalOpen}
        onOk={handleUpdate}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Cancel
          </Button>,
          <Button type='primary' onClick={handleUpdate}>
            Update
          </Button>,
        ]}
      >
        <div className='modal'>
          <div>
            <label htmlFor='name'>Name</label>
            <Input
              id='name'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div>
            <label htmlFor='email'>Email</label>
            <Input
              id='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div>
            <label htmlFor='phone'>Phone</label>
            <Input
              id='phone'
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </div>

          <div>
            <label htmlFor='street'>Street</label>
            <Input
              id='street'
              onChange={(e) => setStreet(e.target.value)}
              value={street}
            />
          </div>

          <div>
            <label htmlFor='city'>City</label>
            <Input
              id='city'
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
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
      <NewUser
        visible={isModalVisible}
        onClose={handleModalClose}
        title='Create New User'
      />
    </div>
  )
}

export default UsersTable

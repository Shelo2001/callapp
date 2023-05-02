import React, { useEffect, useState } from 'react'
import { useStore } from 'zustand'
import userStore from '../services/users'
import { Table, Modal, Input, Select, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

const UsersTable: React.FC = () => {
  const { getUsers, users, getUserById, user, deleteUser } = useStore(userStore)

  useEffect(() => {
    getUsers()
  }, [users, getUsers])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
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

  return (
    <>
      <Button type='primary'>Add new user</Button>

      <Table
        onRow={(e) => ({
          onDoubleClick: () => handleRowDoubleClick(e.key),
        })}
        dataSource={dataSource}
        columns={columns}
      />
      <Modal
        title={user?.name}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key='submit' type='primary' onClick={handleOk}>
            Update
          </Button>,
        ]}
      >
        <div className='modal'>
          <div>
            <label htmlFor='name'>Name</label>
            <Input id='name' value={user?.name} />
          </div>

          <div>
            <label htmlFor='email'>Email</label>
            <Input id='email' value={user?.email} />
          </div>

          <div>
            <label htmlFor='phone'>Phone</label>
            <Input id='phone' value={user?.phone} />
          </div>

          <div>
            <label htmlFor='street'>Street</label>
            <Input id='street' value={user?.address?.street} />
          </div>

          <div>
            <label htmlFor='city'>City</label>
            <Input id='city' value={user?.address?.city} />
          </div>

          <div>
            <label htmlFor='gender'>Gender</label>
            <Select
              id='gender'
              defaultValue='gender'
              style={{ width: '100%' }}
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ]}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default UsersTable

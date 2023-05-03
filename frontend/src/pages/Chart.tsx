import React, { useEffect } from 'react'
import Chart from 'react-apexcharts'
import { useStore } from 'zustand'
import userStore from '../services/users'

const UsersTable: React.FC = () => {
  const { getUsers, users } = useStore(userStore)

  useEffect(() => {
    getUsers()
  }, [])

  interface Cities {
    [key: string]: any
  }

  const cities: Cities = {}
  users.forEach(function (user) {
    cities[user?.address?.city] = (cities[user?.address?.city] || 0) + 1
  })

  const cityNames = []
  const count = []
  for (var key in cities) {
    cityNames.push(key)
    count.push(cities[key])
  }

  return (
    <div style={{ padding: '30px' }}>
      <div>
        <h1>Pie Chart</h1>
        <Chart
          type='pie'
          width={1000}
          height={400}
          series={count}
          options={{
            labels: cityNames,
          }}
        />
      </div>
      <div style={{ marginTop: '50px' }}>
        <h1>Bar Chart</h1>
        <Chart
          type='bar'
          width={1000}
          height={400}
          series={[{ data: count, name: 'population' }]}
          options={{
            xaxis: {
              categories: cityNames,
            },
          }}
        />
      </div>
    </div>
  )
}

export default UsersTable

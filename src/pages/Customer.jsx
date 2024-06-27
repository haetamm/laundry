import React, { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Table from '../component/auth/Table'
import axiosInstance from '../utils/api'
import { customerColumns } from '../utils/dataColumn'
import { useDispatch } from 'react-redux'
import HeaderPage from '../component/auth/HeaderPage'

const Customer = () => {
  const dispatch = useDispatch()
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const { data: response } = await axiosInstance.get('customers')
      const { data: customers } = response
      const sortedCustomers = customers ? customers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : []
    
      setCustomers(sortedCustomers);
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const setFetch = useCallback(() => {
    dispatch({
      type: "SET_FETCH",
      payload: {
        fetch: fetchData
      }
    })
  }, [dispatch])

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setFetch()
  }, [setFetch])

   const handleAddButton = () => {
    dispatch({
      type: "CREATE",
      payload: {
        url: `customers`,
        fetch: fetchData
      }
    })
  }

  const columns = customerColumns

  const data = customers ? customers.map((customer) => ({
    id: customer.id,
    kode: customer.id,
    name: customer.name,
    action: ['detail', 'delete'],
  })) : []

  
  return (
    <>
      <Helmet>
        <title>Customer</title>
        <meta name="description" content="Customer page" />
      </Helmet>
      <div className="mt-[60px] mx-auto mb-0 xs:ml-[70px] xl:ml-[16rem] h-screen overflow-auto items-center px-2">
        <HeaderPage title="Customer" handleAddButton={handleAddButton} />
        <div className="mt-5">
          <Table columns={columns} data={data} loading={loading} />
        </div>
      </div>
    </>
  )
}

export default Customer
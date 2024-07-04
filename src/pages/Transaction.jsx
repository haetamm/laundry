import React, { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Table from '../component/auth/Table'
import axiosInstance from '../utils/api'
import { transactionColumns } from '../utils/dataColumn'
import { useDispatch } from 'react-redux'
import HeaderPage from '../component/auth/HeaderPage'

const Transaction = () => {
  const dispatch = useDispatch()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const {data: response} = await axiosInstance.get('bills')
      const { data: transactions } = response
      const sortedTransactions = transactions ? transactions.sort((a, b) => new Date(b.billDate) - new Date(a.billDate)) : []
    
      setTransactions(sortedTransactions);
    } catch (error) {
      console.error('Error fetching users:', error);
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
  
  const columns = transactionColumns

  const data = transactions ? transactions.map((transaction) => ({
    id: transaction.id,
    kode: transaction.id,
    customer: transaction.customer.name,
    product: transaction.billDetails.length,
    action: ['detail'],
  })) : []

  const handleAddButton = () => {
    dispatch({
      type: "CREATE",
      payload: {
        url: `transactions`,
        fetch: fetchData
      }
    })
  }

  return (
    <>
      <Helmet>
        <title>Transaction</title>
        <meta name="description" content="Transaction page" />
      </Helmet>
      <div className="mt-[60px] mx-auto mb-0 xs:ml-[70px] xl:ml-[16rem] h-screen overflow-auto items-center px-2">
        <HeaderPage title="Transaction" handleAddButton={handleAddButton} />
        <div className="mt-5">
          <Table columns={columns} data={data} loading={loading} />
        </div>
      </div>
    </>
  )
}

export default Transaction
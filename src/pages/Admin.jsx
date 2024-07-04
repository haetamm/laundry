import React, { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Table from '../component/auth/Table'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import axiosInstance from '../utils/api';
import { adminColumns } from '../utils/dataColumn';
import HeaderPage from '../component/auth/HeaderPage';

const Admin = () => {
  const dispatch = useDispatch()
  const {role} = useSelector((state) => state.user)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  
  const fetchData = async () => {
    setLoading(true)
    try {
      const {data: response} = await axiosInstance.get('users')
      const { data: users } = response
      const sortedUsers = users ? users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : []

      setUsers(sortedUsers)
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
        url: `users`,
        fetch: fetchData
      }
    })
  }
        
  const columns = adminColumns
  
  const data = users ? users.map((user) => ({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    action: ['detail', 'delete'],
  })) : []

  if (role !== 'ADMIN') {
      return <Navigate to={'/dashboard'} />
  }

  return (
    <>
      <Helmet>
        <title>Admin</title>
        <meta name="description" content="Admin page" />
      </Helmet>
      <div className="mt-[60px] mx-auto mb-0 xs:ml-[70px] xl:ml-[16rem] h-screen overflow-auto items-center px-2">
        <HeaderPage title="Admin" handleAddButton={handleAddButton} />
        <div className="mt-5">
          <Table columns={columns} data={data} loading={loading} />
        </div>
      </div>
    </>
  )
}

export default Admin
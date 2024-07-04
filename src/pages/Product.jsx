import React, { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Table from '../component/auth/Table'
import axiosInstance from '../utils/api'
import { productColumns } from '../utils/dataColumn'
import { useDispatch } from 'react-redux'
import HeaderPage from '../component/auth/HeaderPage'

const Product = () => {
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const { data: response } = await axiosInstance.get('products')
      const { data: products } = response
      const sortedProducts = products ? products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : []

      setProducts(sortedProducts)
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

  const handleAddButton = () => {
    dispatch({
      type: "CREATE",
      payload: {
        url: `products`,
        fetch: fetchData
      }
    })
  }

  const columns = productColumns

  const data = products ? products.map((product) => ({
    id: product.id,
    kode: product.id,
    name: product.name,
    price: product.price,
    action: ['detail', 'delete'],
  })) : []
  
  return (
    <>
      <Helmet>
        <title>Product</title>
        <meta name="description" content="Product page" />
      </Helmet>
      <div className="mt-[60px] mx-auto mb-0 xs:ml-[70px] xl:ml-[16rem] h-screen overflow-auto items-center px-2">
        <HeaderPage title="Product" handleAddButton={handleAddButton} />
        <div className="mt-5">
          <Table columns={columns} data={data} loading={loading} />
        </div>
      </div>
    </>
  )
}

export default Product
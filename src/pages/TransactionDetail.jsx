import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../utils/api'
import { Helmet } from 'react-helmet-async'
import TransactionPartial from '../component/auth/TransactionPartial'
import { FormattedDate, calculateTotalPrice, formatNum } from '../utils/helper'
import { toast } from 'sonner'
import { IoReloadCircle } from 'react-icons/io5'
import { GiClothesline } from 'react-icons/gi'

export const TransactionDetail = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [transaction, setTransaction] = useState(null)
    const [name, setName] = useState('')
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: dataResponse } = await axiosInstance.get(`bills/${id}`);
                const { data: transaction } = dataResponse;
                setTransaction(transaction);
                setName(transaction.customer.name);
            } catch (e) {
                if (e.response.status === 404) {
                    navigate(`/dashboard/transaction`)
                    toast.error(e.response.data.status.description, {duration: 2000})
                }
                console.error('Error fetching users:', e);
            }
        }

        fetchData();
    }, [id, navigate]);

    if (!transaction) {
        return <div className="w-full h-screen flex justify-center items-center animate-spin"><IoReloadCircle className="h-10 w-10" /></div>
    }

    const coloumnName = [
        { value: "Name" },
        { value: "Qty" },
        { value: "Price" },
        { value: "Total" },
    ]

    const transactionDetails = [
        { label: 'Date :', value: FormattedDate(transaction.billDate) },
        { label: 'Kode :', value: transaction.id },
    ]
        
    const customerDetails = [
        { label: 'Name', value: transaction.customer.name },
        { label: 'Address', value: transaction.customer.address },
        { label: 'Phone', value: transaction.customer.phoneNumber },
    ]

    return (
        <>
            <Helmet>
                <title>{`Transaction An. ${name}`}</title>
                <meta name="description" content="Detail Transaction page" />
            </Helmet>
            <div className="mt-[60px] mx-auto mb-[3.5rem] xs:mb-0 xs:ml-[70px] xl:ml-[16rem] overflow-auto items-center">

                <div className="bg-white rounded-lg px-3 md:px-8 mx-auto py-10 max-w-4xl ">

                    <div className="flex items-center justify-between mb-8 gap-2">
                        <div className="hidden xs:flex items-center">
                            <GiClothesline className="h-[3rem] w-[3rem] xs:h-[5rem] xs:w-[5rem] mr-2"/>
                            <div className="text-gray-700 font-semibold text-2xl ">Tarak Company</div>
                        </div>
                        <div className="text-gray-700">
                            <div className="font-bold text-xl mb-2">INVOICE</div>
                            {transactionDetails.map((data, index) => (
                                <TransactionPartial key={index} label={data.label} type="text" className="text-sm" value={data.value}>
                                    {data.label}
                                </TransactionPartial>
                            ))}
                        </div>
                    </div>
                    <div className="border-b-2 border-gray-300 pb-8 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Customer:</h2>
                         {customerDetails.map((data, index) => (
                             <div key={index} className="text-gray-700 mb-2">{data.label}: {data.value}</div>
                        ))}
                    </div>

                    <table className="w-full text-left mb-8">
                        <thead>
                            <tr>
                                {coloumnName.map((data, index) => (
                                    <th key={index} className="text-gray-700 font-bold uppercase py-2">{data.value}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {transaction.billDetails.map((detail) => (
                                <tr key={detail.id}>
                                    <td className="py-4 text-gray-700">{detail.product.name}</td>
                                    <td className="py-4 text-gray-700">{detail.qty} {detail.product.type}</td>
                                    <td className="py-4 text-gray-700">{formatNum(detail.price)}</td>
                                    <td className="py-4 text-gray-700">{formatNum(detail.qty * detail.price)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-end items-center mb-8">
                        <div className="text-gray-700 mr-2">Total Bayar:</div>
                        <div className="text-gray-700 font-bold text-xl">{formatNum(calculateTotalPrice(transaction.billDetails))}</div>
                    </div>
                    <div className="border-t-2 border-gray-300 pt-8 mb-8">
                        <div className="text-gray-700 mb-2">Payment is due within 30 days. Late payments are subject to fees.</div>
                        <div className="text-gray-700 mb-2">Please make checks payable to Your Company Name and mail to:</div>
                        <div className="text-gray-700">Jln. Veteran, Jakarta pusat, DKI Jakarta</div>
                    </div>
                </div>
            </div>
        </>
    )
}

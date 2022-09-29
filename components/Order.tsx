import moment from 'moment'
import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { OrderType } from '../typings'

interface Props {
  order: OrderType
}

const Order = ({ order }: Props) => {
  return (
    <div className='relative border rounded-md'>
      <div className='flex items-center space-x-10 
        p-5 bg-gray-100 text-sm text-gray-600'>
        <div>
          <p className='font-bold text-xs'>ORDER PLACED</p>
          <p>{moment.unix(order.timestamp).format("DD MMM YYYY")}</p>
        </div>

        <div>
          <p className="text-xs font-bold">TOTAL</p>
          <p>
            <CurrencyFormat displayType='text' value={order.amount} prefix={'£'} /> - Next Day Delivery{" "}
            <CurrencyFormat displayType='text' value={order.amountShipping} prefix={'£'} />
          </p>
        </div>

        <p className='text-sm whitespace-nowrap sm:text-xl self-end 
        flex-1 text-right text-blue-500'>
          {order.items.length} items
        </p>

        <p className='absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap'>
          ORDER # {order.id}
        </p>
      </div>

      <div className='p-5 sm:p-10'>
        <div className='flex space-x-6 overflow-x-auto'>
          {order.images.map(image => (
            <img key={order.id} src={image} alt="order-image" className='h-20 object-contain
              sm:h-32 '/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Order
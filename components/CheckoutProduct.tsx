import Image from 'next/image'
import React, { useEffect } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import { ProductPrime } from '../typings'
import CurrencyFormat from 'react-currency-format'
import { useDispatch } from 'react-redux'
import { addToBasket, removeFromBasket } from '../redux/slices/basketSlice'

interface Props {
  item: ProductPrime
}

const CheckoutProduct = ({ item }: Props) => {
  const dispatch = useDispatch()

  const addItemToBasket = () => {
    dispatch(addToBasket({
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
      image: item.image,
      rating: item.rating,
      hasPrime: item.hasPrime
    }))
  }

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id: item.id }))
  }

  return (
    <div className='grid grid-cols-5'>
      <Image alt='checkout-image' src={item.image} height={200} width={200} objectFit='contain' />

      {/* Middle */}
      <div className="col-span-3 mx-5">
        <p>{item.title}</p>

        <div className='flex'>
          {Array(Math.floor(item.rating.rate)).fill(0).map((_, i) => (
            <StarIcon key={i} className='h-5 text-yellow-500' />
          ))}
        </div>

        <p className='text-xs my-2 line-clamp-3'>{item.description}</p>
        <CurrencyFormat displayType='text' value={item.price} prefix={'£'} />

        {item.hasPrime && (
          <div className="flex items-center space-x-2">
            <img loading='lazy' className='w-12' src='https://links.papareact.com/fdw' alt='prime-img' />
            <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
          </div>
        )}
      </div>

      {/* Right add/remove button */}
      <div className='flex flex-col space-y-2 my-auto justify-self-end'>
        <button onClick={addItemToBasket} className="button">Add to Basket</button>
        <button onClick={removeItemFromBasket} className="button">Remove from Basket</button>
      </div>

    </div>
  )
}

export default CheckoutProduct
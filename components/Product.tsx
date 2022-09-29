import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Product } from '../typings'
import { StarIcon } from '@heroicons/react/solid'
import CurrencyFormat from 'react-currency-format';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../redux/slices/basketSlice';

interface Props {
  product: Product
}

const MAX_RATING = 5
const MIN_RATING = 1

const Product = ({ product }: Props) => {
  const dispatch = useDispatch()

  const [rating] = useState(
    Math.floor((product.rating.rate / MAX_RATING) * (MAX_RATING - MIN_RATING + 1) + MIN_RATING)
  )
  const [hasPrime, setPrime] = useState(false)
  useEffect(() => {
    setPrime(Math.random() > 0.5)
  }, [])

  const addItemToBasket = () => {
    dispatch(addToBasket({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: product.rating,
      hasPrime: hasPrime
    }))
  }

  return (
    <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
      <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{product.category}</p>

      <Image src={product.image} height={200} width={200} objectFit="contain" alt='product-img' />

      <h4 className='my-3'>{product.title}</h4>
      <div className='flex'>
        {Array(rating).fill(0).map((_, i) => (
          <StarIcon key={i} className='h-5 text-yellow-500' />
        ))}
      </div>

      <p className='text-xs my-2 line-clamp-2'>{product.description}</p>

      <div className='mb-5'>
        <CurrencyFormat displayType='text' value={product.price} prefix={'£'} />
      </div>

      {hasPrime && (
        <div className='flex items-center space-x-2 -mt-5'>
          <img className='w-12' src='https://links.papareact.com/fdw' alt='prime-img' />
          <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
        </div>
      )}

      <button onClick={addItemToBasket} className='mt-auto button'>Add To Basket</button>
    </div>
  )
}

export default Product
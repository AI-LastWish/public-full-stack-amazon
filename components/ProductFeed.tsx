import React from 'react'
import { Product as ProductType } from '../typings'
import Product from './Product'

interface Props {
  products: ProductType[]
}

const ProductFeed = ({ products }: Props) => {
  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'>
      {products.slice(0, 4).map(product => (
        <Product key={product.id} product={product} />
      ))}

      <img
        className='md:col-span-full'
        src='https://links.papareact.com/dyz'
        alt='discover'
      />

      <div className='md:col-span-2'>
        {products.slice(4, 5).map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>

      {products.slice(5).map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductFeed
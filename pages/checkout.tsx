import React, { useEffect } from 'react'
import Image from 'next/image'
import Header from '../components/Header'
import { useSelector } from 'react-redux'
import { selectItems, selectTotal } from '../redux/slices/basketSlice'
import CheckoutProduct from '../components/CheckoutProduct'
import CurrencyFormat from 'react-currency-format'
import { useSession } from 'next-auth/react'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

const stripePromise = loadStripe(process.env.stripe_public_key!)

const Checkout = () => {
  const items = useSelector(selectItems)
  const total = useSelector(selectTotal)
  const { data: session } = useSession()

  const createCheckoutSession = async () => {
    const stripe = await stripePromise

    // Call the backend to create cbeckout session...
    const checkoutSession = await axios.post('/api/create-checkout-session',
      {
        items,
        email: session?.user?.email
      })

    // Redirect user/customer to Stripe Checkout
    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id
    })

    if(result?.error){
      alert(`Stripe error: ${result.error.message}`)
    }
  }

  return (
    <div className='bg-gray-100'>
      <Header />

      <main className='lg:flex max-w-screen-2xl mx-auto'>
        {/* Left */}
        <div className='flex-grow m-5 shadow-sm'>
          <Image
            src='https://links.papareact.com/ikj'
            width={1020}
            height={250}
            objectFit='contain'
            alt='Prime-day-banner'
          />
          <div className='flex flex-col p-5 space-y-10 bg-white'>
            <h1 className='text-3xl border-b pb-4'>
              {items.length === 0 ? 'Your Amazon Basket is empty.' : 'Shopping Basket'}
            </h1>

            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                item={item} />
            ))}
          </div>
        </div>

        {/* Right */}
        {items.length > 0 && (
          <div className='flex flex-col bg-white p-10 shadow-md'>
            <h2 className='whitespace-nowrap'>
              Subtotal ({items.length} items): &nbsp;
              <CurrencyFormat displayType='text' value={total} prefix={'??'} />
            </h2>

            <button
              onClick={createCheckoutSession}
              role='link'
              className={`${session ? 'button' : 'button-disabled'} mt-2 
            ${!session &&
                'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'
                }`}
              disabled={!session}
            >
              {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
            </button>
          </div>
        )}

      </main>
    </div>
  )
}

export default Checkout
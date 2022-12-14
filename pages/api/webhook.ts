import type { NextApiRequest, NextApiResponse } from 'next'
import * as admin from 'firebase-admin'
import { buffer } from 'micro'

interface Session {
  metadata: {
    email: string;
    images: string
  };
  id: string;
  amount_total: number;
  total_details: {
    amount_shipping: number
  }
}

// Secure a connection to Firebase from the backend
const serviceAccount = require('../../permission.json')
const app = !admin.apps.length ?
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
  : admin.app()

// Establish connection to Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_SIGNING_SECRET

const fulfillOrder = async (session: Session) => {
  // console.log('Fulfilling order', session)

  return app
    .firestore()
    .collection('users')
    .doc(session.metadata.email)
    .collection("orders").doc(session.id).set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      console.log(`SECCESS: Order ${session.id} had been added to the database`)
    })

}

const webhook = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === 'POST') {
    const requestBuffer = await buffer(req)
    const payload = requestBuffer.toString()
    const sig = req.headers["stripe-signature"]

    let event

    // Verify that the EVENT posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
    } catch (err) {
      if (err instanceof Error) {
        console.log('ERROR webhooks', err.message)
        return res.status(400).send(`Webhook error: ${err.message}`)
      }
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object

      // Fulfill the order...
      return fulfillOrder(session)
        .then(() => res.status(200).end())
        .catch(err => res.status(400).send(`Webhook error: ${err.message}`))
    }
  }
}

export default webhook

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
}
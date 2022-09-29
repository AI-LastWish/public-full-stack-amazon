export type Rating = {
  rate: number,
  count: number,
}

export type Product = {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: Rating,
}

export type ProductPrime = {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: Rating,
  hasPrime: boolean
}

export type OrderType = {
  id: string;
  amount: number;
  amountShipping: number;
  images: string[];
  timestamp: number;
  items: string;
}
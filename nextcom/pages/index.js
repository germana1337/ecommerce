import React from 'react'

import { Product, HeroBanner, FooterBanner } from '../components'
const Home = () => {
  return (
    <div>
      <>
        <HeroBanner />

        <div className='products-heading'>
          <h2>Best selling Products</h2>
          <p> Speakers of many variants </p>
        </div>

        <div className='products-container'>
          {['Product1', 'Product2', 'Product3'].map((product) => product)}
        </div>

        Footer

        <FooterBanner />
      </>
    </div>
  )
}

export default Home
import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'
import classes from './Product.module.css'

const Product = ({ product: { id, image, name, slug, price }, isDarkMode }) => {
  const productClasses = isDarkMode ? `${classes.product} ${classes.dark}` : classes.product;
  const productNameClasses = isDarkMode ? `${classes.productName} ${classes.dark}` : classes.productName;
  const productPriceClasses = isDarkMode ? `${classes.productPrice} ${classes.dark}` : classes.productPrice;

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div key={id} className={productClasses}>
          <img src={urlFor(image && image[0])}
            width={300}
            height={350}
            style={{ objectFit: 'cover' }}
            className={classes.productImage}
          />
          <p className={productNameClasses}>
            {name}
          </p>
          <div>
            <p>lorem lorem lorem <br /> lorem lorem lorem lorem </p>
          </div>
          <p className={productPriceClasses}> ₾ {price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product;

import { useEffect, useState } from "react"
import Link from "next/link"
import { BsBagCheckFill } from "react-icons/bs"
import { useStateContext } from "@/context/StateContext"
import { fireConfetti } from "@/lib/utils"

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext()

  useEffect(() => {
    localStorage.clear() // # This is the function that fires the confetti.
    setCartItems([]) // # This is the function that fires the confetti.
    setTotalPrice(0) // # This is the function that fires the confetti.
    setTotalQuantities(0) // # This is the function that fires the confetti.
    fireConfetti() // # This is the function that fires the confetti.
  }, [])
  
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order !</h2>
        <p className="email-msg"> Check Your Email inbox for the receipt </p>
        <p className="description">
          If you have any questions, please contact us at
          <a className="email" href="mailto:germanxcardinal@gmail.com">
            ngermanishvili@example.com
          </a>
        </p>
        <Link href='/'>
          <button type="button" width='300px' className="btn">
            Continiue Shopping
          </button>
        </Link>
      </div>

    </div>
  )
}

export default Success
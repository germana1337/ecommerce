
import React from 'react'
import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'
import { Layout } from '@/components'
import { StateContext } from '../context/StateContext'


export default function App({ Component, pageProps }) {
  return (
    <StateContext> {/* This is used to provide the state to the children components */}
      <Layout> {/* This is used to show the layout */}
        <Toaster /> {/* This is used to show the toast notifications */}
        <Component {...pageProps} /> {/* This is used to show the components */}
      </Layout>
    </StateContext>


  )
}

import React from 'react'
import Hero from '../component/guest/Hero'
import { Helmet } from 'react-helmet-async'

const Home = () => {
    return (
      <>
        <Helmet>
          <title>Tarak Company</title>
          <meta name="description" content="Laundry Near Me is a full-service business that caters to those who need a Jakarta laundry service nearby, including a wash-dry-fold option, ironing and more. We also do curtains, leather, suede, suits, dry cleaning, and wedding gown cleaning and restoration." />
        </Helmet>
        <div className="mt-[70px] mx-auto mb-0 items-center px-4 xs:px-2 text-blue-400 flex-grow">
            <Hero />
        </div>
      </>
    )
}

export default Home
import React from 'react'
import { Helmet } from 'react-helmet'

const data = (title) => {
  return (
    <div>
         <Helmet>
            <title>{title}</title>
        </Helmet>
    </div>
  )
}

export default data

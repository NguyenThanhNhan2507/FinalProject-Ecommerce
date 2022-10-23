import React from 'react'
import  Helmet  from 'react-helmet'

const Data = (title) => {
  return (
    <div>
         <Helmet>
            <title>{title}</title>
        </Helmet>
    </div>
  )
}

export default Data

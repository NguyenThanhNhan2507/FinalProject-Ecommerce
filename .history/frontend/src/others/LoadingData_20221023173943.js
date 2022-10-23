import React from 'react'
import  Helmet  from 'react-helmet'

const LoadingData = ({title}) => {
  return (
    <div>
          <Helmet>
            <title>{title}</title>
        </Helmet>
    </div>
  )
}

export default LoadingData

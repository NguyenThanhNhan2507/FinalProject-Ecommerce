import React from 'react'
import './Loader.css'
const Loader = () => {
  return (
    <div>
       <div className="loading">
           <input type="checkbox" id="check" />
           <label for="check">
          <div class="check-icon"></div>
          </label>
        </div>
    </div>
  )
}

export default Loader

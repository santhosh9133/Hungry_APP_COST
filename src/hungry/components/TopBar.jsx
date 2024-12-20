import React from 'react'
import { Link } from 'react-router-dom'

function TopBar() {
  return (
    <div>
      <section className="topBarSection">
        <div className="companyTitle">
          <Link to= "/" className='link'>
            <h2>HUNGRY</h2>
          </Link>
        </div>
        <div className="searchBar">
            <input type="text" placeholder='search...' />
        </div>
        <div className="userAuth">Login/ SignUp</div>
      </section>
    </div>
  )
}

export default TopBar

import React from 'react'
import { Link } from 'react-router-dom'
import { FaTwitter } from "react-icons/fa";

export default function Nav () {
  return (
    <div className='nav'>
        <Link to='/' className="center">
            <FaTwitter color='#1DA1F2' />
        </Link>
    </div>
  )
}
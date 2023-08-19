import React from 'react';
import './Homecard.css'
import { Link } from 'react-router-dom'
function Card(props)
{
    const{src,link,title,subtitle,desc}=props.obj;
    return (
      <>
        <Link to={link}>
         
          <div
            className='blog-card spring-fever'
            style={{
              backgroundImage: `url(${src})`,
            }}
          >
            <div className='title-content m-8'>
              <h3>{title}</h3>
              <hr />
              <div className='intro'>{subtitle}</div>
            </div>
            <div className='card-info'>{desc}</div>

            <div className='gradient-overlay'></div>
            <div className='color-overlay'></div>
          </div>
        </Link>
      </>
    )
}
export default Card;
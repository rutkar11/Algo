import React from "react";
import './Footer.css'

function Footer()
{
    return (
      <>
        <div>
          <footer className='site-footer'>
            <div className='container'>
              <div className='row'>
                <div className='About'>
                  <h6>About</h6>
                  <p className='text-justify'>
                    Tryin' to make something meaningful ❤️
                  </p>
                </div>

                <div className='col-sm-12 col-md-6 left_me'>
                  <h6>Connect with me</h6>
                  <div className=' row-sm-6 row-xs-12'>
                    <ul className='social-icons'>
                      
                      <li>
                        <a
                          className='linkedin'
                          href='https://www.linkedin.com/in/rutkar11'
                        >
                          <i className='fa fa-linkedin'></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href='https://github.com/rutkar11'
                          className='github'
                        >
                          <i className='fa fa-github'></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <hr />
            </div>
            
          </footer>
        </div>
      </>
    )
}

export default Footer;
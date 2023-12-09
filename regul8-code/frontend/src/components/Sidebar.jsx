// Sidebar.js
import React, { useState } from 'react';
import './Sidebar.css'


export const Sidebar = () => {
  const [homeSelected,setHomeSelected] = useState(true);
  return (
    <nav className="bg-primary sidebar w-100 h-100 main-sidebar p-0">
      <div className="mw-100">
        <ul className="nav flex-column mw-100 d-flex align-items-center pt-2">
          <li className="nav-item border-bottom w-100 text-center mw-100">
            <a className="nav-link active" href="#">
            <i className="fa fa-globe fa-2x" style={{ color: 'white' }} aria-hidden="true"></i>
            </a>
          </li>
          <li onClick={()=>setHomeSelected(true)}  className= {`nav-item   w-100 text-center mw-100 mt-2 ${homeSelected? `selected-page`:``} `}>
            <a className="nav-link" href="#">
            <i className="fa fa-home fa-2x" style={{ color: 'white' }} aria-hidden="true"></i>
            </a>
          </li>
          <li onClick={()=>setHomeSelected(false)} className={`nav-item   w-100 text-center mw-100 mt-2 ${!homeSelected? `selected-page`:``} `}>
            <a className="nav-link" href="#">
            <i className="fa fa-question-circle fa-2x" style={{ color: 'white' }} aria-hidden="true"></i>
            </a>
          </li>
         
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;

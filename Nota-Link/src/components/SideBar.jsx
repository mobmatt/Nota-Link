import React from 'react';
import{
    FaBars,
    FaInbox,
    FaPaperPlane,
    FaTh,
    FaUsers,
}from "react-icons/fa";
const SideBar = () => {
    const menuItem=[
        {
             path:"/",
             name:"Dashboard",
             icon: <FaTh />
        },
        {
            path:"/inbox",
            name:"Inbox",
            icon: <FaInbox />
       },
       {
        path:"/sent",
        name:"Sent Items",
        icon:<FaPaperPlane />
       },
       {
        path:"/recipients",
        name:"Manage Recipeints",
        icon:<FaUsers />
   },

    ] 

  return(
   <div className='container'>
     <div className="sidebar">
        <div className="top_section">
            <h1 className="logo">NotaLink</h1>
            <div className="bars">
                <FaBars />
            </div>

        </div>


     </div>

    </div>


  );


}

export default SideBar;
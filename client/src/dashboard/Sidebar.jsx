import React, { useContext, useState } from 'react'
import { sidebarLinks } from "./dashboard-links"
import { SidebarLink } from './SidebarLink';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from "react-icons/vsc";
import { Logoutmodal } from './Logoutmodal';
import { UserContext } from '../ContextAPI/UserContext';

export const Sidebar = () => {
  const { user,logoutUser } = useContext(UserContext);
  const [confirmationModal, setConfirmationmodal] = useState(null);
  const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-2 pt-[50px] bg-indigo-900 text-indigo-100 h-screen'>
      {
        sidebarLinks.map((item) => {
          return (
            <div key={item.id}>
              <SidebarLink name={item.name} path={item.path} icon={item.icon} />
            </div>
          )
        })
      }
      <div className='bg-indigo-700 ml-3 mr-3 mt-5 h-[0.01rem] w-5/11 mx-auto'></div>
      <div className='flex flex-col'>
        <button
          onClick={() => {
            setConfirmationmodal({
              text1: "Are you sure?",
              text2: "You will be logged out of your account.",
              btn1: "Logout",
              btn2: "Cancel",
              onclick1: () => {
                logoutUser();
                navigate("/");
              },
              onclick2: () => {
                setConfirmationmodal(null);
              }
            })
          }}
          className='flex flex-row gap-4 items-center p-2 pl-6 text-indigo-300 hover:text-indigo-100'
        >
          <VscSignOut />
          <span>Logout</span>
        </button>
        {
          confirmationModal && <Logoutmodal data={confirmationModal} />
        }
      </div>
    </div>
  )
}

import React, { useContext, useCallback, useEffect } from "react";
import { createPopper } from "@popperjs/core";
import { useHistory } from 'react-router-dom';

import { getUser } from 'api/user.api'
import DefaultContext from 'constants/data/DefaultContext'
import StoreContext from 'constants/data/StoreContext'

import CardLetter from 'components/Cards/CardLetter'

const UserDropdown = () => {
  // dropdown props

  const history = useHistory();
  const { removeToken, user, setUser } = useContext(StoreContext);
  const { setMessage, } = useContext(DefaultContext);

  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const logoutHandler = e => {
    e.preventDefault()
    removeToken('token')
  }

  const editProfileHandler = e => {
    e.preventDefault()
    history.push('/customize/profile')
  }

  const getUserHandler = useCallback(async () => {
    await getUser()
      .then(c => { setUser(c.data?.values) })
      .catch(e => setMessage({ type: 'danger', text: e?.toString() }))
  }, [setMessage, setUser])


  useEffect(() => {
    //Fica verificando caso o user não esteja na memoria
    if (user?.email) return
    getUserHandler()
  }, [getUserHandler, user])

  return (
    <>
      <a
        className="text-gray-600 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-gray-300 inline-flex items-center justify-center rounded-full">


            {user?.imageData ? <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={user?.imageData}
            /> : <CardLetter letter={user?.firstName} size="small" />}
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
          }
          onClick={(e) => editProfileHandler(e)}
        >
          Edit Profile
        </a>
        <div className="h-0 my-2 border border-solid border-gray-200" />
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
          }
          onClick={(e) => logoutHandler(e)}
        >
          Logout
        </a>

        {/*<a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
          }
          onClick={(e) => e.preventDefault()}
        >
          Something else here
        </a>*/}
        {/*<a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
          }
          onClick={(e) => e.preventDefault()}
        >
          Seprated link
        </a>*/}
      </div>
    </>
  );
};

export default UserDropdown;

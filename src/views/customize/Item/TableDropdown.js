import React from "react";
import { createPopper } from "@popperjs/core";

const NotificationDropdown = ({ actions, rowHandler }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };


  return (
    <>
      <button
        className="text-gray-600 py-1 px-3"
        ref={btnDropdownRef}
        onClick={(e) => {
          rowHandler()
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </button>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        {
          actions.map(c => (
            <a href="/#"
              key={c.id}
              className={
                "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
              }
              onClick={() => {
                c.onClick()
                closeDropdownPopover()
              }}
            >
              {c.name}
            </a>
          ))
        }

      </div>
    </>
  );
};

export default NotificationDropdown;

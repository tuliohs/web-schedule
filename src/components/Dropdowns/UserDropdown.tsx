import React from "react";
import { createPopper } from "@popperjs/core";

const UserDropdown = ({ items = [], content = null }) => {

  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef: any = React.createRef();
  const popoverDropdownRef: any = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => setDropdownPopoverShow(false)

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
          {content}
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        {
          items.map((element: any) => (
            <a
              href="#/"
              className={
                "flex flex-row justify-between text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
              }
              onClick={(e) => {
                element.action(e)
                closeDropdownPopover()
              }}
            >
              <span>{element.label}</span>
              {element.icon && <img alt="..." src={element.icon} style={{ width: 20 }} />}
            </a>
          ))
        }
        {/*<a
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

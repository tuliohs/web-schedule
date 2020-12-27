import React from "react";
import { createPopper } from '@popperjs/core';

const Dropdown = ({ name, items, state, setState, refer }) => {
    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();
    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: "bottom-start"
        });
        setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };

    const color = 'teal-'
    const grau = 500

    return (
        <>
            {/*<div className="flex flex-wrap">
                <div className="w-full sm:w-6/12 md:w-4/12 px-4">*/}
            <div className="relative inline-flex align-middle m-2">
                <button
                    className={`${items.length === 0 ? 'opacity-50' : ''} text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 bg-${color + grau} active:bg-${color + (grau + 100)} ease-linear transition-all duration-150`}
                    type="button"
                    ref={btnDropdownRef}
                    disabled={items.length === 0}
                    onClick={() => {
                        dropdownPopoverShow
                            ? closeDropdownPopover()
                            : openDropdownPopover();
                    }}
                    style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                >
                    {name}
                    <i className="fas fa-sort-down px-6"></i>
                </button>
                <div
                    ref={popoverDropdownRef}
                    className={`${dropdownPopoverShow ? 'block ' : 'hidden '}bg-${color + grau} text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48`}
                >
                    {
                        items.map(c => (
                            <option
                                className={`text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent 
                                        ${c.id == state ? 'text-white' : ''}`}
                                key={c.id}
                                ref={refer}
                                value={c.id}
                                onClick={e => {
                                    console.log(e.currentTarget.value)
                                    setState(c.id)
                                    closeDropdownPopover()
                                }}

                            >
                                {c.value}
                            </option>
                        ))
                    }
                    {/* SEPARATED ITEM <div className="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25" />*/}
                </div>
            </div>
            {/*</div>
            </div>*/}
        </>
    );
};

export default Dropdown;
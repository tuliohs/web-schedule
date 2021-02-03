import React, { FunctionComponent, useCallback, useEffect } from "react";
import { createPopper } from "@popperjs/core";

const AvaiableIcons = [
  { faicon: 'retweet' },
  { faicon: 'book' },
  { faicon: 'atom' },
  { faicon: 'award' },
  { faicon: 'balance-scale' },
  { faicon: 'bahai' },
  { faicon: 'baseball-ball' },
  { faicon: 'calculator' },
  { faicon: 'camera-retro' },
  { faicon: 'chalkboard-teacher' },
  { faicon: 'chart-pie' },
  { faicon: 'bolt' },
]
function getRandom(max: number) {
  return Math.floor(Math.random() * (max - 0))
}

interface IIcon {
  setItemSc: any,
  itemSc: any,
  readonly [fieldName: string]: "iconName",

}
const IconDropdown: FunctionComponent<IIcon> = ({ setItemSc, itemSc, fieldName }) => {
  // dropdown props

  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  //const [iconName, setIconName] = React.useState('');
  const btnDropdownRef: any = React.createRef();
  const popoverDropdownRef: any = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const changeIcon = (icon: string) => setItemSc({ ...itemSc, ["iconName"]: icon })
  useEffect(() => changeIcon(AvaiableIcons[getRandom(AvaiableIcons.length - 1)].faicon), []);

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

        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
          <i className={"fas fa-" + itemSc.iconName}></i>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 max-w-180-px text-left rounded shadow-lg min-w-48"
        }
      >
        {
          AvaiableIcons.map(c => (
            <a
              href="#pablo"
              className={
                "text-sm  py-1 px-2 font-normal whitespace-no-wrap bg-transparent text-gray-800"
              }
              onClick={(e) => {
                e.preventDefault();
                changeIcon(c.faicon)
                dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
              }}
            >
              <div className="text-white p-3 text-center inline-flex items-center mb-2 justify-center w-8 h-8 rounded-full bg-blue-400">
                <i className={`fas fa-${c.faicon}`}></i>
              </div>
            </a>
          ))
        }
      </div>
    </>
  );
};

export default IconDropdown;

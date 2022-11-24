import { cloneElement, useState } from "react";

const Dropdown = ({ trigger, menu }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      {cloneElement(trigger, {
        onClick: handleOpen,
      })}
      {open ? (
        <ul className=" rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {menu.map((menuItem, index) => (
            <li key={index} className="bg-gray-100 text-gray-900'">
              {cloneElement(menuItem, {
                onClick: () => {
                  menuItem.props.onClick();
                  setOpen(false);
                },
              })}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}; //className="flex min rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"

export default Dropdown;

import { cloneElement, useState } from "react";

const Dropdown = ({ trigger, menu }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none m-4">
      {cloneElement(trigger, {
        onClick: handleOpen,
      })}
      {open ? (
        <ul className=" rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {menu.map((menuItem, index) => (
            <li
              key={index}
              className="bg-green-100 hover:bg-white text-center py-2"
            >
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
};

export default Dropdown;

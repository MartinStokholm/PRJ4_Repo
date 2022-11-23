import { cloneElement, useState } from "react";

const Dropdown = ({ trigger, menu }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="flex flex-wrap border rounded bg-grey-200 justify-center">
      {cloneElement(trigger, {
        onClick: handleOpen,
      })}
      {open ? (
        <ul>
          {menu.map((menuItem, index) => (
            <li
              key={index}
              className="bg-transparent hover:bg-green-500 text-green-500 hover:text-white py-1 px-1 border border-green-500 hover:border-transparent rounded m-4"
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

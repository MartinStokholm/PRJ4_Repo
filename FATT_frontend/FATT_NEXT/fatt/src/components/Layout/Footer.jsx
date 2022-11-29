import React from "react";

const Footer = () => {
  return (
    <div className="top-[100vh] p-2 bg-white rounded-lg shadow mt-auto">
      <div className="flex items-center justify-center">
        <ul className="flex flex-wrap m-4 text-sm text-gray-500 dark:text-gray-400 text-center">
          <li>
            <a href="/about" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="/profile" className="mr-4 hover:underline md:mr-6">
              Profile
            </a>
          </li>
          <li>
            <a href="/settings" className="mr-4 hover:underline md:mr-6">
              Settings
            </a>
          </li>
          <li>
            <a href="/login" className="mr-4 hover:underline md:mr-6 ">
              Log-in
            </a>
          </li>
        </ul>
      </div>
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2022 All Rights Reserved.
      </span>
    </div>
  );
};

export default Footer;

import React from "react";

const Footer = () => {
  return (
    <div className="sticky top-[100vh] p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900 ">
      <div className="sm:flex sm:items-center sm:justify-between">
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
          <li>
            <a href="/about" className="mr-4 hover:underline md:mr-6 ">
              About
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
          <li>
            <a href="/signup" className="hover:underline">
              Sign-up
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
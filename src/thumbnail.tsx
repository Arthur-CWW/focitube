import { useState } from 'react';
import { RiArrowDownLine, RiArrowUpLine, RiEyeCloseLine, RiSaveLine } from 'react-icons/ri';

const ThumbnailButtonMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    console.log(`Selected option: ${option}`);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
          onClick={handleToggleMenu}
        >
          <svg
            className="w-5 h-5 text-gray-600"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 3a2 2 0 100 4 2 2 0 000-4zm0 10a2 2 0 100 4 2 2 0 000-4zm0-5a2 2 0 100 4 2 2 0 000-4z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <button
              type="button"
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
              onClick={() => handleOptionClick('Save')}
            >
              <RiSaveLine className="w-4 h-4 mr-2" />
              Save
            </button>
            <button
              type="button"
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
              onClick={() => handleOptionClick('Hide')}
            >
              <RiEyeCloseLine className="w-4 h-4 mr-2" />
              Hide
            </button>
            <button
              type="button"
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
              onClick={() => handleOptionClick('Upvote')}
            >
              <RiArrowUpLine className="w-4 h-4 mr-2" />
              Upvote
            </button>
            <button
              type="button"
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
              onClick={() => handleOptionClick('Downvote')}
            >
              <RiArrowDownLine className="w-4 h-4 mr-2" />
              Downvote
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

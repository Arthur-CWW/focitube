import { ArrowDown, ArrowUp, EyeOff, Save } from 'solid-icons/hi';
const ThumbnailButtonMenu = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen());
  };
  const handleOptionClick = (option) => {
    console.log(`Selected option: ${option}`);
    // Perform the desired action based on the selected option
    // Add your custom logic here
  };

  return (
    <div class="relative inline-block text-left">
      <div>
        <button
          type="button"
          class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
          onClick={handleToggleMenu}
        >
          <Save class="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* {isOpen() && ( */}
      <div class="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div class="py-1">
          <button
            type="button"
            class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
            onClick={() => handleOptionClick('Save')}
          >
            <Save class="w-4 h-4 mr-2" />
            Save
          </button>
          <button
            type="button"
            class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
            onClick={() => handleOptionClick('Hide')}
          >
            <EyeOff class="w-4 h-4 mr-2" />
            Hide
          </button>
          <button
            type="button"
            class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
            onClick={() => handleOptionClick('Upvote')}
          >
            <ArrowUp class="w-4 h-4 mr-2" />
            Upvote
          </button>
          <button
            type="button"
            class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
            onClick={() => handleOptionClick('Downvote')}
          >
            <ArrowDown class="w-4 h-4 mr-2" />
            Downvote
          </button>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

// import 'virtual:uno.css';
import './index.css';
import { getNodes } from './script';
function toggleShorts() {
  const currentValue = document.documentElement.style.getPropertyValue('--show-shorts');
  const newValue = currentValue === 'block' ? 'none' : 'block';
  document.documentElement.style.setProperty('--show-shorts', newValue);
}

const styleElement = document.createElement('style');
styleElement.textContent = `:root { --show-shorts: block; }`;
document.head.appendChild(styleElement);

const root = document.getElementById('#primary');
function NormalButton() {
  type Store = {
    url: string;
    title: string;
    saved: boolean;
  };

  return (
    <button
      class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      onclick={() => {
        toggleShorts();
      }}
    >
      Normal Button
    </button>
  );
}
function main() {
  // console.log(start);
  // const header = document.querySelector('#header');

  const data = getNodes(document.getElementById('content'));

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        // Check if new elements of type 'ytd-grid-video-renderer' were added
        const addedNodes = Array.from(mutation.addedNodes);
        const newThumbnails = addedNodes.filter(
          (node) => node.tagName === 'YTD-GRID-VIDEO-RENDERER'
        );

        if (newThumbnails.length > 0) {
          newThumbnails.forEach((thumbnail) => {
            console.log(thumbnail);
            // getNodes(thumbnail);
          });
        }
      }
    }
  });
  console.log('running mutation observer');
  const observerConfig = { childList: true, subtree: true };
  observer.observe(content, observerConfig);

  addDataToIndexedDB(data);
  const thumbnails = document.querySelectorAll('ytd-rich-item-renderer');
  thumbnails.forEach((thumbnail) => {
    const content = thumbnail.querySelector('#dismissible');
    thumbnail.classList.add('bg-red-500');
    let container = document.createElement('div');
    content?.appendChild(container);
    if (content) {
      render(() => <NormalButton />, container);
    }
  });
}
chrome.webRequest.onRequest
  (details) => {
    {
      if(details.url.includes('get_transcript')) {

      }
    }
  { urls: ['https://www.youtube.com/*'] },
  ['responseHeaders']
);


setTimeout(main, 1000);

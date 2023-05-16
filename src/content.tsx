import './index.css';

const root = document.createElement('div');
root.id = 'crx-root';

document.body.appendChild(root);
const thumbnails = document.querySelectorAll('ytd-rich-item-renderer');

thumbnails.forEach((thumbnail) => {
  // Create a button element
  const button = document.createElement('button');
  button.innerText = 'Extra Button';
  button.classList.add('extra-button');

  button.addEventListener('click', () => {
    console.log('Extra button clicked!');
  });
  thumbnail.classList.add('extra-button-container');

  thumbnail.appendChild(button);
});

// ReactDOM.createRoot(root).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import type { Component } from 'solid-js';

import styles from './App.module.css';
// import logo from './logo.svg';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
};

export default App;

// function main() {
//   const thumbnails = document.querySelectorAll('ytd-rich-item-renderer');

//   thumbnails.forEach((thumbnail) => {
//     const content = thumbnail.querySelector('#dismissible');
//     const videoId = thumbnail.querySelector('#thumbnail')?.href.split('?v=')[1];
//     const channelId = thumbnail.querySelector('#channel-thumbnail')?.href.split('/channel/')[1];
//     const url = thumbnail.querySelector('#thumbnail')?.href;
//     console.log(videoId, channelId, url);
//     console.log(thumbnail);
//   });
// }
// main();

interface VideoData {
  channelId: string | null;
  url: string | null;
  title: string | null;
  views: number;
  uploadedDate: Date | null;
  videoId: string | null;
  time: number;
}

function parseViews(views: string) {
  const viewsRegex = /^([\d.]+)([KMBT]*)\sviews$/;
  const [, value, unit] = views.match(viewsRegex) || [];
  let multiplier = 1;

  switch (unit) {
    case 'K':
      multiplier = 1000;
      break;
    case 'M':
      multiplier = 1000000;
      break;
    case 'B':
      multiplier = 1000000000;
      break;
    case 'T':
      multiplier = 1000000000000;
      break;
  }

  return parseFloat(value) * multiplier;
}

function parseUploadedDate(uploadedDate: string) {
  const dateRegex = /(\d+)\s(\w+)\sago/;
  const [, amount, unit] = uploadedDate.match(dateRegex) || [];

  let milliseconds = 0;

  switch (unit) {
    case 'seconds':
      milliseconds = parseInt(amount) * 1000;
      break;
    case 'minutes':
      milliseconds = parseInt(amount) * 60000;
      break;
    case 'hours':
      milliseconds = parseInt(amount) * 3600000;
      break;
    case 'days':
      milliseconds = parseInt(amount) * 86400000;
      break;
    case 'weeks':
      milliseconds = parseInt(amount) * 604800000;
      break;
    case 'months':
      milliseconds = parseInt(amount) * 2592000000;
      break;
    case 'years':
      milliseconds = parseInt(amount) * 31536000000;
      break;
  }

  const now = Date.now();
  return new Date(now - milliseconds);
}
function hideShorts(filters: string[]) {
  document.querySelectorAll('#content').forEach((node) => {
    const title = node.querySelector('#title')?.textContent;
    if (title && filters.includes(title)) {
      node.style.display = 'none';
      // const parent = node.parentElement as HTMLElement;
      // parent.style.display = 'none';
    }
  });
}
export function getNodes(parent: HTMLElement | null) {
  const selector = parent || document;
  const nodes = selector.querySelectorAll('#content') as NodeListOf<HTMLElement>;
  const metaData = [] as any[];
  nodes.forEach((thumbnail) => {
    const meta = thumbnail.querySelector('#meta') as HTMLElement;
    const videoTitleElement = meta.querySelector('#video-title') as HTMLAnchorElement;
    const metadata = thumbnail.querySelector('#metadata') as HTMLElement;
    // change the color of the thumbnail
    const matches =
      /(.*) by (.*) (\d+ \w+ ago) (\d+ minutes, \d+ seconds) (\d+,\d+,\d+) views/.exec(
        videoTitleElement?.ariaLabel?.trim() || ''
      );

    if (matches) {
      const title = titleElement.textContent.trim();
      const channel = matches[2].trim();
      const age = matches[3].trim();

      console.log('Title:', title);
      console.log('Channel:', channel);
      console.log('Age:', age);
      console.log('View Count:', viewCount);
    }

    const channelId = thumbnail.querySelector('#channel-name #text')?.textContent || null;
    if (!channelId) {
      console.log('no video title element');
      thumbnail.classList.add('bg-blue-300');
      return;
    }

    thumbnail.classList.add('bg-red-300');
    const url = videoTitleElement?.href;
    const title = videoTitleElement?.textContent || 'missing title';
    const viewsAndTimediff = metadata?.querySelector('#metadata-line')?.textContent as string;
    const views = viewsAndTimediff?.split('•')[0]?.trim();
    const uploadedDate = viewsAndTimediff?.split('•')[1]?.trim();

    const videoId = url?.split('?v=')[1] || null;
    const time = parseInt(url?.split('&t=')[1] || '0');

    const parsedViews = views ? parseViews(views) : -1;
    const parsedUploadedDate = uploadedDate ? parseUploadedDate(uploadedDate) : null;

    metaData.push({
      channelId,
      url,
      title,
      views: parsedViews,
      uploadedDate: parsedUploadedDate,
      videoId,
      time,
      viewsAndTimediff,
      metadata,
    });
  });
  console.log(metaData);
  return metaData;
}
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request: IDBOpenDBRequest = window.indexedDB.open('MyDatabase', 1);

    request.onerror = (event: Event) => {
      console.error('Failed to open database:', (event.target as IDBOpenDBRequest)?.error);
      reject((event.target as IDBOpenDBRequest)?.error);
    };

    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest)?.result as IDBDatabase;
      resolve(db);
    };

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest)?.result as IDBDatabase;
      const objectStore = db.createObjectStore('videos', { keyPath: 'videoId' });
      objectStore.createIndex('channelId', 'channelId', { unique: false });
    };
  });
}

function addDataToIndexedDB(data: VideoData[]): void {
  openDatabase().then((db) => {
    const transaction = db.transaction('videos', 'readwrite');
    const objectStore = transaction.objectStore('videos');

    data.forEach((item) => {
      objectStore.add(item);
    });

    transaction.oncomplete = () => {
      console.log('Data added to IndexedDB successfully.');
    };

    transaction.onerror = (event) => {
      console.error('Failed to add data to IndexedDB:', (event.target as IDBTransaction)?.error);
    };
  });
}

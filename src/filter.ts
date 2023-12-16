function getAllVids() {
  const nodes = document.querySelectorAll('#content') as NodeListOf<HTMLElement>;
  return Array.from(nodes).map((thumbnail) => {
    const videoTitleElement = thumbnail.querySelector('#video-title-link') as HTMLAnchorElement;
    if (!videoTitleElement) {
      console.log('No video title element found');
      return;
    }
    const videoData = videoTitleElement?.ariaLabel;
    if (!videoData) {
      console.log('No video data found');
      return;
    }
    const vid = parseVideo(videoData);
    if (!vid) {
      console.log('Could not parse video data');
      return;
    }
    const { title, channel, date, views } = vid;
    console.log('Title:', title, 'Channel:', channel, 'Age:', date, 'View Count:', views);
    const tmp = new WeakRef(thumbnail);
    return { ...vid, vid: tmp };
  });
}

function parseVideo(str: string) {
  let parts = str.split(' ');

  // '"Clean" Code, Horrible Performance by Molly Rocket 4 months ago 22 minutes 617,296 views',

  let byIndex = parts.lastIndexOf('by');
  let agoIndex = parts.lastIndexOf('ago');
  let viewsIndex = parts.lastIndexOf('views');

  if (byIndex === -1 || agoIndex === -1 || viewsIndex === -1) {
    return null;
  }

  // Everything before 'by' is title
  let title = parts.slice(0, byIndex).join(' ');

  // The word after 'by' and before 'ago' is the channel
  let channel = parts.slice(byIndex + 1, agoIndex - 2).join(' ');

  // The words between 'ago' and 'views' are the relative date
  let relativeDateStr = parts.slice(agoIndex - 2, agoIndex).join(' ');
  let date = convertRelativeDate(relativeDateStr);
  // The word before 'views' is the views count
  let views = parseInt(parts[viewsIndex - 1].replace(/,/g, ''));
  return {
    title,
    channel,
    date,
    views,
  };
}

function convertRelativeDate(relativeDateStr: string) {
  let [num, unit] = relativeDateStr.split(' ');
  let value = -parseInt(num);
  let date = new Date();

  switch (unit) {
    case 'year':
    case 'years':
      date.setFullYear(date.getFullYear() + value);
      break;
    case 'month':
    case 'months':
      date.setMonth(date.getMonth() + value);
      break;
    case 'week':
    case 'weeks':
      date.setDate(date.getDate() + value * 7);
      break;
    case 'day':
    case 'days':
      date.setDate(date.getDate() + value);
      break;
  }

  return date;
}

function testParse() {
  const tests = [
    '"Clean" Code, Horrible Performance by Molly Rocket 4 months ago 22 minutes 617,296 views',
    '"Clean" Code, Horrible Performance by Molly Rocket 4 months ago 22 minutes 617,296 views',
    'Handmade Hero - Announcement Trailer by Molly Rocket 8 years ago 2 minutes, 32 seconds 376,860 views',
    'Handmade Hero Day 001 - Setting Up the Windows Build by Molly Rocket 8 years ago 1 hour, 13 minutes 306,686 views',
    'The Only Unbreakable Law by Molly Rocket 1 year ago 53 minutes 233,659 views',
    'Intro to C on Windows - Day 1 by Molly Rocket 8 years ago 1 hour, 11 minutes 225,064 views',
    'The Thirty Million Line Problem by Molly Rocket 5 years ago 1 hour, 48 minutes 201,195 views',
    'Simple Code, High Performance by Molly Rocket 1 year ago 2 hours, 50 minutes 189,529 views',
    'Handmade Hero Day 002 - Opening a Win32 Window by Molly Rocket 8 years ago 1 hour 161,106 views',
    'Where Does Bad Code Come From? by Molly Rocket 1 year ago 42 minutes 142,533 views',
    'Handmade Hero Day 003 - Allocating a Backbuffer by Molly Rocket 8 years ago 1 hour, 33 minutes 134,188 views',
    'Basic Emacs Tutorial by Molly Rocket 8 years ago 37 minutes 128,662 views',
    'Handmade Hero Day 004 - Animating the Backbuffer by Molly Rocket 8 years ago 1 hour, 34 minutes 94,236 views',
    '[EPILEPSY WARNING] How fast should an unoptimized terminal run? by Molly Rocket 2 years ago 51 minutes 93,474 views',
    'Handmade Hero Day 005 - Windows Graphics Review by Molly Rocket 8 years ago 2 hours, 7 minutes 90,128 views',
    'Intro to C on Windows - Day 1 Q&A by Molly Rocket 8 years ago 21 minutes 88,333 views',
    'Twitter and Visual Studio Rant by Molly Rocket 3 years ago 38 minutes 87,774 views',
    'Intro to C on Windows - Day 2 by Molly Rocket 8 years ago 1 hour, 19 minutes 86,940 views',
    'HandmadeCon 2015 - Jonathan Blow by Molly Rocket 7 years ago 1 hour, 12 minutes 83,504 views',
    'HandmadeCon 2015 - Mike Acton by Molly Rocket 7 years ago 1 hour, 11 minutes 73,981 views',
    'Handmade Hero Day 006 - Gamepad and Keyboard Input by Molly Rocket 8 years ago 1 hour, 32 minutes 72,515 views',
    'Handmade Hero Day 026 - Introduction to Game Architecture by Molly Rocket 8 years ago 1 hour, 30 minutes 66,192 views',
    'Handmade Hero Day 011 - The Basics of Platform API Design by Molly Rocket 8 years ago 1 hour, 42 minutes 65,205 views',
    'Intro to C on Windows - Day 3 by Molly Rocket 8 years ago 1 hour, 4 minutes 65,048 views',
    'Handmade Hero Day 007 - Initializing DirectSound by Molly Rocket 8 years ago 1 hour, 32 minutes 63,291 views',
    'Deep thoughts on other languages Like Rust, Go, etc. by Molly Rocket 4 years ago 5 minutes, 57 seconds 61,807 views',
    'Performance Excuses Debunked by Molly Rocket 2 months ago 25 minutes 59,614 views',
    'Intro to C on Windows - Day 4 by Molly Rocket 8 years ago 1 hour, 19 minutes 56,246 views',
    'Handmade Hero Day 021 - Loading Game Code Dynamically by Molly Rocket 8 years ago 1 hour, 43 minutes 55,188 views',
    'Intro to C on Windows - Day 5 by Molly Rocket 8 years ago 1 hour, 45 minutes 55,009 views',
    'Handmade Hero Day 008 - Writing a Square Wave to DirectSound by Molly Rocket 8 years ago 1 hour, 33 minutes 50,717 views',
    'Refterm Lecture Part 1 - Philosophies of Optimization by Molly Rocket 1 year ago 18 minutes 49,955 views',
    'Handmade Hero Day 014 - Platform-independent Game Memory by Molly Rocket 8 years ago 1 hour, 35 minutes 47,204 views',
    'Handmade Hero Day 010 - QueryPerformanceCounter and RDTSC by Molly Rocket 8 years ago 1 hour, 59 minutes 46,436 views',
    'Handmade Hero Day 001 - Q&A by Molly Rocket 8 years ago 1 hour, 12 minutes 45,525 views',
    'Handmade Hero Day 009 - Variable-Pitch Sine Wave Output by Molly Rocket 8 years ago 2 hours, 3 minutes 45,248 views',
    'Refterm v2 - Resource usage, binary splat, glyph sizing, and more by Molly Rocket 2 years ago 29 minutes 43,914 views',
    'Handmade Hero Day 277 - The Sparse Entity System by Molly Rocket 7 years ago 1 hour, 29 minutes 43,487 views',
    'Handmade Hero Day 012 - Platform-independent Sound Output by Molly Rocket 8 years ago 1 hour, 37 minutes 42,024 views',
    'Twenty Minutes of Reasons to Use the RemedyBG Debugger by Molly Rocket 1 year ago 20 minutes 39,834 views',
    'Handmade Hero Day 028 - Drawing a Tile Map by Molly Rocket 8 years ago 1 hour, 36 minutes 39,164 views',
    'Handmade Hero Day 027 - Exploration-based Architecture by Molly Rocket 8 years ago 1 hour, 42 minutes 38,522 views',
    '"Where Does Bad Code Come From?" - Q&A by Molly Rocket 1 year ago 20 minutes 38,199 views',
    'Programming AMA by Molly Rocket 1 year ago 2 hours, 1 minute 37,168 views',
    'Killing the Walk Monster by Molly Rocket 2 years ago 50 minutes 36,844 views',
    'Handmade Hero Day 013 - Platform-independent User Input by Molly Rocket 8 years ago 1 hour, 33 minutes 36,590 views',
    'HandmadeCon 2015 - Tommy Refenes by Molly Rocket 7 years ago 1 hour, 8 minutes 35,855 views',
    'Handmade Hero Day 015 - Platform-independent Debug File I/O by Molly Rocket 8 years ago 1 hour, 33 minutes 35,503 views',
    'HandmadeCon 2016 - Asset Systems and Scalability by Molly Rocket 6 years ago 1 hour, 34 minutes 34,351 views',
    'Handmade Hero Day 022 - Instantaneous Live Code Editing by Molly Rocket 8 years ago 1 hour, 53 minutes 34,090 views',
    'Handmade Hero Day 023 - Looped Live Code Editing by Molly Rocket 8 years ago 1 hour, 46 minutes 33,584 views',
    'Handmade Hero Day 235 - Initializing OpenGL on Windows by Molly Rocket 7 years ago 1 hour, 21 minutes 32,497 views',
    '"Simple Code" Follow-up Part 1: A (Very) Simplified CPU Diagram by Molly Rocket 1 year ago 47 minutes 32,483 views',
    'Handmade Hero Day 018 - Enforcing a Video Frame Rate by Molly Rocket 8 years ago 1 hour, 27 minutes 32,433 views',
    'Handmade Ray 00 - Making a Simple Raycaster by Molly Rocket 5 years ago 4 hours, 1 minute 32,171 views',
    'HandmadeCon 2016 - Large-scale Systems Architecture by Molly Rocket 5 years ago 1 hour, 31 minutes 31,701 views',
    'Handmade Hero Day 016 - VisualStudio Compiler Switches by Molly Rocket 8 years ago 1 hour, 31 minutes 31,052 views',
    'Handmade Hero Day 017 - Unified Keyboard and Gamepad Input by Molly Rocket 8 years ago 1 hour, 41 minutes 29,555 views',
    'Handmade Hero Day 029 - Basic Tile Map Collision Checking by Molly Rocket 8 years ago 1 hour, 39 minutes 28,942 views',
    'Refterm Lecture Part 2 - Slow Code Isolation by Molly Rocket 1 year ago 31 minutes 28,581 views',
    'Mock Interview with Shawn McGrath by Molly Rocket 6 years ago 1 hour, 41 minutes 28,251 views',
    'Handmade Hero Day 122 - Introduction to Multithreading by Molly Rocket 8 years ago 1 hour, 19 minutes 27,992 views',
    'Handmade Hero Day 041 - Overview of the Types of Math Used in Games by Molly Rocket 8 years ago 1 hour, 34 minutes 27,765 views',
    'Handmade Hero Day 002 - Q&A by Molly Rocket 8 years ago 35 minutes 27,353 views',
    'Made By Us by Molly Rocket 1 year ago 1 minute, 11 seconds 27,136 views',
    'Handmade Hero Day 037 - Basic Bitmap Rendering by Molly Rocket 8 years ago 1 hour, 33 minutes 26,755 views',
    'Intro to C on Windows - Day 5 Q&A by Molly Rocket 8 years ago 1 hour, 33 minutes 26,418 views',
    'Handmade Hero Day 523 - Introduction to Git by Molly Rocket 4 years ago 2 hours, 19 minutes 26,009 views',
    'Handmade Hero Day 020 - Debugging the Audio Sync by Molly Rocket 8 years ago 2 hours, 46 minutes 25,917 views',
    'Handmade Hero Day 441 - Never, Ever Update Your Development Tools. Ever. by Molly Rocket 5 years ago 1 hour, 30 minutes 25,547 views',
    'Handmade Hero Day 030 - Moving Between Tile Maps by Molly Rocket 8 years ago 1 hour, 55 minutes 25,517 views',
    'Another Microsoft Gaming Moment by Molly Rocket 1 year ago 1 minute, 18 seconds 25,497 views',
    'The Terminator Gene (30 minute version) by Molly Rocket 8 years ago 31 minutes 25,137 views',
    'HandmadeCon 2015 - Pat Wyatt by Molly Rocket 7 years ago 1 hour, 7 minutes 25,071 views',
    'Handmade Hero Day 019 - Improving Audio Synchronization by Molly Rocket 8 years ago 1 hour, 44 minutes 24,712 views',
    'Handmade Hero Day 036 - Loading BMPs by Molly Rocket 8 years ago 1 hour, 31 minutes 24,494 views',
    'Handmade Hero Day 050 - Basic Minkowski-based Collision Detection by Molly Rocket 8 years ago 1 hour, 44 minutes 24,189 views',
    'Handmade Hero Day 663 - Simplifying Entity Storage, Part I by Molly Rocket 9 months ago 2 hours, 27 minutes 23,810 views',
    '"Simple Code" Follow-up Part 2: Analysis with Compiler Explorer and UICA by Molly Rocket 1 year ago 1 hour, 1 minute 23,710 views',
    'Handmade Hero Day 025 - Finishing the Win32 Prototyping Layer by Molly Rocket 8 years ago 2 hours, 30 minutes 23,648 views',
    'Performance-Aware Programming Series Announcement by Molly Rocket 5 months ago 1 minute, 55 seconds 23,449 views',
    'Intro to C on Windows - Day 2 Q&A by Molly Rocket 8 years ago 48 minutes 23,324 views',
    'Handmade Hero Day 034 - Tile Map Memory by Molly Rocket 8 years ago 1 hour, 48 minutes 23,142 views',
    'Handmade Hero Day 157 - Introduction to General Purpose Allocation by Molly Rocket 7 years ago 1 hour, 35 minutes 22,522 views',
    'HandmadeCon 2016 - Compression by Molly Rocket 6 years ago 1 hour, 27 minutes 22,430 views',
    'Handmade Hero Chat 017 - Modern x64 Architectures and the Cache by Molly Rocket 3 years ago 3 hours, 4 minutes 21,340 views',
    'Handmade Hero Day 031 - Tilemap Coordinate Systems by Molly Rocket 8 years ago 1 hour, 33 minutes 21,160 views',
    '4coder Customization Coding - 01 by Molly Rocket 4 years ago 1 hour, 54 minutes 21,053 views',
    'Handmade Hero Chat 013 - Translation Units, Function Pointers, Compilation, Linking, and Execution by Molly Rocket 6 years ago 4 hours, 16 minutes 20,945 views',
    'Handmade Hero Day 024 - Win32 Platform Layer Cleanup by Molly Rocket 8 years ago 1 hour, 38 minutes 20,698 views',
    'Handmade Hero Day 667 - Simplified Tile Occupancy Checking by Molly Rocket 5 months ago 1 hour, 10 minutes 20,159 views',
  ];
  const res = tests.map((test) => parseVideo(test));
  console.table(res);
}
testParse();

getAllVids();

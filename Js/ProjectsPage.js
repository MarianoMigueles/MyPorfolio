let savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  savedTheme === 'dark' ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
} else {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if(isDarkMode) {
    document.documentElement.classList.add('dark');
  }
}


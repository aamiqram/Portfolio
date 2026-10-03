/**
 * Applies the stored theme before first paint so a dark-first site never
 * flashes light. Kept as a string because it must run synchronously in <head>.
 */
export default function ThemeScript() {
  const script = `(function(){try{var s=localStorage.getItem('aamiqram-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s==='light'||s==='dark'?s:(d?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
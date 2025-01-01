import version from '@shellicar/build-version/version.json';
const el = document.getElementById('app');
if (el) {
  el.innerHTML = JSON.stringify(version);
}

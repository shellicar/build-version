import version from '../../../@shellicar/build-version/dist/core/version2';

const el = document.getElementById('app');
if (el) {
  el.innerHTML = JSON.stringify(version);
}

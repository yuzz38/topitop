// Original taste-skill modules, bundled into an ordinary script for local file:// use.
import './vendor/motion/motion.js';
import * as lib from './vendor/moments/lib.js';
import mountPinned from './vendor/moments/pinned-chapters/moment.js';
import mountPicture from './vendor/moments/picture-develops/moment.js';

const mounts = { 'pinned-chapters': mountPinned, 'picture-develops': mountPicture };
document.querySelectorAll('[data-moment]').forEach(root => {
  try {
    const options = JSON.parse(root.dataset.momentOpts || '{}');
    root.__moment = mounts[root.dataset.moment](root, options, lib);
    root.dataset.momentMounted = '1';
  } catch (error) {
    root.classList.add('mo-safe');
  }
});

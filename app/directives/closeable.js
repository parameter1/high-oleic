/* eslint-disable no-param-reassign */
const addListeners = (el) => {
  document.addEventListener('click', el.eventOnClick);
  document.addEventListener('touchstart', el.eventOnClick);
};
const removeListeners = (el) => {
  document.removeEventListener('click', el.eventOnClick);
  document.removeEventListener('touchstart', el.eventOnClick);
};
const getValue = ({ arg, vnode }) => {
  const key = arg || 'value';
  return vnode.context[key];
};

export default {
  bind(el, { arg, value }, vnode) {
    el.eventOnClick = (e) => {
      e.stopPropagation();
      if (!el.contains(e.target) && typeof value === 'function') value();
    };
    if (getValue({ arg, vnode })) addListeners(el);
  },

  update(el, { arg }, vnode) {
    if (getValue({ arg, vnode })) {
      addListeners(el);
    } else {
      removeListeners(el);
    }
  },

  unbind(el) {
    removeListeners(el);
  },
};

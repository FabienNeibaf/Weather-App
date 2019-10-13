const coerce = element => {
  if (element === null) return document.createDocumentFragment();
  switch (typeof element) {
    case 'string':
    case 'number':
      return document.createTextNode(element);
    case 'boolean':
    case 'undefined':
      return document.createDocumentFragment();
    default:
      return element;
  }
};

export const el = (type, props, children) => {
  let node;
  try {
    node = document.createElement(type);
  } catch (e) {
    return document.createTextNode(type);
  }
  if (Object.getPrototypeOf(node) === HTMLUnknownElement.prototype) {
    return document.createTextNode(type);
  }
  if (props) {
    Object.keys(props).forEach(prop => {
      if (prop.startsWith('on')) {
        node.addEventListener(prop.slice(2).toLowerCase(), props[prop]);
      } else {
        node.setAttribute(prop, props[prop]);
      }
    });
  }
  if (children !== undefined) {
    if (Array.isArray(children))
      children.forEach(child => node.appendChild(coerce(child)));
    else node.appendChild(coerce(children));
  }
  return node;
};

export const extract = (names, form) => {
  const data = {};
  names.forEach(name => {
    const input = form.querySelector(`[name=${name}]`);
    data[name] = input ? input.value : null;
  });
  return data;
};

export const csvals = (obj1, obj2) => {
  if (Array.isArray(obj1)) {
    return obj1.every(item => obj2.includes(item));
  }
  return false;
};

export const mount = (node, host) => {
  host.innerHTML = '';
  if (Array.isArray(node)) node.forEach(child => host.appendChild(child));
  else host.appendChild(node);
};

export class Observable {
  constructor(model) {
    this.model = model;
    this.handlers = {};
    this.build(model);
  }

  on(action, handler) {
    if (this.handlers[action]) this.handlers[action].push(handler);
    else this.handlers[action] = [handler];
  }

  build(model) {
    Object.getOwnPropertyNames(Object.getPrototypeOf(model)).forEach(prop => {
      if (typeof model[prop] === 'function' && prop !== 'constructor') {
        Object.defineProperty(this, prop, {
          value: (...args) => {
            const val = model[prop](...args);
            if (this.handlers[prop])
              this.handlers[prop].forEach(handler => handler(val));
            return val;
          },
        });
      }
    });
  }
}

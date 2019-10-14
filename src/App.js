import { el, mount } from './utils';
import cities from './city.list.json';

const App = () => {
  const suggestions = el('ul');
  return el('section', { id: 'app' }, [
    el('input', {
      type: 'text',
      oninput() {
        const { value } = this;
        const data = cities
          .filter(city => city.name.toLowerCase().includes(value.toLowerCase()))
          .slice(0, 10);
        mount(data.map(city => el('li', null, city.name)), suggestions);
      },
    }),
    suggestions,
  ]);
};

export default App;

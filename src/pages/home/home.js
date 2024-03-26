import html from './home.html';
import css from './home.css';

const template = document.createElement('template');
template.innerHTML = `<style>${css}</style>${html}`;

class HomePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export default HomePage
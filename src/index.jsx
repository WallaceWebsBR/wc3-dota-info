import { h, render } from 'preact';

import 'preact/devtools';
import 'preact/debug';

import App from './components/app';

import './index.scss';

const root = document.getElementById('root')

if (root) {
  render(<App />, root);
}
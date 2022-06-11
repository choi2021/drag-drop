import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { Theme } from './theme';
import Reset from './Reset';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RecoilRoot>
    <ThemeProvider theme={Theme}>
      <Reset />
      <App />
    </ThemeProvider>
  </RecoilRoot>
);

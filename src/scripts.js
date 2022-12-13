import { createRoot } from 'react-dom/client';
import { defaultTheme, Provider } from '@adobe/react-spectrum';

import StockNavbarMarketplace from '../dist/stock.navbar';

function App(props) {
  document.body.querySelector('.hello-world').classList.add('unhide');
  return (
    <Provider theme={defaultTheme}>
        <StockNavbarMarketplace></StockNavbarMarketplace>
    </Provider>
  );
}

const block = document.body.querySelector('.hello-world > div > div');
const name = block.textContent;

const root = createRoot(block);
root.render(<App name={name} />);
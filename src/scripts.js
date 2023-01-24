import React from 'react';
import ReactDOM from 'react-dom';
// import { defaultTheme, Provider } from '@adobe/react-spectrum';
import { CoreSpectrumProvider } from '@astock/core-react-spectrum/coreSpectrumProvider';
import { CoreSpectrumV3Provider } from '@astock/core-react-spectrum/coreSpectrumV3Provider';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
// import {
//   FeatureFlagsProvider,
// } from '@astock/react-feature-flags';
import { IntlProvider } from 'react-intl';
import {
  CoreContextProvider,
} from '@astock/core-react-context/core';
// import { ServerTrackingDataProvider } from '@astock/core-react-analytics';
// import { StaticRouter } from 'react-router';

import App from './components';
import store from './store.js';

/**
 * React Router decorates this context with `url` when components redirect.
 * Also, the app/client/components/status.jsx component decorates the context
 * with `status` for certain pages (e.g. the 404 page).
 * @see https://reactrouter.com/web/guides/server-rendering/adding-app-specific-context-information
 */
  const routerContext = {};

/**
 * Hold analytics state. The core-react-analytics package decorates this with
 * a "trackingData" object.
 * @see https://git.corp.adobe.com/AdobeStock/client-lib-js/tree/89df402f9fcc209790bcdc7fed2c1969c5bb5a66/packages/core-react-analytics#usage-1
 */
  const analyticsContext = {};

function WrappedApp() {
  const spectrumContainer = document.createElement('div');
  document.body.appendChild(spectrumContainer);

  return (
    <CoreContextProvider>
      <ReduxProvider store={store}>
        <IntlProvider
          locale="en"
          defaultLocale="en"
        >
          <BrowserRouter
            basename={'/'}
            context={routerContext}
            location={'/'}
            >
              <CoreSpectrumProvider theme="light" toastPlacement="bottom center">
                <CoreSpectrumV3Provider>
                  <App />
              </CoreSpectrumV3Provider>
            </CoreSpectrumProvider>
          </BrowserRouter>
        </IntlProvider>
      </ReduxProvider>
    </CoreContextProvider>
  );
}

const container = document.createElement('div');
document.getElementsByClassName('hello-world')[0].prepend(container);

ReactDOM.render(<WrappedApp />, container);
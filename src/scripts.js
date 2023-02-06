import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// import { defaultTheme, Provider } from '@adobe/react-spectrum';
import { CoreSpectrumProvider } from '@astock/core-react-spectrum/coreSpectrumProvider';
import { CoreSpectrumV3Provider } from '@astock/core-react-spectrum/coreSpectrumV3Provider';
import { Provider as ReduxProvider } from 'react-redux';
// import {
//   FeatureFlagsProvider,
// } from '@astock/react-feature-flags';
import { IntlProvider } from 'react-intl';
import {
  CoreContextProvider,
  FEATURE_FLAGS_NAMESPACE,
} from '@astock/core-react-context/core';
// import { ServerTrackingDataProvider } from '@astock/core-react-analytics';
// import { StaticRouter } from 'react-router';
import {
  STOCK_BASENAME_DEFAULT,
  STOCK_BASENAMES,
} from '@astock/stock-locales/basenames';
import STOCK_BASENAME_TO_LANGUAGE from '@astock/stock-locales/basenameToLanguage';
import STOCK_BASENAME_TO_COUNTRY from '@astock/stock-locales/basenameToCountry';
import STOCK_BASENAMES_GSC from '@astock/stock-locales/basenames/gsc';
import STOCK_COUNTRIES_GSC from '@astock/stock-locales/countries/gsc';

import FEATURE_FLAGS from './featureFlags';
import strings from './strings';
import App from './components';
// import store from './store.js';

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

  // dynamically fetch localized strings file
  const [localizedStrings, setLocalizedStrings] = useState({});

  const getRouteBasename = () => {
    const pathname = '/fr'; // const { pathname } = window.location;
  
    const urlParts = pathname.split('/');
    const basename = urlParts[1];
  
    return STOCK_BASENAMES.has(basename)
      ? basename
      : STOCK_BASENAME_DEFAULT;
  }

  // get locale info from window
  const basename = getRouteBasename();
  const languageTag = STOCK_BASENAME_TO_LANGUAGE.get(basename);
  const country = STOCK_BASENAME_TO_COUNTRY.get(basename);

  // GSC
  const isGSCLocale = STOCK_BASENAMES_GSC.has(basename);
  const isGSCCountry = STOCK_COUNTRIES_GSC.has(country);
  const isGloballySafeCollectionEnabled = isGSCLocale || isGSCCountry;

  useEffect(() => {
    fetch(`/src/strings/${languageTag}.json`)
      .then(res => res.json())
      .then((response) => {
        setLocalizedStrings(response);
      })
      .catch(error => console.log(error));
  
    // import(`/src/strings/fr-FR.js`).then(({default: strings}) => setLocalizedStrings(strings));
  }, []);

  const context = {
    [FEATURE_FLAGS_NAMESPACE]: FEATURE_FLAGS,
  };

  function checkConsent() {
    const activeGroups = window.adobePrivacy.activeCookieGroups();
    if (activeGroups.indexOf('C0004') !== -1) { // the group I want to check
        // load your tracking script
        // perform group related actions
        console.log('Tracking now!')
    }
}
 
window.addEventListener('adobePrivacy:PrivacyConsent', () => {
    console.log('all groups and hosts enabled');
    checkConsent();
});
 
window.addEventListener('adobePrivacy:PrivacyCustom', () => {
    console.log('user selected groups and hosts');
    checkConsent();
});
 
window.addEventListener('adobePrivacy:PrivacyReject', () => {
    console.log('only core groups and hosts enabled - C0001');
    checkConsent();
});

  return (
    <CoreContextProvider {...context}>
      {/* <ReduxProvider store={store}> */}
        <IntlProvider
          locale={languageTag}
          defaultLocale={languageTag}
          messages={localizedStrings}
        >
          <CoreSpectrumProvider theme="light" toastPlacement="bottom center">
            <CoreSpectrumV3Provider>
              <App isGloballySafeCollectionEnabled={isGloballySafeCollectionEnabled} />
            </CoreSpectrumV3Provider>
          </CoreSpectrumProvider>
        </IntlProvider>
      {/* </ReduxProvider> */}
    </CoreContextProvider>
  );
}

const container = document.createElement('div');
document.getElementsByClassName('navbar-placeholder')[0].append(container);

ReactDOM.render(<WrappedApp />, container);
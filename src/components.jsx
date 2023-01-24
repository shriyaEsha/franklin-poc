import React from 'react';
import { connect } from 'react-redux';
// import track from '@astock/core-react-analytics';
// import { withRouter } from 'react-router';
import { StockNavbarMarketplace } from '../dist/stock.navbar.js';

const config = {
    authentication: {
      imsBaseUrl: 'https://ims-na1-stg1.adobelogin.com/ims/',
      imsClientId: 'AdobeStockClient2',
      imsLocale: 'en_US',
      imsSignInUrl: 'authorize/v1',
      imsSignOutUrl: 'logout/v1',
      scopes: [
        'account_cluster.read',
        'additional_info.address.mail_to',
        'additional_info.dob',
        'additional_info.projectedProductContext',
        'additional_info.roles',
        'AdobeID',
        'cc_private',
        'creative_cloud',
        'creative_sdk',
        'gnav',
        'openid',
        'read_organizations',
        'read_pc.stock',
        'read_pc.stock_credits',
        'sao.cce_private',
        'sao.stock',
        'stk.a.internal.cru'
      ],
      imsUrlParams: {
        ctx_id: 'adbstk_c',
        state: '{"ac":"stock.adobe.com"}'
      }
    },
    app: {
      stockUrl: 'https://adobestock.dev.stage.adobe.com',
      url: 'https://adobestock.dev.stage.adobe.com',
      environment: 'local',
      proxyBaseUri: '/premium'
    },
    basename: '',
    locale: 'en-US',
    localeCountry: 'US',
    isGloballySafeCollectionEnabled: false,
    isStorageTokenEnabled: true,
    storageAccessTokenUrl: '/premium/_storageToken',
    ccLibrariesBaseUrl: 'https://ccx-melville-stage.adobe.io/api/v1',
    isUnsupportedRoute: false,
    isK12: false,
    languageCode: 'en',
    phoneNumberForPage: '800-685-3602',
    urls: {
      nonLocalized: {
        adobeAccount: 'https://stage.account.adobe.com',
        adobeBlog: 'https://blog.adobe.com',
        adobeDotCom: 'https://www.stage.adobe.com',
        adobeEnterprise: 'https://stockenterprise.adobe.com',
        adobeFontsTypekit: 'https://use.typekit.net',
        adobeHelpX: 'https://helpx.stage.adobe.com',
        adobeIms: 'https://ims-na1-stg1.adobelogin.com',
        adobeSpark: 'https://spark.adobe.com',
        adobeStock: 'https://primary.stock.stage.adobe.com',
        adobeStockContributor: 'https://primary.stock-contributor.stage.adobe.com',
        adobeStockBrowseStandardAssets: 'https://primary.stock.stage.adobe.com/search?filters[content_type:photo]=1&filters[content_type:illustration]=1&filters[content_type:zip_vector]=1&filters[content_type:video]=1&filters[content_type:template]=1&filters[content_type:3d]=1&filters[content_type:audio]=0&filters[include_stock_enterprise]=0&filters[is_editorial]=0&filters[free_collection]=0&filters[content_type:image]=1&order=relevance&safe_search=1&price[$]=1&search_type=filter-select&get_facets=1'
      },
      localized: {
        adobeAccount: 'https://stage.account.adobe.com?lang=en',
        adobeBlog: 'https://blog.adobe.com',
        adobeDotCom: 'https://www.stage.adobe.com',
        adobeEnterprise: 'https://stockenterprise.adobe.com',
        adobeFontsTypekit: 'https://use.typekit.net',
        adobeHelpX: 'https://helpx.stage.adobe.com',
        adobeIms: 'https://ims-na1-stg1.adobelogin.com?locale=en_US',
        adobeSpark: 'https://spark.adobe.com',
        adobeStock: 'https://primary.stock.stage.adobe.com',
        adobeStockContributor: 'https://primary.stock-contributor.stage.adobe.com',
        adobeStockBrowseStandardAssets: 'https://primary.stock.stage.adobe.com/search?filters[content_type:photo]=1&filters[content_type:illustration]=1&filters[content_type:zip_vector]=1&filters[content_type:video]=1&filters[content_type:template]=1&filters[content_type:3d]=1&filters[content_type:audio]=0&filters[include_stock_enterprise]=0&filters[is_editorial]=0&filters[free_collection]=0&filters[content_type:image]=1&order=relevance&safe_search=1&price[$]=1&search_type=filter-select&get_facets=1'
      }
    },
    analytics: {
      marketingTechBootstrapUrl: 'https://www.adobe.com/marketingtech/main.stage.min.js',
      launchEmbedCode: 'd4d114c60e50/26d60dad928c/launch-beeceef6fc77-staging'
    },
    csrfToken: 'T73vR9nL-FyOZg0OTljqiVlMSTZbiLZjPV8M',
    hostUrl: 'http://adobestock.dev.stage.adobe.com'
  };

const mockedHistory = {
    createHref: () => '/story/stock-navbar',
    location: {
        pathname: '/story/stock-navbar',
    },
};

const analyticsDataCallback = () => ({
    workflow: 'stock-nav',
    'source.platform': 'SLP',
});

const analyticsOptions = {
    dispatch: (data = {}) => {},
    process: (data = {}) => {},
  };

function App({user}) {
    return (
        <StockNavbarMarketplace
            config={config}
            logoutUrl={'#/_logout'}
            phoneNumber={'1800-test'}
            user={user}
            history={mockedHistory}
        />
    )
  }

function mapStateToProps({
  // config,
  user,
}) {
  return {
    // config,
    user,
  };
}

export default connect(mapStateToProps)(App);
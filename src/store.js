import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { createInjectorsEnhancer } from 'redux-injectors';
import { ims } from '@astock/stock-redux-commons/ims';
import { user } from '@astock/stock-redux-commons/user';
import createSagaMiddleware from 'redux-saga';
import { reducer as stockNavbarReducers } from '../dist/stock.navbar';
import rootSaga from './sagas';

const initialState = {};

function createReducer() {
    return combineReducers({
        behance: (state = initialState, action) => {
            switch (action.type) {
                default: {
                    return state;
                }
            }
        },
        creditCardPurchaseEligibility: stockNavbarReducers.creditCardPurchaseEligibility,
        entitlement: stockNavbarReducers.entitlement,
        ims,
        organizations: stockNavbarReducers.profiles,
        user,
    });
}

const composeEnhancers = (...enhancers) => (
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(...enhancers)
      : compose(...enhancers)
);

const preloadedState = {};

const sagaMiddleware = createSagaMiddleware({
    // context: {
    //   apolloClient,
    // },
  });
const runSaga = sagaMiddleware.run;
const middlewares = [sagaMiddleware];
const enhancers = [
    applyMiddleware(...middlewares),
    createInjectorsEnhancer({ createReducer, runSaga }),
];

const store = createStore(
    createReducer(),
    preloadedState,
    composeEnhancers(...enhancers),
  );
sagaMiddleware.run(rootSaga);

export default store;
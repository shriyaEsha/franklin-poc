import { fork } from 'redux-saga/effects';
import { saga as stockNavbarSaga } from '../dist/stock.navbar';

export default function* rootSaga() {
    yield fork(stockNavbarSaga);
}
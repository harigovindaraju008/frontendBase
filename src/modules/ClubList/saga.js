
import { put, all, call, takeLatest, select } from "redux-saga/effects";
import * as actions from './actions';
import { request } from '../utils/request';
import {getError,} from '../utils/commonUtils';
import history from "../utils/history";
import CONFIG from '../utils/config';
export function* getClubList() {
  var requestURL = CONFIG.apiURL + '/apiService/club'
  const state = yield select();
  const login = state.login
  const global = state.global
	// const sessionToken = login.get("currentUser").token;
  const sessionToken = global.sessionToken
  const userId = localStorage.getItem("userId");
  if(!global.nearByClub){
    requestURL += '?userId='+userId

  }
  try {
    var options = {
      method: 'GET',
    	sessionToken: sessionToken,
    };
    const ClubList = yield call(request, requestURL, options);
    console.log('ClubList', ClubList)
    yield put(actions.getClubListSuccess(ClubList));
  }
  catch (err) {
    console.log('err', err)
    yield put(actions.getClubListFailure(getError(err)));

  }
}


export function* addClub() {
  var requestURL = CONFIG.apiURL + '/apiService/club'
  const state = yield select();
  const sessionToken = localStorage.getItem("token");
  console.log(state)
  let clubBody = {
    "name": state.clubs.name,
    "location": state.clubs.location,
    "sportType": 1,
    "address": state.clubs.address,
}
  try {
    var options = {
      method: 'POST',
      body: clubBody,
      sessionToken: sessionToken,
    };
    const currentUser = yield call(request, requestURL, options);
    console.log('currentUser', currentUser)
    yield put(actions.addClubSuccess(currentUser));
    history.push('/clubList')
  }
  catch (err) {
    console.log('err', err)
    yield put(actions.addClubFailure(getError(err)));

  }
}


export default function* clubListSaga() {
  yield all([
    takeLatest('GET_CLUB_LIST', getClubList),
    takeLatest('CLUB_ADD', addClub),


  ]);
}
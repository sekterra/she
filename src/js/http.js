/**
 * backend와 통신하기 위한 axios 설정
 */
import axios from 'axios';
import backendConfig from '@/js/backendConfig.js';
import queryString from 'qs';

// axios 공통함수
var http = {
  url: null,
  param: null,
  type: 'GET',
  async: true,
  isSetHeader: true,
  isAuthCheck: false,
  processData: true,
  dataType: 'json',
  contentType: 'application/json;charset=utf-8',
  ajaxPid: null,  // ajax 요청의 key값 millisecond 데이터
  // isRetry:  false,  // network 커넥션 오류로 인해 재전송 처리 요청 여부(true: 재전송 중, false: 일반 요청)
  accept: null,
  request: null,
  requestGet: null,
  requestPost: null,
  requestPut: null,
  requestFile: null,
  defaultErrorHandler: null,
  getErrorMessage: null,
  isLogin: null,
  isFileRequestPost: false,
  isLoading: true
};

var orgHttp = {
  url: null,
  param: null,
  type: 'GET',
  async: true,
  // isRetry:  false,
  isSetHeader: true,
  isAuthCheck: false,
  processData: true,
  dataType: 'json',
  contentType: 'application/json;charset=utf-8',
  ajaxPid: null,
  isLoading: true
};



// 기본 axios
http.request = function (_callbackSuccess, _callbackFail) {
  // 현재 프로토콜, 호스트를 조합하여 url 설정 (내/외부 접속)
  // BACKEND 직접 호출 시, 주석처리
  if (!http.url) return null;
  // http.url = http.url.charAt(0) === '/' ? http.url.substring(1, http.url.length) : http.url;
  var url = backendConfig.getUrl(http.url); // ajax.isAuthCheck ? config.protocol + config.backEndAuthFullUrl + ajax.url : config.protocol + config.backEndFullUrl + ajax.url
  var key = '';
  var method = http.type.toLowerCase();
  // console.log("url : " + url);
  // console.log("type : " + method);
  // console.log("param : ");
  // console.log(JSON.stringify(http.url));
  // console.log(JSON.stringify(http.param));

  var param = {};
  var query = '';
  var paramKey = '';
  // var form_data = new FormData();
  if (method === 'get') {
    query = queryString.stringify(http.param);
    param = {
      params: http.param, 
      paramsSerializer: () => {
        return query;
      }
    };
  }
  else {
    if (http.isFileRequestPost)
    {
      param = new FormData();

      for (paramKey in http.param) {
        if (http.param.hasOwnProperty(paramKey)) {
          param.append(paramKey, http.param[paramKey]);
        }
      }
    }
    else
    {
      param = http.param;
    }
  }

  var errorMessage = '';
  /**
   * 서버통시시 공용 로딩바 사용
   */
  if (http.isLoading) window.getApp.$emit('LOADING_SHOW');
  setTimeout(() => {
    axios[method](url, param).then((_result) => {
      for (key in orgHttp) {
        if (http.hasOwnProperty(key)) http[key] = orgHttp[key];
      }
      if (typeof _callbackSuccess === 'function') _callbackSuccess(_result);
      if (http.isLoading) window.getApp.$emit('LOADING_HIDE');
      http.isLoading = true;
    }).catch((_error) => {
      // console.log(JSON.stringify(_error));
      try {
        errorMessage = _error.response.data;
      } catch (e) {
        // errorMessage = '원인을 알 수 없는 에러가 발생하였습니다.';
        errorMessage = _error;
      }
      
      // 개발자 에러 메시지
      window.getApp.$emit('NOTIFY', {
        title: '[개발자 안내]',
        message: errorMessage,
        type: 'error',
        duration: 0 // 자동으로 닫히지 않음
      });

      for (key in orgHttp) {
        if (http.hasOwnProperty(key)) http[key] = orgHttp[key];
      }
      if (typeof _callbackFail === 'function') _callbackFail(_error);
      if (http.isLoading) window.getApp.$emit('LOADING_HIDE');
      http.isLoading = true;
    });
  }, 200);
};

http.requestGet = function (_callbackSuccess, _callbackFail) {
  http.type = 'GET';
  return http.request(_callbackSuccess, _callbackFail);
};

http.requestPost = function (_callbackSuccess, _callbackFail) {
  http.type = 'POST';
  return http.request(_callbackSuccess, _callbackFail);
};

http.requestPut = function (_callbackSuccess, _callbackFail) {
  http.type = 'PUT';
  return http.request(_callbackSuccess, _callbackFail);
};

http.requestDelete = function (_callbackSuccess, _callbackFail) {
  http.type = 'DELETE';
  return http.request(_callbackSuccess, _callbackFail);
};

http.getErrorMessage = function (_error) {
  if (_error.status === 400) {
    return '[400오류]필수 입력값이 입력되지 않았습니다.';
  }
};

export default http;

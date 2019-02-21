/**
 * backend 접속 정보를 가지고 있는 js
 */
let backendConfig = {
  protocol: 'http',
  url: 'localhost',
  // url: '10.10.11.104',
  // url: '10.10.11.128',
  port: '8080'
};

backendConfig.getHttpAddress = () => {
  return backendConfig.protocol + '://' + backendConfig.url + ':' + backendConfig.port;
  // return backendConfig.protocol + '://' + backendConfig.url + ':' + backendConfig.port + '/ROOT';
  
};

backendConfig.getUrl = (_pageUrl) => {
  if (!_pageUrl || typeof _pageUrl !== 'string') {
    window.alert('[개발자용 메시지]: 유효한 주소가 아닙니다.');
    return '';
  }
  var pageUrl = _pageUrl.charAt(0) === '/' ? _pageUrl : '/' + _pageUrl;
  return backendConfig.getHttpAddress() + pageUrl;
};

export default backendConfig;
import getRoute from '../helper/ApiUrls';

const NON_AUTHENTICATED_URLS = [
  getRoute('login'),
  getRoute('resetlink'),
  getRoute('resetPassword'),
  getRoute('forgotPassword'),
  getRoute('findOrganization'),
];
export default NON_AUTHENTICATED_URLS;

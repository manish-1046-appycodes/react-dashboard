import { saveToLocalStorage, deleteFromLocalStorage } from '../../utils/localStorage';
import { publicRequest } from '../../utils/apiRequest';

const login = async (userLoginCredentials) => {
  const { username, password } = userLoginCredentials;

  const loginFormFields = new FormData();
  loginFormFields.append('username', username);
  loginFormFields.append('password', password);

  const response = await publicRequest.post('/api/auth/login', loginFormFields);

  if (response.data) {
    saveToLocalStorage(response.data);
  }
  return response;
};

const register = async (userRegistrationCredentials) => {
  // const { username, password, email } = userRegistrationCredentials;

  // const registrationFormFields = new FormData();
  // registrationFormFields.append('username', username);
  // registrationFormFields.append('email', password);
  // registrationFormFields.append('password', password);

  const response = await publicRequest.post('/api/users/create', userRegistrationCredentials);

  return response;
};

const logout = async () => {
  deleteFromLocalStorage();
  return true;
};

const authService = { login, logout, register };

export default authService;

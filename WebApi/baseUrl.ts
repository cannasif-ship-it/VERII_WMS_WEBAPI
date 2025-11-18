import i18n from 'i18next'; 

//export const API_BASE_URL: string = "https://api.v3rii.com/api" 
export const API_BASE_URL: string = "http://localhost:5000/api"  
export const DEFAULT_TIMEOUT: number = 10000; 
export const CURRENTLANGUAGE = i18n.language || 'tr'; 

export const getAuthToken = (): string | null => {
  const token = localStorage.getItem('authToken');
  if (token) {
    return token;
  }
  
  const sessionToken = sessionStorage.getItem('authToken');
  if (sessionToken) {
    return sessionToken;
  }
  
  return null;
};


export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};


export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('authToken');
};

export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};

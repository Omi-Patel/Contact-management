import axios from "axios";

// Base URL for your API (adjust as needed)
const API_BASE_URL = "https://nexcontact-server.onrender.com/api";

// Function to set a cookie
function setCookie(name: any, value: any, days: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie by name
export function getCookie(name: any) {
  if (typeof document === "undefined") {
    return null;
  }

  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Function to erase a cookie by name
export function eraseCookie(name: any) {
  if (typeof document === "undefined") {
    return null;
  }
  document.cookie = name + "=; Max-Age=-99999999;";
}

// Function to save the token in a cookie
export function saveToken(token: any) {
  setCookie("authToken", token, 1); // Cookie expires in 7 days
}

// Function to get the token from the cookie
export function getToken() {
  return getCookie("authToken");
}

// Function to remove the token from the cookie
export function removeToken() {
  eraseCookie("authToken");
}

// Function to sign up a new user
export async function signUp(userData: any) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/register`,
      userData
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Sign-up failed");
  }
}

// Function to sign in a user
export async function signIn(credentials: any) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/login`,
      credentials
    );
    saveToken(response.data.access_token);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Sign-in failed");
  }
}

// Axios instance with token management
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach token to headers
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration or other errors
apiClient.interceptors.response.use(
  (response: any) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., token expiration)
      removeToken();
      // Redirect to login page or show error message
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

// Function to handle errors
const handleError = (error: any) => {
  if (error.response) {
    // Server responded with a status other than 200 range
    console.error("Server Error:", error.response.data.message);
    throw new Error(error.response.data.message);
  } else if (error.request) {
    // Request was made but no response received
    console.error("Network Error:", error.message);
    throw new Error("Network error, please try again later.");
  } else {
    // Something happened in setting up the request
    console.error("Error:", error.message);
    throw new Error(error.message);
  }
};

// Function to fetch current user
export async function currentUser() {
  try {
    const response = await apiClient.get("/user/current");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Request failed");
  }
}

// Get all contacts
export const getAllContacts = async () => {
  try {
    const response = await apiClient.get("/contacts");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Get a single contact by ID
export const getContact = async (id: string) => {
  try {
    const response = await apiClient.get(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Create a new contact
export const createContact = async (contactData: any) => {
  try {
    const response = await apiClient.post("/contacts", contactData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Update a contact by ID
export const updateContact = async (
  id: string,
  contactData: { name?: string; email?: string; phone?: string }
) => {
  try {
    const response = await apiClient.put(`/contacts/${id}`, contactData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Delete a contact by ID
export const deleteContact = async (id: string) => {
  try {
    const response = await apiClient.delete(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

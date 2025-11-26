const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

async function handleResponse(response) {
  const contentType = response.headers.get('content-type');
  const isJSON = contentType && contentType.includes('application/json');

  const data = isJSON ? await response.json() : await response.text();

  if (!response.ok) {
    throw new APIError(
      data.error || data.message || 'An error occurred',
      response.status,
      data
    );
  }

  return data;
}

async function request(endpoint, options = {}) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    return await handleResponse(response);
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    // Network error or other unexpected error
    throw new APIError(
      'Unable to connect to the server. Please check your connection.',
      0,
      null
    );
  }
}

// User API methods
export const userAPI = {
  // Get all users
  getAll: () => request('/users'),

  // Get user by ID
  getById: (id) => request(`/users/${id}`),

  // Create new user
  create: (userData) =>
    request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  // Update user
  update: (id, userData) =>
    request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),

  // Delete user
  delete: (id) =>
    request(`/users/${id}`, {
      method: 'DELETE',
    }),
};

// Health check
export const healthAPI = {
  check: () => request('/health'),
};

export { APIError };

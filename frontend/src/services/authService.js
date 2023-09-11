const BASE_URL = 'http://localhost:5000/api/auth';

const authService = {
  register: async (username, password, userType, address) => {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, userType, address }),
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }

    // Save the userType in session storage
    localStorage.setItem('userType', userType);
  },

  login: async (username, password) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }
    const responseData = await response.json();
    
    const { token, userType, transporterID } = responseData;
    
    // Save the userType and transporterID in localStorage
    localStorage.setItem('userType', userType);
    localStorage.setItem('transporterID', transporterID);
    
    return token;
  },
};

export default authService;

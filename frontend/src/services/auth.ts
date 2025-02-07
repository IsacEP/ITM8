export const login = async (username: string, password: string) => {
    const response = await fetch('http://localhost:8000/api/login/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  };
  
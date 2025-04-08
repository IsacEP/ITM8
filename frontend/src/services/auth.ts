import axios from "axios";

export const login = async (
  username: string,
  password: string
): Promise<boolean> => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/login/",
      { username, password },
      { headers: { "Content-Type": "application/json" } }
    );
    localStorage.setItem("token", response.data.token);
    return true;
  } catch (error) {
    console.error("Login error", error);
    return false;
  }
};

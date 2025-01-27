import axios from "axios";

export const handleFormSubmit = async (values, formType) => {
  try {
    let userId = 0;
    if (formType === "register") {
      try {
        const { data }  = await axios.post(
          `http://localhost:3001/api/users/register`,
          {
            username: values.name,
            email: values.email,
            password: values.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        userId = data.user.id;
        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", data.user.username);
        localStorage.setItem("token", data.token);
      } catch (error) {
        return { success: false, message: error.response.data.error };
      }
      return { success: true, userId };
    } else if (formType === "login") {
      try {
        const { data } = await axios.post(
          `http://localhost:3001/api/users/login`,
          {
            email: values.email,
            password: values.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        //! TODO: se debe guardar el token para mantener la sesion activa res.data.token
        userId = data.user.id;
        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", data.user.username);
        localStorage.setItem("token", data.token);
      } catch (error) {
        return { success: false, message: error };
      }
      return { success: true, userId };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false, error: error };
  }
};
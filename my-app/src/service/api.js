import Axios from "axios";

const API_URL = "http://localhost:3001";

export const Api = {
  login: async ({ email, password }) => {
    return Axios.post(`${API_URL}/user/login`, {
      email,
      password,
    });
  },

  signup: async ({ firstName, lastName, email, password }) => {
    return Axios.post(`${API_URL}/user/signup`, {
      name: firstName + " " + lastName,
      email,
      password,
    });
  },

  getUsers: async ({ page = 1 }, { jwt }) => {
    return Axios.get(`${API_URL}/user/?page=${page}`, {
      headers: { jwt },
    });
  },

  addUser: async ({ name, email, password, isManager }, { jwt }) => {
    return Axios.post(
      `${API_URL}/user/`,
      { name, email, password, isManager },
      { headers: { jwt } }
    );
  },

  updateUser: async (id, { name, email, password, isManager }, { jwt }) => {
    return Axios.put(
      `${API_URL}/user/${id}`,
      { name, email, password, isManager },
      { headers: { jwt } }
    );
  },

  deleteUser: async (id, { jwt }) => {
    return Axios.delete(`${API_URL}/user/${id}`, { headers: { jwt } });
  },

  getBikes: async (
    { model, color, location, avgRating, page = 1 },
    { jwt }
  ) => {
    return Axios.get(`${API_URL}/bike/?page=${page}`, { headers: { jwt } });
  },

  addBike: async ({ model, color, location, isAvailable }, { jwt }) => {
    return Axios.post(
      `${API_URL}/bike`,
      { model, color, location, isAvailable },
      { headers: { jwt } }
    );
  },

  updateBike: async (id, { model, color, location, isAvailable }, { jwt }) => {
    return Axios.put(
      `${API_URL}/bike/${id}`,
      { model, color, location, isAvailable },
      { headers: { jwt } }
    );
  },

  deleteBike: async (id, { jwt }) => {
    return Axios.delete(`${API_URL}/bike/${id}`, { headers: { jwt } });
  },

  bookBike: async (id, { fromDateTime, toDateTime }, { jwt }) => {
    return Axios.post(
      `${API_URL}/bike/book`,
      { bikeId: id, fromDateTime, toDateTime },
      { headers: { jwt } }
    );
  },

  getReservations: async ({ page = 1 }, { isManager, jwt }) => {
    const reqType = isManager ? "all" : "user";
    return Axios.get(`${API_URL}/reservation/${reqType}/?page=${page}`, {
      headers: { jwt },
    });
  },

  deleteReservation: async (id, { jwt }) => {
    return Axios.delete(`${API_URL}/reservation/${id}`, { headers: { jwt } });
  },

  addRating: async ({ id, avgRating }, { jwt }) => {
    return Axios.post(
      `${API_URL}/bike/rate/`,
      { bikeId: id, rating: avgRating },
      { headers: { jwt } }
    );
  },
};

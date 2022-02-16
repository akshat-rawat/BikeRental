import Axios from "axios";
import * as moment from "moment";

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

  updateUser: async (id, { name, email, isManager }, { jwt }) => {
    return Axios.put(
      `${API_URL}/user/${id}`,
      { name, email, isManager },
      { headers: { jwt } }
    );
  },

  deleteUser: async (id, { jwt }) => {
    return Axios.delete(`${API_URL}/user/${id}`, { headers: { jwt } });
  },

  getBikes: async (
    { model, color, location, minRating, page = 1, fromDateTime, toDateTime },
    { jwt }
  ) => {
    if (fromDateTime) fromDateTime = moment(fromDateTime).format();
    if (toDateTime) toDateTime = moment(toDateTime).format();
    return Axios.get(`${API_URL}/bike/?page=${page}`, {
      headers: { jwt },
      params: {
        fromDateTime,
        toDateTime,
        model,
        color,
        location,
        rating: minRating,
      },
    });
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
    if (fromDateTime) fromDateTime = moment(fromDateTime).format();
    if (toDateTime) toDateTime = moment(toDateTime).format();
    return Axios.post(
      `${API_URL}/bike/book`,
      { bikeId: id, fromDateTime, toDateTime },
      { headers: { jwt } }
    );
  },

  getReservations: async ({ page = 1, bikeId, userId }, { jwt }) => {
    return Axios.get(`${API_URL}/reservation/?page=${page}`, {
      headers: { jwt },
      params: { bikeId, userId },
    });
  },

  cancelReservation: async (id, { jwt }) => {
    return Axios.put(
      `${API_URL}/reservation/${id}/cancel`,
      {},
      { headers: { jwt } }
    );
  },

  addRating: async ({ id, rating }, { jwt }) => {
    return Axios.post(
      `${API_URL}/reservation/${id}/rate/${rating}`,
      {},
      { headers: { jwt } }
    );
  },
};

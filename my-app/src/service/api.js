import { BikesData, ReservationsData, UsersData } from "../utils/constants";

export const Api = {
  login: async ({ email, password }) => {
    return {
      data: {
        isManager: true,
      },
    };
  },

  signup: async ({ firstName, lastName, email, password }) => {},

  getBikes: async ({ model, color, minRating, page = 1 }) => {
    return {
      data: { page, pageCount: 3, bikes: BikesData },
    };
  },

  getReservations: async ({ page = 1 }) => {
    return {
      data: { page, pageCount: 2, reservations: ReservationsData },
    };
  },

  getUsers: async ({ page = 1 }) => {
    return {
      data: { page, pageCount: 2, users: UsersData },
    };
  },
};

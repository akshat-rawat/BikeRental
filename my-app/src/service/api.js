import { BikesData, ReservationsData, UsersData } from "../utils/constants";

export const Api = {
  login: async () => {
    return {
      data: {
        isManager: true,
      },
    };
  },

  signup: async () => {},

  getBikes: async ({ name, model, color, minRating, page = 1 }) => {
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

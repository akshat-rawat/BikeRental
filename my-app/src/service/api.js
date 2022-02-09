export const Api = {
    login: async () => {
        return {
            data: {
                isManager: true
            }
        }
    },

    signup: async () => {

    },

    getBikes: async ({name, model, color, minRating}) => {
        return {
            data: {}
        }
    },

    getReservations: async () => {
        return {
            data: [

            ]
        }
    }
}
const  { env } = process;

export const HOST = env.HOST;
export const PORT = Number(env.PORT);
export const MONGO_CONN_URI = env.MONGO_DB_URI

export const constants = {
    openWeatherMap: {
        BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
        SECRET_KEY: "6d18743f78e536f11931eaf761919829"

    }

}
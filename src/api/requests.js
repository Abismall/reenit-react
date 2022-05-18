import { axiosInstance } from "./config";

export const getCurrentGame = () => {
    return axiosInstance.get("/users/user/current")
}
export const getAllUsers = () => {
    return axiosInstance.get("/users/users/");
}
export const getAllCurrentGames = () => {
    return axiosInstance.get("/reenit/scrims/")
}
export const switchTeam = () => {
    return axiosInstance.post("/users/user/actions/scrim/")
}
export const updateLobby = (data) => {
    return axiosInstance.put("/reenit/scrim/update", data)
}

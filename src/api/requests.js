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
export const joinLobby = (lobbyTitle) => {
    return axiosInstance.post("/reenit/scrim/", lobbyTitle)
}
export const leaveLobby = () => {
    return axiosInstance.delete("/reenit/")
}
export const switchTeam = () => {
    return axiosInstance.post("/users/user/actions/scrim/")
}
export const movePlayers = (ListOfIds) => {
    return axiosInstance.put("reenit/scrim/update/switch", ListOfIds)
}
export const updateLobby = (UpdatedLobby) => {
    return axiosInstance.put("/reenit/scrim/update", UpdatedLobby)
}
export const loginUser = (formData) => {
    return axiosInstance.post("/login", formData)
}
export const getUser = () => {
    return axiosInstance.get("/users/user")
}
export const registerUser = (credentials) => {
    return axiosInstance.post("/users", credentials)
}
export const verifySteam = (profileUrl) => {
    return axiosInstance.post("/users/user/actions/verify", profileUrl)
}
export const getProfilePicture = (profileUrl) => {
    return axiosInstance.get("/users/user/actions/steamprofile", profileUrl)
}
export const HostGame = (title) => {
    return axiosInstance.post("/reenit/scrims", title)
}
export const getAvailableServers = () => {
    return axiosInstance.get("dathost/available/")
}
export const startServer = (serverID, current) => {
    return axiosInstance.post(`dathost/start/${serverID}`, current)
}
export const getServerData = (serverID) => {
    return axiosInstance.get(`dathost/details/${serverID}`)
}
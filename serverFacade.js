
import { SERVER_URL } from "./settings";

ServerFacade = () => {

  async function fetchGameArea() {
    const res = await fetch(`${SERVER_URL}/api/game/gameArea`)
                .then(res => res.json());
    return res.coordinates;
  }

  async function isUserInArea(lon, lat, username, password) {
    const status = await fetch(`${SERVER_URL}/api/game/isIn/${lon}/${lat}/${username}/${password}`).
                    then(res => res.json())
    return status;
  }

  async function updatePosition(lon,lat,username,password) {
    const status = await fetch(`${SERVER_URL}/api/game/updatePosition/${lon}/${lat}/${username}/${password}`)
                    .then(res => res.json())
    return status
  }

  async function getNearbyPlayers(lon,lat,distance,username,password) {
    const status = await fetch(`${SERVER_URL}/api/game/nearbyPlayers/${lon}/${lat}/${distance}/${username}/${password}`)
                  .then(res => res.json())
    return status
  }

  async function getPostIfReached(lon,lat,postID) {
    const status = await fetch(`${SERVER_URL}/api/game/getPostIfReached/${lon}/${lat}/${postID}`)
                    .then(res => res.json())
    return status
  }

  return {
    fetchGameArea,
    isUserInArea,
    updatePosition,
    getNearbyPlayers,
    getPostIfReached
  } 
}

export default ServerFacade();
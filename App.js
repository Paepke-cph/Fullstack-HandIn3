import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Constants from 'expo-constants';
import facade from "./serverFacade";

import UploadModal from './components/UploadModal'
import Map from './components/Map'

const MyButton = ({ txt, onPressButton }) => {
  return (
    <TouchableHighlight style={styles.touchable} onPress={onPressButton}>
      <Text style={styles.touchableTxt}>{txt}</Text>
    </TouchableHighlight>
  );
}

export default App = () => {
  const [position, setPosition] = useState({ latitude: null, longitude: null })
  const [gameArea, setGameArea] = useState([]);
  const [region, setRegion] = useState(null);
  const [serverIsUp, setServerIsUp] = useState(false);
  const [status, setStatus] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false)

  let mapRef = useRef(null);

  useEffect(() => {
    getLocationAsync()
    getGameArea()
  }, [])
  
  async function getGameArea() {
    var data = await facade.fetchGameArea()
    console.log(data[0])
    setGameArea({data})
  }

  getLocationAsync = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if(status !== 'Granted') {
      let { status } = await Location.requestPermissionsAsync();
    }
    let location = await Location.getCurrentPositionAsync({});
    setPosition({
      latitude:  location.coords.latitude,
      longitude: location.coords.longitude
    })
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.0422
    })
    setServerIsUp(true)
  };

  onCenterGameArea = () => {
    setRegion({
      latitude:gameArea.data[0][0][1],
      longitude:gameArea.data[0][0][0],
      latitudeDelta: 0.09,
      longitudeDelta: 0.0422
    })
  }

  const uploadLocationToServer = async (username, password) => {
    var inside = await facade.isUserInArea(position.longitude,position.latitude,username,password);
    if(inside.msg !== undefined) {
      alert(inside.msg)
    }
  }

  const info = serverIsUp ? status : " Server is not up";
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>

      {!region && <Text style={styles.fetching}>
        .. Fetching data</Text>}

      {region && position && gameArea !== undefined &&
        <Map
          region={region}
          gameArea={gameArea}
        />
      }
  
      <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>
        Your position (lat,long): {position.latitude}, {position.longitude}
      </Text>
      <Text style={{ flex: 1, textAlign: "center" }}>{info}</Text>

      <MyButton style={{ flex: 2 }} onPressButton={() => {setModalVisibility(true)}}
        txt="Upload real Position" />

      <MyButton style={{ flex: 2 }} onPressButton={() => onCenterGameArea()}
        txt="Show Game Area" />

      <UploadModal
        visible={modalVisibility}
        setVisible={setModalVisibility}
        uploadLocation={uploadLocationToServer}  
      />
      
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  touchable: { backgroundColor: "#4682B4", margin: 3 },
  touchableTxt : { fontSize: 22, textAlign: "center", padding: 5 },
  
  fetching: {
    fontSize: 35, flex: 14,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
    paddingTop: Constants.statusBarHeight
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  mapStyle: {
    flex: 1,
    width:'100%'
  },
  mapViewStyle: {
    flex: 3,
    justifyContent: "center"
  }
});

function showStatusFromServer(setStatus, status) {
  setStatus(status.msg);
  setTimeout(() => setStatus("- - - - - - - - - - - - - - - - - - - -"), 3000);
}

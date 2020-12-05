import React from 'react'
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
import { StyleSheet, View } from 'react-native'

export default Map = ({region,gameArea}) => {
    return(
        <View style={styles.mapViewStyle} >
            <MapView
              showsUserLocation
              provider={PROVIDER_GOOGLE}
              region={region}
              style={styles.mapStyle}
            >
            {gameArea !== undefined && gameArea.data !== undefined && gameArea.data[0].map((m,index) => {
              <MapView.Marker
                key={index}
                coordinate={{
                  latitude:m[1],
                  longitude:m[0]
                }}
              />
            })}
            </MapView>
        </View>
    )
}


const styles = StyleSheet.create({
    mapStyle: {
        flex: 1,
        width:'100%'
    },
    mapViewStyle: {
        flex: 3,
        justifyContent: "center"
    }
})
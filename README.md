# Fullstack Hand-In 3

### Backend - Deployed
[paepke.software]("paepke.software")
### Backend - Repository (HandIn2)
[GitHub]("https://github.com/Paepke-cph/Fullstack-Handin2")
## NodeJS Deployment
Til deployment af vores backend, skrevet i TS+Nodejs, var en meget simple løsning at blot clone vores repo, på Droplet-Serveren. Det eneste der er krævet er at serveren har mulighed for at køre NodeJS programmer. Da det er muligt at lave en Droplet Server, med denne opsætning er der ikke noget problem i dette.
Efter projektet er klonet, kan det bygges og startes. Ligesom vi gjorde på 3. semester så skal vi igen gøre brug af NGINX for at overføre al trafik en (fra port 80) til vores server som køre på en anden port.
Da vi har haft gjort brug af en .env fil mens vi har udviklet vores NodeJS server. Vi kan ligeledes lave en .env fil i roden af projektets folder eller ved brug af miljøvariabler.
Efter serveren er sat op og startet op kan den kontaktes direkte via [dette]("paepke.software") link


## React Native
### Cross-platforn
React Native er et godt valg, skulle man stå i en situation hvor man gerne vil udvikle apps til både iOS og Android, men ikke er interesseret i at gøre sig bekendt med swift/objective-c til iOS og java/kotlin til android. I stedet er det muligt at udvikle apps til begge systemer, ved brug af kun JavaScript.
```JavaScript
import {View, Text, StyleSheet} from 'react-native'
export default App = () => {
    return(
        <View style={styles.mainView}>
            <Text>
                Within a Text component, you can write all your texts.... 
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'row'
    }
})
```
Er man bekendt med React er det meget ligetil at hoppe på React Native, da programmeringsstilen er den samme og det meste kan klares ved brug af JavaScript. For at React Native kan compileres til all platforme, er man dog nød til at gøre brug af React Natives egne komponenter, som nemlig kan cross-compiles, man vil dog finde at mængden af disse komponenter kan være bregrænset.

### Hooks
Som vi kender det fra React, så er det også muligt at gøre brug af diverse hooks (useState,useEffect, etc)
```JavaScript
import React, {useState} from 'react'
import {View} from 'react-native'
import CompUsingState from './components/CompUsingState'

export default App = () => {
    const [aStateVariable, setStateVariable] = useState({})
    const [data, setData] = useState([])
    useEffect(() => {
        // fetch some data or something.....
        fetchSomeData().then(res => res.json()).then(data => setData(data))
    }[])
    
    return(
        <View>
            <CompUsingState
                awesomeVar={aStateVariable}
            >
        </View>
    )
}

```
### Fetch
Ligesom før med hooks så er fetch lige så 'lige til' som vi kender det fra React.
```JavaScript
import { SERVER_URL } from "./settings";

ServerFacade = () => {

  async function fetchGameArea() {
    const res = await fetch(`${SERVER_URL}/api/game/gameArea`)
                .then(res => res.json());
    return res.coordinates;
  }

  return {
    fetchGameArea,
  } 
}

export default ServerFacade();
```
### Location / Map
I vores Game App, hvilke jo handler om geografiske lokations data, så gør vi brug af **Location** til at finde vores clients lokation, altså den mobile apps lokation, og vi gør brug af **MapView** komponentet fra react-native-maps.
Da der er tale om at vi skal gøre brug af telefonens lokation, så skal vi først have tilladelse af brugeren til dette. Dette sker igennem et kald, vises herunder, hvormed brugeren tillader appen brug af telefonens lokation.
```JavaScript
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
```
For at vise et interaktivt kort, hvor vi også har mulighed for at se vores forskellige poster, spillere, og spille-område lokationer, gør vi brug af et React Native komponent **ViewMap**
```JavaScript
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
```
Ved brug af <MapView> kan vi både sætte et start sted for kortet (region) og vælge om brugerens position skal vises (showsUserLocation). Ligesom vi låner <MapView> fra React Native, så gør vi det samme for at kunne sætte markøre ind, her gør vi brug af <Marker> for at indsætte disse. I det overstående eksemple løber vi vores liste af punkter, af spille-området, igennem og placerer en markør for hver af dem.

## Expo
Igennem Expo bliver vi givet en masse værktøjer som gør det meget nemmere at deploye apps på kryds af iOS og android. Dette har dog også den betydning at al kommunikation med de forskellige underliggende platforme, så skal det gå igennem hvad Expo giver af muligheder. Hvor havde vi gjort brug af React Native CLI, altså react native uden brug af expo, så ville vi ikke få de samme mængder af *hjælpeværktøjer*, men i stedet vil vi have en mere direkte adgang til den underliggende platform. Det er dog en mulighed at starte ud med et projekt der gør brug af Expo og senere så slippe det, ved brug af **ejection**
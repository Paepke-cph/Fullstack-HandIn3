import React, {useState} from 'react'
import {StyleSheet, Modal, TextInput, Button, View } from 'react-native'
 
export default UploadModal = ({visible, setVisible, uploadLocation}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsernameChange = (input) => {
        setUsername(input)
    }

    const handlePasswordChange = (input) => {
        setPassword(input)
    }

    const handleCancel = () => {
        setVisible(false)
        setUsername("")
        setPassword("")
    }

    const handleUpload = () => {
        if(username === "" || password === "") {
            alert("Please input Username and/or Password")
        } else {
            setVisible(false)
            uploadLocation(username,password)
            setUsername("")
            setPassword("")
        }
    }

    return(
        <Modal
            visible={visible}
            animationType="slide"
            >
            <View
                style={styles.modal}
                >
                <TextInput 
                    style={styles.textInput}
                    placeholder="Username" 
                    value={username} 
                    onChangeText={handleUsernameChange}
                    />
                <TextInput 
                    style={styles.textInput}
                    placeholder="Password" 
                    value={password}
                    onChangeText={handlePasswordChange}
                    />
                <View
                    style={styles.buttonGroup}
                    >
                    <Button 
                        title="cancel"
                        color="red"
                        onPress={() => handleCancel()}
                        />
                    <Button
                        title="Upload"
                        onPress={() => handleUpload()}
                        />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal:{
        flex:1,
        paddingBottom:40,
        marginBottom:50
    },
    textInput:{
        borderWidth: 2,
        borderColor: "#fff"
    },
    buttonGroup: {
        flex: 1,
    }
})
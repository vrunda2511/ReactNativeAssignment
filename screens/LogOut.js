import React, { useContext,useEffect,useState } from 'react';
import { StyleSheet, Text, View,Alert  } from 'react-native';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
const auth = Firebase.auth();
export default function LogOut() {
  const {setUser } = useContext(AuthenticatedUserContext); 
  const [showBox, setShowBox] = useState(true);
  useEffect(() => {
    //  auth.signOut();
    // setUser(null)
    showConfirmDialog()
  }, [])
  const logoutuser=()=>{
    auth.signOut();
    setUser(null)
    setShowBox(false)
  }
  const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want Logout?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            logoutuser();
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };
  return (
    <View style={styles.container}>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 300,
    height: 300,
    backgroundColor: "red",
    marginBottom: 30,
  },
  text: {
    fontSize: 30,
  },
});
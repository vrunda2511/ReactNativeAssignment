import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { AsyncStorage, Dimensions, StyleSheet, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Chip, Dialog, TextInput, Title } from 'react-native-paper';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import ViewGraph from './ViewGraph';

const screenWidth = Dimensions.get("window").width;
export default function HomeScreen() {
  const { user } = useContext(AuthenticatedUserContext);
  const [isDialogVisible, setIsDialogVisible] = useState(false)
  const [isDialogVisibleWaterTarget, setIsDialogVisibleWaterTarget] = useState(false)
  const [inputVal, setInputVal] = React.useState(0);
  const [target, setWatertarget] = React.useState("NaN");
  const [water, setWater] = React.useState("NaN");
  const [inputValwaterTarget, setInputValwaterTarget] = React.useState("NaN");
  let value = 0, waterTarget = 0;
  useEffect(async () => {
    getPushNotificationPermissions();
    try {
      value = await AsyncStorage.getItem('water');
      waterTarget = await AsyncStorage.getItem('waterTarget');
      setWatertarget(waterTarget)
      setWater(value)
    }
    catch (error) {
      console.log(error)
    }
  });


  const getPushNotificationPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }


    if (finalStatus !== 'granted') {
      return;
    }
    console.log(await Notifications.getExpoPushTokenAsync());
  }
  const AddCupWater = async () => {
    setIsDialogVisible(true)
  }
  const AddWaterTareget = async () => {
    setIsDialogVisibleWaterTarget(true)
  }
  const addWater = async (val) => {
    console.log(val, water, parseInt(val) + parseInt(water))
    try {
      await AsyncStorage.setItem('water', (parseInt(val) + parseInt(water)).toString())
    }
    catch (error) {
      console.log(error)
    }
    setIsDialogVisible(false)

  }
  const setTarget = async (val) => {
    try {
      await AsyncStorage.setItem('waterTarget', val.toString())
    }
    catch (error) {
      console.log(error)
    }
    setIsDialogVisibleWaterTarget(false)

  }
  const ResetWater = async (val) => {
    try {
      setWater(0)
      await AsyncStorage.setItem('water', '0')
    }
    catch (error) {
      console.log(error)
    }

  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style='dark-content' />
        <View style={styles.row} textAlign="center">
          <Text style={styles.title}>Welcome {user.email}!</Text>
        </View>
        {
          user.uid ?
            <Text style={styles.text}></Text>
            :
            <Text style={styles.text}>Welcome {user.name} ! </Text>
        }
        <View style={styles.addContainer}>

          <ViewGraph />
          <View >
            <Chip
              mode='outlined'
              icon='information'
              selectedColor='#ffa726'
              backgroundColor='#000'
              style={{ marginTop: 10, marginBottom: 5, backgroundColor: "#000", textAlign: 'center', justifyContent: 'center' }}
            >
              Your target: {target} ml
            </Chip>
            
            <AnimatedCircularProgress
              style={styles.progress}
              size={245}
              width={32}
              rotation={0.25}
              arcSweepAngle={360}
              fill={(water / target) * 100}
              tintColor="#ffa726"
              backgroundColor="#131A26"
              childrenContainerStyle={styles.circle}
              children={
                () => (
                  <View style={{ alignItems: 'center', transform: [{ rotate: "-45deg" }], }}>
                    <Title style={{ color: '#fff' }}>
                      {target} ml
                                </Title>
                    <Text style={{ color: '#fff' }}>
                      {(water / target) * 100} %
                                </Text>
                  </View>
                )
              }
            />
             <Button icon="close" mode="contained" color="#fb8c00" onPress={ResetWater}  >
                RESET
            </Button>
            <Title style={{ color: "#fff", textAlign: "center", marginTop: 10 }}>+ Add a portion of water</Title>
            <View style={styles.buttons}>
              <Button icon="cup" mode="contained" color="#fb8c00" onPress={AddWaterTareget}  >
                Target
            </Button>
              <Button icon="glass-stange" mode="contained" color="#fb8c00" onPress={AddCupWater}>
                Bottle
            </Button>
           
            </View>
            
          </View>
          
        </View>
        <Dialog
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}>
          <Dialog.Title>Water intake</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Amount of water to add"
              placeholder="in millilitres"
              underlineColor="#fb8c00"
              theme={{ colors: { primary: '#fb8c00' } }}
              onChangeText={text => setInputVal(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              theme={{ colors: { primary: '#fb8c00' } }}
              onPress={() => {
                setIsDialogVisible(false);
                if (inputVal !== "") addWater(parseInt(inputVal));
              }}>Done</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog
          visible={isDialogVisibleWaterTarget}
          onDismiss={() => setIsDialogVisibleWaterTarget(false)}>
          <Dialog.Title>Water target</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Set water target"
              placeholder="in millilitres"
              underlineColor="#fb8c00"
              theme={{ colors: { primary: '#fb8c00' } }}
              onChangeText={text => setInputValwaterTarget(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              theme={{ colors: { primary: '#fb8c00' } }}
              onPress={() => {
                setIsDialogVisibleWaterTarget(false);
                if (!isNaN(inputValwaterTarget)) setTarget(parseInt(inputValwaterTarget));
              }}>Done</Button>
          </Dialog.Actions>
        </Dialog>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 10,
    paddingHorizontal: 12,

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 1
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center'
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#fff',
    textAlign: 'center'
  },
  addContainer: {
    flex: 1,
    flexGrow: 0.45,
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth,
    alignContent: 'space-between',
    flexWrap: 'wrap',

    justifyContent: 'space-evenly',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth - 100,
    flexGrow: 0.45,
    alignContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 50,
    marginTop: 10,
    justifyContent: 'space-evenly',
  },
  circle: {
    width: 181,
    height: 181,
    borderRadius: 120,
    borderWidth: 5,
    backgroundColor: '#27354d',
    borderColor: "#fb8c00",
    borderTopLeftRadius: 10,
    borderBottomWidth: 10,
    borderRightWidth: 10,
    transform: [{ rotate: "45deg" }],
    shadowColor: "#000000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10.00,
    elevation: 10,
  },
  progress: {
    width: 264,
    height: 264,
    marginBottom: 10,
    borderRadius: 300,
    borderWidth: 10,
    marginLeft: 10,
    borderColor: "#fb8c00",
    overflow: 'hidden',
  }

});
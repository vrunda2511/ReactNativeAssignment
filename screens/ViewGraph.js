import { StyleSheet, Text, View,Dimensions } from 'react-native';
import {
  LineChart
} from 'react-native-chart-kit'
export default function ViewGraph() {
  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: ['Mon', 'Tue', 'Wed',"Thur", 'Fri', 'Sat', 'Sun'],
          datasets: [{
            data: [
            //   Math.random(),
            //   Math.random() * 100,
            //   Math.random() * 100,
            //   Math.random() * 100,
            //   Math.random() * 100,
            //   Math.random() * 100
             500,
             1000,
             1200,
             800,
             1400,
             1500,
             1300   
            ]
          }]
        }}
        width={Dimensions.get('window').width} // from react-native
        height={180}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          }
        }}
        bezier
        style={{
          borderRadius: 16,
          marginRight:25
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    justifyContent: 'space-between',
    marginTop:5
  },
});

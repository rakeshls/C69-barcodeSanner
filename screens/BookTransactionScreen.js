import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet  } from 'react-native';
import * as Permissions from 'expo-permissions' ;
import { BarCodeScanner } from 'expo-barcode-scanner';
export default class TransactionScreen extends React.Component {
  constructor(){
    super()
    this.state={
      hasCameraPermissions:null,
      scanned:false,
      scannedData:' ',
      ButtonState:'normal'
    }
  }
  getCameraPermissions = async()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermissions: status ==='granted',
      ButtonState:'clicked',
      scanned:false
    })
  }
    render() {
      const hasCameraPermissions=this.state.hasCameraPermissions
      const scanned=this.state.scanned
      const ButtonState=this.state.ButtonState
      if(ButtonState === 'clicked' && hasCameraPermissions){
        return(
          <BarCodeScanner onBarCodeScanned={scanned? undefined:this.handleBarCodeScanned} 
          style={StyleSheet.absoluteFillObject}></BarCodeScanner>
        )
      }
      else if(ButtonState ==='normal'){
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Issue or return</Text>
            <TouchableOpacity style={styles.scanButton} onPress={this.getCameraPermissions}>
              <Text style={styles.text}>{hasCameraPermissions === true? this.state.scannedData:"recquste camera permission"}</Text>
            </TouchableOpacity>
          </View>
        );
      }
      
    }
  }
  const styles=StyleSheet.create({
    scanButton:{
      backgroundColor:'yellow',
      borderRadius:20,
      margin:10,
      padding:10
    },
    text:{
      fontSize:20,
      color:'black'
    }
  })
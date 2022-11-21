import { StyleSheet, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import bouton from '../composants/boutton'


export default function DefaultScreen(props:any) {

var Bouton = bouton('Valider','Welcome',comfirmation);
function comfirmation(redirection:string){


    props.navigation.navigate(redirection); }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QG App</Text>
        {Bouton}
      <View style={styles.gameContainer}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1b1d",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 50,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  gameContainer: {
    flex: 3,
    backgroundColor: "#0000",
    flexDirection: 'row',
    justifyContent: 'center',
    width: "100%"
  }
});

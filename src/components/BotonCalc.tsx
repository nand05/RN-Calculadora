import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

interface Props{
    texto: string;
    color?: string;
    ancho?: boolean;
    accion: (accion: string) => void
}

export const BotonCalc = ({texto,color='#2d2d2d',ancho=false,accion}:Props) => {

  return (
    <TouchableOpacity
        onPress={() => accion(texto)}
    >
        <View style={{
            ...styles.boton,
            backgroundColor:color,
            width: (ancho) ? 180 : 80
        }}>
            <Text style={{
                ...styles.botonTexto,
                color: (color === '#9b9b9b') ? 'black' : 'white'
            }}>{texto}</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    boton:{
        width:80,
        height:80,
        borderRadius:100,
        // backgroundColor:'#9b9b9b',// gris claro
        // backgroundColor:'#ff9427', //naranja
        backgroundColor:'#2d2d2d', //gris oscuro
        justifyContent:'center',
        marginHorizontal:10,
    },
    botonTexto:{
        fontSize:30,
        fontWeight:'300',
        textAlign:'center',
        color:'white'
    },
});

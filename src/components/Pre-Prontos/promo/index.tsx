import {View , StyleSheet, Image  } from 'react-native'
import React from 'react'
import { colors } from '@/src/styles/colors'

interface PromoProps {
  urlImage: string;
}

const Promo: React.FC<PromoProps> = ({ urlImage }) => {
    // ESSE COMPONENTE É USADO PARA EXIBIR UM TÍTULO PERSONALIZADO

    return (
      <View style={styles.container}>
       <Image
       source={{uri: urlImage}}
         style={styles.image}
       />
      </View>
    )
  }

export default Promo;

const styles = StyleSheet.create({
    container:{
        flex: 1,

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.white,
        textAlign: 'left',

    },
    image: {
        width: 350,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.gray[600],
    }
});
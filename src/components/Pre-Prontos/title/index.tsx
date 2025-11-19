import { Text, View , StyleSheet  } from 'react-native'
import React, { Component } from 'react'
import { colors } from '@/src/styles/colors';

interface TitleProps {
  word: string;
}

const Title: React.FC<TitleProps> = ({ word }) => {
    // ESSE COMPONENTE É USADO PARA EXIBIR UM TÍTULO PERSONALIZADO

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{word}</Text>
      </View>
    )
  }

export default Title;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.white,
        textAlign: 'left',
        marginVertical: 20,

    },
});
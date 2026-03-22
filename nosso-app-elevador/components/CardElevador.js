import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CardElevador({ nome, andar, status }) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.subtitulo}>Status: {status}</Text>
      </View>
      <View style={styles.andarContainer}>
        <Text style={styles.andarTexto}>{andar}º</Text>
        <Text style={styles.andarLegenda}>Andar</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#ED145B', // Rosa FIAP
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
  },
  andarContainer: {
    alignItems: 'center',
  },
  andarTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ED145B',
  },
  andarLegenda: {
    fontSize: 10,
    textTransform: 'uppercase',
  },
});
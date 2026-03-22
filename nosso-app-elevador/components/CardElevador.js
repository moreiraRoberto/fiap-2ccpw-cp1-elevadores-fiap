import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CardElevador({ nome, andarAtual, status, ocupado, destino, progresso }) {
  const borderColorByNome = {
    'Elevador A': '#ED145B',
    'Elevador B': '#05FF00',
    'Elevador C': '#FF8A00',
    'Elevador D': '#0B81FF',
    'Elevador E': '#8E2FFF',
    'Elevador F': '#FFD500',
    'Elevador G': '#00BFA5',
    'Elevador H': '#FF267F',
  };

  return (
    <View style={[styles.card, { borderLeftColor: borderColorByNome[nome] || '#ED145B' }]}>
      <View>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.subtitulo}>Status: {status}</Text>
        {ocupado && destino && <Text style={styles.destino}>Destino: {destino}º andar</Text>}
      </View>
      <View style={styles.andarContainer}>
        <Text style={styles.andarTexto}>{andarAtual}º</Text>
        <Text style={styles.andarLegenda}>Andar Atual</Text>
        {progresso > 0 && (
          <View style={styles.progressoContainer}>
            <View style={styles.progressoBarra}>
              <LinearGradient
                colors={['#05FF00', '#ED145B']} // Verde para rosa
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressoFill, { width: `${progresso}%` }]}
              />
            </View>
          </View>
        )}
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
  destino: {
    fontSize: 12,
    color: '#ED145B',
    fontWeight: 'bold',
    marginTop: 5,
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
  progressoContainer: {
    marginTop: 5,
    width: 50,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  progressoBarra: {
    width: '100%',
    height: '100%',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressoFill: {
    height: '100%',
    borderRadius: 2,
  },
});
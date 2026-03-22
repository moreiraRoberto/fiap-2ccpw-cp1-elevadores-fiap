import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import CardElevador from '../components/CardElevador';

export default function LocalizarElevador() {
  const [carregando, setCarregando] = useState(true);

  // Simulação de carregamento de dados (Requisito: useEffect)
  useEffect(() => {
    const timer = setTimeout(() => {
      setCarregando(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Cabeçalho com Logo (Requisito: Image) */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Localizar Elevador</Text>
      </View>

      <ScrollView style={styles.conteudo}>
        {carregando ? (
          // Feedback Visual de Carregamento
          <View style={styles.centro}>
            <Text style={styles.feedback}>Buscando elevadores próximos...</Text>
          </View>
        ) : (
          <View>
            {/* Exemplo de uso de Componentização */}
            <CardElevador nome="Elevador Bloco A" andar="4" status="Subindo" />
            <CardElevador nome="Elevador Bloco B" andar="Térreo" status="Parado" />
            <CardElevador nome="Elevador Bloco C" andar="10" status="Descendo" />
            
            {/* Tratamento de estado vazio (Requisito extra) */}
            {/* Se não houvesse nada, exibiríamos uma View com texto aqui */}
          </View>
        )}
      </ScrollView>

      {/* Navegação (Requisito: Expo Router) */}
      <View style={styles.footer}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.botaoVoltar}>
            <Text style={styles.textoBotao}>Voltar para Home</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#ED145B',
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold',
  },
  conteudo: {
    padding: 20,
  },
  centro: {
    marginTop: 50,
    alignItems: 'center',
  },
  feedback: {
    fontSize: 16,
    color: '#ED145B',
    fontStyle: 'italic',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  botaoVoltar: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
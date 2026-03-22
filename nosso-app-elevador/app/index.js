import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Exemplo de uso de Image (Requisito) */}
      <View style={styles.header}>
        <Text style={styles.tituloApp}>FIAP Elevadores</Text>
      </View>

      <View style={styles.menu}>
        {/* Botão para a tela agendar */}
        <Link href="/agendar" asChild>
          <TouchableOpacity style={styles.botao}>
            <Text style={styles.textoBotao}>Agendar Elevador</Text>
          </TouchableOpacity>
        </Link>

        {/* Botão para a tela card-elevador */}
        <Link href="/localizar" asChild>
          <TouchableOpacity style={StyleSheet.flatten([styles.botao, styles.botaoRosa])}>
            <Text style={styles.textoBotao}>Localizar Elevador</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { 
    backgroundColor: '#ED145B', 
    padding: 60, 
    alignItems: 'center' 
  },
  tituloApp: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  menu: { padding: 20, gap: 15, marginTop: 20 },
  botao: { 
    backgroundColor: '#333', 
    padding: 20, 
    borderRadius: 10, 
    alignItems: 'center' 
  },
  botaoRosa: { backgroundColor: '#ED145B' },
  textoBotao: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
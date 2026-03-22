import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { Link } from 'expo-router';
import CardElevador from '../components/CardElevador';

export default function LocalizarElevador() {
  const [carregando, setCarregando] = useState(true);
  const [elevadores, setElevadores] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  // Dados iniciais dos elevadores (todos no térreo, livres)
  const inicializarElevadores = () => [
    { id: '1', nome: 'Elevador A', andarAtual: 1, status: 'Parado', ocupado: false, destino: null, progresso: 0 },
    { id: '2', nome: 'Elevador B', andarAtual: 1, status: 'Parado', ocupado: false, destino: null, progresso: 0 },
    { id: '3', nome: 'Elevador C', andarAtual: 1, status: 'Parado', ocupado: false, destino: null, progresso: 0 },
    { id: '4', nome: 'Elevador D', andarAtual: 1, status: 'Parado', ocupado: false, destino: null, progresso: 0 },
    { id: '5', nome: 'Elevador E', andarAtual: 1, status: 'Parado', ocupado: false, destino: null, progresso: 0 },
    { id: '6', nome: 'Elevador F', andarAtual: 1, status: 'Parado', ocupado: false, destino: null, progresso: 0 },
    { id: '7', nome: 'Elevador G', andarAtual: 1, status: 'Parado', ocupado: false, destino: null, progresso: 0 },
    { id: '8', nome: 'Elevador H', andarAtual: 1, status: 'Parado', ocupado: false, destino: null, progresso: 0 },
  ];

  // Simulação de carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setElevadores(inicializarElevadores());
      setCarregando(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Gerar pedidos aleatórios a cada 5-10 segundos, evitando andares onde há elevadores livres
  useEffect(() => {
    if (!carregando) {
      const gerarPedido = () => {
        const numPedidos = Math.floor(Math.random() * 4) + 2; // 2 a 5 pedidos
        const novosPedidos = [];

        for (let i = 0; i < numPedidos; i++) {
          let andar;
          do {
            andar = Math.floor(Math.random() * 10) + 1; // 1 a 10
          } while (elevadores.some(e => !e.ocupado && e.andarAtual === andar));
          novosPedidos.push(andar);
        }

        setPedidos(prev => [...prev, ...novosPedidos]);
      };

      const interval = setInterval(gerarPedido, Math.random() * 3000 + 2000); // 2-5s para fluxo mais contínuo
      return () => clearInterval(interval);
    }
  }, [carregando, elevadores]);

  // Lógica de despacho de elevadores
  useEffect(() => {
    if (!carregando && pedidos.length > 0) {
      // Trabalha com uma fila de pedidos e remove somente os atendidos.
      let pedidosRestantes = [...pedidos];

      setElevadores(prevElevadores => {
        const novosElevadores = [...prevElevadores];

        // Fila de despacho: escolher entre 2 e 5 pedidos por ciclo, limitado ao tamanho da fila
        const numDespachar = Math.min(Math.floor(Math.random() * 4) + 2, pedidosRestantes.length);

        for (let i = 0; i < numDespachar; i++) {
          const destino = pedidosRestantes.shift();

          // Encontrar elevadores livres (mesmo com outros em jornada em paralelo)
          const livres = novosElevadores.filter(e => !e.ocupado);

          if (livres.length === 0) {
            // Sem elevador livre no momento, mantém o pedido na fila
            pedidosRestantes.unshift(destino);
            break;
          }

          let candidatos = livres.filter(e => e.andarAtual !== destino);
          if (candidatos.length === 0) {
            candidatos = livres;
          }

          const distancias = candidatos.map(elevador => ({
            elevador,
            distancia: Math.abs(destino - elevador.andarAtual),
          }));

          const menorDistancia = Math.min(...distancias.map(item => item.distancia));
          const melhores = distancias
            .filter(item => item.distancia === menorDistancia)
            .map(item => item.elevador);

          const melhor = melhores[Math.floor(Math.random() * melhores.length)];

          if (!melhor) {
            pedidosRestantes.unshift(destino);
            continue;
          }

          const distancia = Math.abs(destino - melhor.andarAtual);
          const tempoParada = 5000;

          melhor.ocupado = true;
          melhor.destino = destino;
          melhor.status = destino > melhor.andarAtual ? 'Subindo' : destino < melhor.andarAtual ? 'Descendo' : 'Parado';

          if (distancia === 0) {
            setTimeout(() => {
              setElevadores(prev =>
                prev.map(e =>
                  e.id === melhor.id
                    ? { ...e, ocupado: false, destino: null, status: 'Parado' }
                    : e
                )
              );
            }, tempoParada);
          } else {
            const step = destino > melhor.andarAtual ? 1 : -1;

            const moverUmAndar = (andarAtual) => {
              const proximoAndar = andarAtual + step;
              let progressoInterval;
              let progresso = 0;

              progressoInterval = setInterval(() => {
                progresso += 5;
                setElevadores(prev =>
                  prev.map(e =>
                    e.id === melhor.id
                      ? { ...e, progresso }
                      : e
                  )
                );
                if (progresso >= 100) {
                  clearInterval(progressoInterval);
                }
              }, 100);

              setTimeout(() => {
                clearInterval(progressoInterval);
                setElevadores(prev =>
                  prev.map(e =>
                    e.id === melhor.id
                      ? { ...e, andarAtual: proximoAndar, status: step > 0 ? 'Subindo' : 'Descendo', progresso: 0 }
                      : e
                  )
                );

                if (proximoAndar !== destino) {
                  setTimeout(() => moverUmAndar(proximoAndar), 0);
                } else {
                  setElevadores(prev =>
                    prev.map(e =>
                      e.id === melhor.id
                        ? { ...e, status: 'Cheguei!', progresso: 0 }
                        : e
                    )
                  );

                  setTimeout(() => {
                    setElevadores(prev =>
                      prev.map(e =>
                        e.id === melhor.id
                          ? { ...e, ocupado: false, destino: null, status: 'Parado', progresso: 0 }
                          : e
                      )
                    );
                  }, tempoParada);
                }
              }, 2000);
            };

            setTimeout(() => moverUmAndar(melhor.andarAtual), 0);
          }
        }

        return novosElevadores;
      });

      setPedidos(pedidosRestantes);
    }
  }, [carregando, pedidos]);

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
          <FlatList
            data={elevadores}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <CardElevador nome={item.nome} andarAtual={item.andarAtual} status={item.status} ocupado={item.ocupado} destino={item.destino} progresso={item.progresso} />
            )}
            ListEmptyComponent={<Text>Nenhum elevador operando agora.</Text>}
          />
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
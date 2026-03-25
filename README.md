# 🚀 FIAP Elevadores - Simulador de Sistema de Elevadores

[![React Native](https://img.shields.io/badge/React%20Native-0.83.2-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~55.0.8-black.svg)](https://expo.dev/)
[![Expo Router](https://img.shields.io/badge/Expo%20Router-~55.0.7-orange.svg)](https://docs.expo.dev/router/introduction/)

> **Projeto acadêmico** - Simulador avançado de sistema de elevadores desenvolvido para a disciplina de CPAD (FIAP)

## 📋 Sobre o Projeto

Esta aplicação React Native/Expo simula um sistema inteligente de elevadores com 8 unidades, implementando algoritmos de dispatch otimizados, interface visual rica e processamento paralelo de chamadas. O projeto demonstra conceitos avançados de gerenciamento de estado, animações e lógica de negócio em aplicações móveis.

**Baseado na cópia de:** [fiap-2ccpw-cp1-elevadores-fiap](https://github.com/robertomoreira/fiap-2ccpw-cp1-elevadores-fiap) 

## ✨ Funcionalidades Principais

### 🏢 Simulação de Elevadores
- **8 elevadores independentes** (A-H) com estados dinâmicos
- **Movimento realista**: 2 segundos por andar com animação de progresso
- **Dispatch inteligente**: Algoritmo que prioriza elevador mais próximo ao destino
- **Chamadas simultâneas**: Sistema processa 2-5 elevadores ao mesmo tempo
- **Processamento paralelo**: Não bloqueia novas chamadas enquanto elevadores estão em movimento
- **Desempate randômico**: Seleção aleatória entre elevadores com mesma proximidade
- **Estados visuais completos**:
  - 🟢 **Parado**: Elevador disponível
  - 🔄 **Subindo/Descendo**: Em movimento
  - 🔒 **Ocupado**: Atendendo chamada
  - 🎯 **Cheguei!**: Feedback de chegada ao destino

### 🎨 Interface Visual
- **Cores distintas por elevador**: Cada unidade A-H possui borda lateral colorida única
- **Barra de progresso animada**: Gradiente rosa-verde durante transições
- **Feedback visual rico**: Estados, destinos e progresso em tempo real
- **Design responsivo**: Adaptado para dispositivos móveis

### ⚡ Sistema de Pedidos
- **Geração automática**: 2-5 pedidos por ciclo (intervalo de 2-5 segundos)
- **Fila inteligente**: Evita chamadas redundantes para andares já atendidos
- **Processamento contínuo**: Novos pedidos atendidos imediatamente quando elevadores ficam disponíveis

## 🛠️ Tecnologias Utilizadas

- **React Native 0.83.2** - Framework principal
- **Expo ~55.0.8** - Plataforma de desenvolvimento
- **Expo Router ~55.0.7** - Navegação baseada em arquivos
- **React 19.2.0** - Biblioteca de componentes
- **expo-linear-gradient** - Gradientes visuais

## 📁 Estrutura do Projeto

```
nosso-app-elevador/
├── app/
│   ├── _layout.js          # Layout principal com navegação
│   ├── index.js            # Tela inicial (Home)
│   ├── agendar.js          # Tela de agendamento
│   └── localizar.js        # Simulação de elevadores
├── components/
│   └── CardElevador.js     # Componente de cartão do elevador
├── assets/                 # Recursos estáticos
└── package.json            # Dependências e scripts
```

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js instalado
- Expo CLI: `npm install -g @expo/cli`
- Dispositivo físico ou emulador/simulador

### Passos para execução

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Gui-Ferraz-Medeiros/copia-fiap-2ccpw-cp1-elevadores-fiap.git
   cd copia-fiap-2ccpw-cp1-elevadores-fiap/nosso-app-elevador
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute a aplicação**
   ```bash
   npx expo start -c
   ```

4. **Acesse no dispositivo**
   - Escaneie o QR code com o app Expo Go
   - Ou execute em emulador/simulador

## 🎮 Como Usar

1. **Tela Inicial**: Navegue entre "Agendar Elevador" e "Localizar Elevador"
2. **Localizar Elevador**: Observe a simulação automática
   - Pedidos são gerados automaticamente a cada 2-5 segundos
   - 2-5 elevadores são despachados simultaneamente
   - Acompanhe o progresso visual e estados em tempo real
   - Cada elevador tem cor distinta para fácil identificação

## 🔧 Arquitetura e Algoritmos

### Algoritmo de Dispatch
```javascript
// 1. Filtrar elevadores livres
const livres = elevadores.filter(e => !e.ocupado);

// 2. Calcular distâncias para o destino
const distancias = livres.map(e => ({
  elevador: e,
  distancia: Math.abs(destino - e.andarAtual)
}));

// 3. Selecionar menor distância
const menorDistancia = Math.min(...distancias.map(d => d.distancia));

// 4. Desempate randômico entre candidatos
const melhores = distancias.filter(d => d.distancia === menorDistancia);
const escolhido = melhores[Math.floor(Math.random() * melhores.length)];
```

### Estados do Elevador
- **Parado**: Disponível para novas chamadas
- **Subindo/Descendo**: Em movimento (com barra de progresso)
- **Ocupado**: Atendendo chamada (destino definido)
- **Cheguei!**: Feedback temporário de chegada

### ✅ Atualizações Implementadas (22:03)
- [x] Estrutura Expo Router (pastas `app/`, `_layout.js`)
- [x] Tela Home `app/index.js` com navegação `Link`
- [x] Tela `app/localizar.js` com simulação `useEffect`
- [x] Componente `components/CardElevador.js`
- [x] Correções de import/case e configuração `package.json`
- [x] Fix: `Link asChild` e flatten styles

### 🚀 Funcionalidades Avançadas Adicionadas
- [x] Barra de progresso com gradiente rosa-verde
- [x] Cores distintas para elevadores A-H
- [x] Feedback "Cheguei!" ao chegar no destino
- [x] Processamento paralelo (não espera conclusão)
- [x] Desempate randômico para seleção de elevadores
- [x] Geração de 2-5 pedidos por ciclo
- [x] Chamadas simultâneas de 2-5 elevadores





<img width="615" height="900" alt="image" src="https://github.com/user-attachments/assets/7a0ebfb4-2da5-4386-b8c8-d12a671e1748" />


## 👨‍💻 Autores

**Guilherme Ferraz Medeiros** - Desenvolvimento e implementação

---

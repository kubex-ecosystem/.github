'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MiniGamesPage() {
  useEffect(() => {
    // Carrega os scripts dos jogos dinamicamente
    const loadGameScripts = () => {
      const scripts = [
        '/tools/mini_games/assets/js/pong.js',
        '/tools/mini_games/assets/js/snake.js', 
        '/tools/mini_games/assets/js/tictactoe.js',
        '/tools/mini_games/assets/js/main.js'
      ];

      scripts.forEach((src) => {
        const script = document.createElement('script');
        script.src = src;
        script.defer = true;
        document.head.appendChild(script);
      });
    };

    // Carrega o CSS dos jogos
    const loadGameStyles = () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/tools/mini_games/assets/css/style.css';
      document.head.appendChild(link);
    };

    loadGameStyles();
    loadGameScripts();

    return () => {
      // Cleanup: remove scripts and styles when component unmounts
      const scripts = document.querySelectorAll('script[src*="mini_games"]');
      const styles = document.querySelectorAll('link[href*="mini_games"]');
      
      scripts.forEach(script => script.remove());
      styles.forEach(style => style.remove());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-8"
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🎮 Mini Games Canvas
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Uma coleção de jogos clássicos criados com HTML5 Canvas e JavaScript puro. 
            Desenvolvidos para relaxar e exercitar lógicas de programação divertidas.
          </p>
        </motion.div>

        {/* Game Container */}
        <motion.div
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-gray-700"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Game Controls */}
          <div className="game-controls btns mb-6 flex flex-wrap justify-center gap-4">
            <button 
              data-game="pong" 
              className="game-btn px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              🏓 Pong
            </button>
            <button 
              data-game="snake" 
              className="game-btn px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
            >
              🐍 Snake
            </button>
            <button 
              data-game="tictactoe" 
              className="game-btn px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
            >
              ❌ Tic-Tac-Toe
            </button>
          </div>

          {/* Main Game Layout */}
          <div className="main-layout flex flex-col lg:flex-row gap-6">
            {/* Game Canvas Container */}
            <div className="game-container flex-1 bg-black/30 rounded-lg p-4 min-h-[400px] flex items-center justify-center">
              <canvas 
                id="placeholder" 
                className="game-canvas placeholder active border-2 border-gray-600 rounded-lg"
                width="800" 
                height="400"
              ></canvas>
              <canvas 
                id="pong" 
                className="game-canvas hidden border-2 border-gray-600 rounded-lg"
                width="800" 
                height="400"
              ></canvas>
              <canvas 
                id="snake" 
                className="game-canvas hidden border-2 border-gray-600 rounded-lg"
                width="800" 
                height="400"
              ></canvas>
              <canvas 
                id="tictactoe" 
                className="game-canvas hidden border-2 border-gray-600 rounded-lg"
                width="800" 
                height="400"
              ></canvas>
            </div>

            {/* Sidebar */}
            <aside className="sidebar lg:w-80 bg-gray-900/50 rounded-lg p-6">
              <div className="game-controls space-y-4">
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-4 rounded-lg">
                  <div id="record" className="text-yellow-400 font-bold text-lg">High Score: 0</div>
                  <div id="score" className="text-green-400 font-bold text-lg">Score: 0</div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="pong-difficulty" className="block text-gray-300 font-medium">
                    Dificuldade:
                  </label>
                  <select 
                    id="pong-difficulty"
                    className="w-full p-2 bg-gray-700 text-white rounded-lg border border-gray-600"
                  >
                    <option value="easy">Fácil</option>
                    <option value="medium">Médio</option>
                    <option value="hard">Difícil</option>
                  </select>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button 
                    id="restart"
                    className="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors"
                  >
                    🔄 Restart
                  </button>
                  <button 
                    id="stop"
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                  >
                    ⏹️ Stop
                  </button>
                  <button 
                    id="start"
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    ▶️ Start
                  </button>
                </div>
              </div>

              <div className="game-info mt-6 space-y-2 text-gray-300">
                <h3 className="text-lg font-semibold text-white mb-3">📖 Controles</h3>
                <p className="text-sm">🎮 Use as setas do teclado para jogar</p>
                <p className="text-sm">⌨️ Pressione "R" para reiniciar</p>
                <p className="text-sm">⏸️ Pressione "S" para parar</p>
                <p className="text-sm">⏯️ Pressione "Enter" para iniciar</p>
              </div>
            </aside>
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="bg-blue-900/30 backdrop-blur-sm p-6 rounded-xl border border-blue-700/50">
            <h3 className="text-xl font-bold text-blue-400 mb-2">🏓 Pong</h3>
            <p className="text-gray-300 text-sm">
              O clássico jogo de tênis de mesa em 2D. Use as setas para mover sua raquete e rebater a bola!
            </p>
          </div>
          
          <div className="bg-green-900/30 backdrop-blur-sm p-6 rounded-xl border border-green-700/50">
            <h3 className="text-xl font-bold text-green-400 mb-2">🐍 Snake</h3>
            <p className="text-gray-300 text-sm">
              Controle a cobra e colete frutas para crescer. Cuidado para não bater nas paredes ou em si mesma!
            </p>
          </div>
          
          <div className="bg-orange-900/30 backdrop-blur-sm p-6 rounded-xl border border-orange-700/50">
            <h3 className="text-xl font-bold text-orange-400 mb-2">❌ Tic-Tac-Toe</h3>
            <p className="text-gray-300 text-sm">
              O jogo da velha clássico! Forme uma linha de três símbolos iguais para vencer.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

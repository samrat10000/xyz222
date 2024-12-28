

"use client";

import { useGlobalContext } from "@/context/globalContext";
import Header from "@/components/Header";
import { typeColor } from "@/utils/colors";
import { volumeHigh } from "@/utils/Icons";
import { Ruler, Weight, Sparkles, Swords } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";


// Define the type for the props
interface PokemonPageProps {
  params: {
    id: string; // Assuming 'id' is a string (you can change it based on your needs)
  };
}





function PokemonPage({ params: { id }  }:PokemonPageProps) {
  const { fetchPokemonByName, loading, activePokemon } = useGlobalContext();
  const [isShiny, setIsShiny] = useState(false);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    fetchPokemonByName(id);
    setShowStats(false);
    setTimeout(() => setShowStats(true), 500);
  }, [id]);

  const mainType = activePokemon?.types[0]?.type.name;
  const bgColor = typeColor[mainType];
  
  const playCry = (type:string) => {
    const audio = new Audio(activePokemon?.cries[type]);
    audio.play();
    const element = document.querySelector('.pokemon-image');
    element?.classList.add('shake-animation');
    setTimeout(() => element?.classList.remove('shake-animation'), 500);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Header />
        <div className="h-[80vh] flex flex-col gap-4 justify-center items-center">
          <div className="pokeball-loader"></div>
          <p className="text-red-400 text-xl animate-pulse font-pokemon">Searching for Pokemon...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 transition-all duration-700">
      <Header />
      <section
        className="px-6 md:px-16 py-8 min-h-[90vh] grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(17, 24, 39, 0.98) 100%)`,
        }}
      >
        {/* Neon Glow Effect */}
        <div className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${bgColor}44 0%, transparent 60%)`
          }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="floating-particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.05,
                background: bgColor
              }}
            />
          ))}
        </div>

        <div className="flex flex-col justify-center gap-6 z-10">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-3">
              <button
                className="neo-button"
                onClick={() => playCry('legacy')}
              >
                {volumeHigh} Classic Cry
              </button>
              <button
                className="neo-button"
                onClick={() => playCry('latest')}
              >
                {volumeHigh} Modern Cry
              </button>
              <button
                className="neo-button"
                onClick={() => setIsShiny(!isShiny)}
              >
                <Sparkles size={18} />
                {isShiny ? 'Normal' : 'Shiny'}
              </button>
            </div>

            <div className="pokemon-name-container relative">
              <h1 className="text-5xl md:text-7xl font-bold capitalize text-white tracking-wider font-pokemon">
                {activePokemon?.name}
              </h1>
              <div className="pokemon-number text-3xl text-[${bgColor}] font-bold opacity-50">
                #{String(activePokemon?.id).padStart(3, '0')}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="stat-container">
              <h2 className="text-2xl font-bold text-white/90 flex items-center gap-2">
                <Swords size={24} className="text-red-400" /> Abilities
              </h2>
              <ul className="flex flex-wrap gap-2">
                {activePokemon?.abilities.map((ability: { ability: { name: string }; is_hidden: boolean; }, index: number) => (
                  <li
                    key={index}
                    className="neo-badge"
                  >
                    {ability.ability.name}
                    {ability.is_hidden && 
                      <span className="ml-2 text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">
                        Hidden
                      </span>
                    }
                  </li>
                ))}
              </ul>
            </div>

            <div className="stat-container">
              <h2 className="text-2xl font-bold text-white/90">Types</h2>
              <ul className="flex flex-wrap gap-2">
                {activePokemon?.types.map((type: { type: { name: string } }, index: number) => (
                  <li
                    key={index}
                    className="type-badge"
                    style={{ 
                      background: `linear-gradient(135deg, ${typeColor[type.type.name]}66 0%, ${typeColor[type.type.name]}33 100%)`,
                      border: `2px solid ${typeColor[type.type.name]}66`
                    }}
                  >
                    {type.type.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="stat-container">
              <h2 className="text-2xl font-bold text-white/90">Base Stats</h2>
              <ul className="flex flex-col gap-4">
                {activePokemon?.stats.map((stat: { stat: { name: string }; base_stat: number },index: number) => (
                  <li 
                    key={index} 
                    className="stat-item"
                    style={{
                      transform: showStats ? 'translateX(0)' : 'translateX(-50px)',
                      opacity: showStats ? 1 : 0,
                      transition: `all 0.5s ease ${index * 0.1}s`
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="capitalize text-white/90">{stat.stat.name}</span>
                      <span className="font-bold text-white">{stat.base_stat}</span>
                    </div>
                    <div className="stat-bar-bg">
                      <div
                        className="stat-bar-fill"
                        style={{
                          width: showStats ? `${(stat.base_stat / 200) * 100}%` : '0%',
                          background: `linear-gradient(90deg, ${bgColor} 0%, ${bgColor}66 100%)`
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: <Ruler size={18} />, label: "Height", value: `${activePokemon?.height/10} m` },
                { icon: <Weight size={18} />, label: "Weight", value: `${activePokemon?.weight/10} kg` },
                { icon: <Sparkles size={18} />, label: "Base Exp", value: `${activePokemon?.base_experience} xp` }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="neo-stat-card"
                >
                  <span className="text-sm flex items-center gap-2 text-red-400">
                    {stat.icon}
                    {stat.label}
                  </span>
                  <span className="text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex justify-center items-center pokemon-display">
          <Image
            src={`/icons/${mainType}.svg`}
            alt="pokemon type"
            width={700}
            height={700}
            className="absolute opacity-10 type-background animate-spin-slow"
          />

          <div className="pokemon-image-container">
            <Image
              src={
                isShiny
                  ? activePokemon?.sprites?.other?.home?.front_shiny
                  : activePokemon?.sprites?.other?.home?.front_default ||
                    activePokemon?.sprites?.other?.showdown?.front_default ||
                    activePokemon?.sprites?.front_default
              }
              alt={`${activePokemon?.name} image`}
              width={500}
              height={500}
              className="pokemon-image relative z-10 transition-all duration-500
              hover:scale-110 transform cursor-pointer"
              priority
            />
          </div>
        </div>
      </section>

      <style jsx global>{`
      
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        .font-pokemon {
          font-family: 'Press Start 2P', cursive;
        }

        .neo-button {
          @apply px-4 py-2 flex items-center gap-2 text-sm font-bold rounded-xl
          transition-all duration-300 transform hover:scale-105
          bg-gray-800 text-red-400 border border-gray-700
          hover:bg-gray-700 hover:border-red-400/50
          shadow-lg hover:shadow-red-400/20;
        }

        .neo-badge {
          @apply px-4 py-2 flex items-center gap-2 text-sm font-bold rounded-xl
          bg-gray-800 text-white border border-gray-700
          hover:border-red-400/50 transition-all duration-300
          shadow-lg hover:shadow-red-400/20;
        }

        .type-badge {
          @apply px-4 py-2 flex items-center gap-2 text-sm font-bold rounded-xl
          text-white transition-all duration-300 hover:scale-105
          shadow-lg backdrop-blur-sm;
        }

        .stat-container {
          @apply p-4 rounded-2xl bg-gray-800/50 border border-gray-700
          backdrop-blur-sm;
        }

        .stat-bar-bg {
          @apply w-full h-2 bg-gray-700 rounded-full overflow-hidden
          shadow-inner;
        }

        .stat-bar-fill {
          @apply h-full rounded-full transition-all duration-1000 ease-out
          shadow-lg;
        }

        .neo-stat-card {
          @apply p-4 flex flex-col items-center justify-center gap-2
          bg-gray-800 border border-gray-700 rounded-2xl
          hover:border-red-400/50 transition-all duration-300
          shadow-lg hover:shadow-red-400/20;
        }

        .pokemon-image-container {
          @apply relative flex justify-center items-center
          p-8 rounded-full;
          background: radial-gradient(circle at center, ${bgColor}22 0%, transparent 70%);
        }

        .pokeball-loader {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(to bottom, #ef4444 50%, #374151 50%);
          position: relative;
          animation: spin 1s linear infinite;
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
        }

        .pokeball-loader::before {
          content: '';
          position: absolute;
          height: 8px;
          width: 100%;
          background: #1f2937;
          top: 50%;
          transform: translateY(-50%);
        }

        .pokeball-loader::after {
          content: '';
          position: absolute;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #374151;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 4px solid #1f2937;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
        }

        .floating-particle {
          position: absolute;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          filter: blur(3px);
          animation: float 10s infinite linear;
        }

        .pokemon-image.shake-animation {
          animation: shake 0.5s ease-in-out;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.05; }
          90% { opacity: 0.05; }
          100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-10px) rotate(-5deg); }
          75% { transform: translateX(10px) rotate(5deg); }
        }

        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </main>
  );
}

export default PokemonPage;
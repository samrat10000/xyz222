"use client";
import React, { useState } from 'react';
import { useGlobalContext } from "@/context/globalContext";
import { typeColor } from "@/utils/colors";
import {
  arrowAngleRight,
  bookmarkEmpty,
  bookmarkFilled,
  heartEmpty,
  heartFilled,
} from "@/utils/Icons";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PokemonCardProps {
  pokemon: any;
}

function PokemonCard({ pokemon }: PokemonCardProps) {
  const { user } = useUser();
  const { performAction, userDetails } = useGlobalContext();
  const router = useRouter();
  const mainType = pokemon?.types?.[0]?.type?.name || 'normal';
  const mainColor = typeColor[mainType];

  const [liked, setLiked] = useState(userDetails?.liked?.includes(pokemon?.name));
  const [bookmarked, setBookmarked] = useState(userDetails?.bookmarks?.includes(pokemon?.name));

  const handleAction = (action: 'like' | 'bookmark') => {
    if (!user?.sub) {
      router.push("/api/auth/login");
      return;
    }
    
    if (action === 'like') {
      setLiked((prev: boolean) => !prev);
      performAction(user.sub, pokemon?.name, "like");
    } else {
      setBookmarked((prev: boolean) => !prev);
      performAction(user.sub, pokemon?.name, "bookmark");
    }
    
  };

  return (
    <div className="relative rounded-3xl overflow-hidden bg-white">
      {/* Background Shape */}
      <div 
        className="absolute top-0 right-0 w-3/4 h-full rounded-l-full opacity-10"
        style={{ backgroundColor: mainColor }}
      />
      
      {/* Main Content */}
      <div className="relative p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-3">
            <button
              onClick={() => handleAction('like')}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition
                ${liked ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-400'}
                hover:shadow-lg`}
            >
              <span className="text-2xl">{liked ? heartFilled : heartEmpty}</span>
            </button>
            <button
              onClick={() => handleAction('bookmark')}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition
                ${bookmarked ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'}
                hover:shadow-lg`}
            >
              <span className="text-2xl">{bookmarked ? bookmarkFilled : bookmarkEmpty}</span>
            </button>
          </div>

          <button
            onClick={() => router.push(`/pokemon/${pokemon?.name}`)}
            className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-900 text-white hover:shadow-lg"
          >
            <span className="text-2xl">{arrowAngleRight}</span>
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="relative">
            <div 
              className="absolute inset-0 rounded-2xl opacity-20"
              style={{ backgroundColor: mainColor }}
            />
            <Image
              src={pokemon?.sprites?.other?.home?.front_default || pokemon?.sprites?.front_default}
              alt={pokemon?.name}
              width={200}
              height={200}
              className="relative z-10 object-contain w-full h-full"
            />
          </div>

          {/* Info Section */}
          <div className="flex flex-col justify-center gap-4">
            {/* Pokemon Name */}
            <h2 className="text-3xl font-black capitalize mb-2" style={{ color: mainColor }}>
              {pokemon?.name}
            </h2>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-xl p-1">
              <div className="text-center">
                <p className="text-xs font-bold text-gray-500">HEIGHT</p>
                <p className="text-sm font-bold text-gray-800">{pokemon?.height}m</p>
              </div>
              <div className="text-center border-gray-200">
                <p className="text-xs font-bold text-gray-500">WEIGHT</p>
                <p className="text-sm font-bold text-gray-800">{pokemon?.weight}kg</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-gray-500">XP</p>
                <p className="text-sm font-bold text-gray-800">{pokemon?.base_experience}</p>
              </div>
            </div>

            {/* Types */}
            <div className="flex gap-1">
              {pokemon?.types?.map((type: any, index: number) => (
                <div
                  key={index}
                  className="relative group flex-1"
                >
                  <div 
                    className="px-4 py-3 rounded-xl text-white text-center font-bold uppercase tracking-wider"
                    style={{ backgroundColor: typeColor[type?.type?.name] }}
                  >
                    {type.type.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Border Accent */}
      <div 
        className="absolute bottom-0 left-0 w-full h-1"
        style={{ backgroundColor: mainColor }}
      />
    </div>
  );
}

export default PokemonCard; 


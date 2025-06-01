'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { News } from '../../models/news';

// Récupération des news depuis l'API
const NewsSection = () => {
  const [newsList, setNewsList] = useState<News[]>([]);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then(setNewsList);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-gray-700 text-center mb-12">
        Nos actualités
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {newsList.length === 0 ? (
          <div className="col-span-full text-center text-slate-400 py-12">
            Aucune actualité pour le moment.
          </div>
        ) : (
          newsList.map((news, idx) => (
            <NewsCard
              key={news.id}
              title={news.titre}
              excerpt={news.description}
              time={news.createdAt ? new Date(news.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
              date={news.createdAt ? new Date(news.createdAt).toLocaleDateString() : ""}
              gradient="from-blue-600"
              image={news.imageCover}
            />
          ))
        )}
      </div>
    </section>
  );
};

const NewsCard = ({ title, excerpt, time, date, gradient, image }) => {
  // Sécurité : fallback si image vide ou non string
  let safeImage = typeof image === "string" && image.trim() !== "" ? image : "/images/news/default.jpg";
  return (
    <article className="relative group overflow-hidden rounded-3xl aspect-square">
      {/* Image background */}
      <div className="absolute inset-0">
        {safeImage ? (
          <Image 
            src={safeImage}
            alt={title}
            fill
            className="w-full h-full object-cover"
            unoptimized={safeImage.startsWith("http")}
            sizes="100vw"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-l ${gradient} to-transparent`} />
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 text-white">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-xs line-clamp-3">{excerpt}</p>
        </div>

        <div className="flex justify-between items-center text-xs mb-6">
          <div className="flex items-center gap-2">
            <TimeIcon />
            {time}
          </div>
          <div className="flex items-center gap-2">
            <DateIcon />
            {date}
          </div>
        </div>

        <Button />
      </div>
    </article>
  );
};

const Button = () => (
  <button className="w-full bg-white text-stone-900 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
    Savoir plus
    <ArrowIcon />
  </button>
);

// SVG Icons
const TimeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 4V8L11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const DateIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 6H14" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
    <path
      d="M6 4L10 8L6 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default NewsSection;
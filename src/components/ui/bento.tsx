"use client";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

export function BentoCard({
  dark = true,
  className = "",
  eyebrow,
  title,
  description,
  graphic,
  fade = [],
  href,
}: {
  dark?: boolean;
  className?: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  graphic?: React.ReactNode;
  fade?: ("top" | "bottom")[];
  href: string;
}) {
  return (
    <Link to={href} className="block h-full group">
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{
        idle: { scale: 1 },
        active: { scale: 0.98, transition: { duration: 0.2 } }
      }}
      data-dark={dark ? "true" : undefined}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-2xl cursor-pointer transition-all",
        "bg-gray-950 transform-gpu border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
        "data-[dark]:bg-gray-900/50"
      )}
    >
      <div className="relative h-[18rem] md:h-[22rem] shrink-0 overflow-hidden bg-gray-900">
        <motion.div 
          className="w-full h-full"
          variants={{
            idle: { scale: 1 },
            active: { scale: 1.05, transition: { duration: 0.4 } }
          }}
        >
          {graphic}
        </motion.div>
        {fade.includes("top") && (
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-transparent opacity-60" />
        )}
        {fade.includes("bottom") && (
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent" />
        )}
      </div>
      <div className="relative p-8 z-20 isolate mt-[-100px] h-[12rem] flex flex-col justify-end bg-gradient-to-t from-gray-950 via-gray-950/90 to-transparent text-white">
        <span className="text-xs font-bold tracking-wider text-purple-400 uppercase mb-2">{eyebrow}</span>
        <p className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors">
          {title}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
          {description}
        </p>
      </div>
    </motion.div>
    </Link>
  );
}

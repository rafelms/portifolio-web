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
        "bg-background transform-gpu border border-muted/15 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:border-primary/50 hover:shadow-[0_0_30px_rgba(31,111,235,0.15)]",
        "data-[dark]:bg-surface/50"
      )}
    >
      <div className="relative h-[18rem] md:h-[22rem] shrink-0 overflow-hidden bg-surface">
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
          <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent opacity-60" />
        )}
        {fade.includes("bottom") && (
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        )}
      </div>
      <div className="relative p-8 z-20 isolate mt-[-100px] h-[12rem] flex flex-col justify-end bg-gradient-to-t from-background via-background/90 to-transparent text-text">
        <span className="text-xs font-bold tracking-wider text-primary-light uppercase mb-2">{eyebrow}</span>
        <p className="text-xl md:text-2xl font-bold tracking-tight text-text group-hover:text-text transition-colors">
          {title}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-muted group-hover:text-text transition-colors">
          {description}
        </p>
      </div>
    </motion.div>
    </Link>
  );
}

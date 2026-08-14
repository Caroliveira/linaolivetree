"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { MoveLeft } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 pt-16 pb-16 md:py-20 relative overflow-hidden bg-cream">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center relative z-10">
        <div className="md:col-span-6 flex flex-col space-y-6 md:space-y-10 text-center md:text-left relative order-2 md:order-1">

          <div className="space-y-3">
            <span className="text-terracotta font-serif italic text-lg md:text-xl">Caminho Perdido</span>
            <h1 className="text-2xl md:text-3xl font-serif text-olive leading-tight">
              Parece que esta trilha levou a um canteiro que ainda não plantamos.
            </h1>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col gap-2 justify-center md:justify-start pt-2"
          >
            <Button
              href="/"
              variant="primary"
              className="group mx-auto md:mx-0 w-fit"
            >
              <MoveLeft className="w-5 h-5 mr-3 transition-transform group-hover:-translate-x-1" />
              Voltar ao Jardim
            </Button>
          </motion.div>

          {/* Handwritten footer note */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="pt-1 md:pt-2"
          >
            <p className="font-hand text-lg md:text-xl text-terracotta -rotate-3 md:-rotate-10 text-center md:text-right">
              Vamos encontrar o caminho de volta.
            </p>
          </motion.div>
        </div>

        <div className="md:col-span-6 flex flex-col items-center justify-center md:items-start mt-6 md:mt-0 order-1 md:order-2">
          <div className="w-full max-w-md aspect-square relative">
            <Image
              src="/images/not-found-path.png"
              alt="Um caminho sinuoso no jardim"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}

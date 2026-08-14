"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { MoveLeft, BookOpen } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden bg-cream">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-10 items-center relative z-10">
        <div className="md:col-span-6 flex flex-col space-y-10 text-center md:text-left relative">

          <div className="space-y-2">
            <span className="text-terracotta font-serif italic text-xl">Misplaced Moment</span>
            <h1 className="text-2xl md:text-3xl font-serif text-olive leading-tight">
              It seems this story led somewhere we haven't written yet.
            </h1>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col gap-2 justify-center md:justify-start pt-4"
          >
            <Button
              href="/library"
              variant="primary"
              className="group"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Visit the Library
            </Button>

            <Button
              href="/"
              variant="ghost"
              className="group"
            >
              <MoveLeft className="w-5 h-5 mr-3 transition-transform group-hover:-translate-x-1" />
              Return Home
            </Button>
          </motion.div>

          {/* Handwritten footer note */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="pt-2"
          >
            <p className="font-hand text-xl text-terracotta -rotate-10 text-right">
              Let's find our way back.
            </p>
          </motion.div>
        </div>

        <div className="md:col-span-6 flex flex-col items-center md:items-start">
          <Image
            src="/images/not-found-path.png"
            alt="A winding path in a misty forest"
            width={1000}
            height={1000}
            className="object-cover"
            priority
          />
        </div>
      </div>
    </main>
  );
}

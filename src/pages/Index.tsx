import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// GIFs de gatitos con diferentes emociones
const catGifs = {
  cute: "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif",
  annoyed: "https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif", 
  angry: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDlwdWl3bDg5a3NtczR2MjhsMG91dml3cWp3MnY0bXBhMWltZ2MyaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wr7oA0rSjnWuiLJOY5/giphy.gif",
  furious: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDFlbW8zcHlvanlwdmF5ZGR4OWdzYTBhZnUzeGRhZ3Y2MjNvMnZ1biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/haCYYKWRVeilcEL65X/giphy.gif",
  happy: "https://media.giphy.com/media/ule4vhcY1xEKQ/giphy.gif",
};

// Preguntas progresivas
const questions = [
  "¿Quieres ser mi San Valentín? 💕",
  "¿Estás segura? 🥺",
  "¿Estás completamente segura? 😿",
  "¿Muy muy segura? 😾",
  "¿Segurísima? 🙀",
  "¿De verdad me vas a decir que no? 💔",
  "¿Ni siquiera lo vas a pensar? 😢",
  "¿Por favorcito? 🥹",
  "Ya no queda espacio para huir... 😏",
];

const Index = () => {
  const [noCount, setNoCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });

  // Obtener el GIF según el estado
  const getCurrentGif = useCallback(() => {
    if (accepted) return catGifs.happy;
    if (noCount === 0) return catGifs.cute;
    if (noCount <= 2) return catGifs.annoyed;
    if (noCount <= 4) return catGifs.angry;
    return catGifs.furious;
  }, [accepted, noCount]);

  // Obtener la pregunta actual
  const getCurrentQuestion = useCallback(() => {
    if (accepted) return "¡Sabía que dirías que sí! 💕";
    return questions[Math.min(noCount, questions.length - 1)];
  }, [accepted, noCount]);

  // Calcular el tamaño del botón Sí
  const getYesButtonScale = useCallback(() => {
    return 1 + noCount * 0.3;
  }, [noCount]);

  // Mover el botón No a una posición aleatoria
  const moveNoButton = useCallback(() => {
    const maxX = 120;
    const maxY = 60;
    const newX = (Math.random() - 0.5) * maxX * 2;
    const newY = (Math.random() - 0.5) * maxY * 2;
    setNoButtonPosition({ x: newX, y: newY });
  }, []);

  // Manejar clic en Sí
  const handleYesClick = () => {
    setAccepted(true);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 overflow-hidden"
      style={{ background: "var(--valentine-gradient)" }}
    >
      {/* Corazones flotantes de fondo */}
      {accepted && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            >
              💕
            </div>
          ))}
        </div>
      )}

      <Card className="w-full max-w-md h-[50vh] min-h-[400px] flex flex-col shadow-2xl border-0 overflow-hidden">
        {/* Sección del GIF - 65% */}
        <div className="h-[65%] flex items-center justify-center bg-secondary/30 p-4">
          <img
            src={getCurrentGif()}
            alt="Gatito"
            className="max-h-full max-w-full object-contain rounded-lg transition-all duration-500"
          />
        </div>

        {/* Sección de pregunta y botones - 35% */}
        <div className="h-[35%] flex flex-col items-center justify-center p-4 gap-4 relative">
          <h2 className="text-xl md:text-2xl font-bold text-card-foreground text-center transition-all duration-300">
            {getCurrentQuestion()}
          </h2>

          {!accepted && (
            <div className="relative flex items-center justify-center w-full h-12">
              {/* Botón Sí - siempre centrado */}
              <Button
                onClick={handleYesClick}
                className="font-bold transition-all duration-300 ease-out z-10"
                style={{
                  transform: `scale(${getYesButtonScale()})`,
                }}
              >
                ¡Sí! 💖
              </Button>

              {/* Botón No - posición absoluta para que pueda ser tapado */}
              <Button
                variant="secondary"
                onClick={() => {
                  setNoCount((prev) => prev + 1);
                  moveNoButton();
                }}
                className="absolute font-bold transition-all duration-200 ease-out z-0"
                style={{
                  right: "10%",
                  transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                  opacity: noCount >= 8 ? 0.3 : 1,
                }}
              >
                No 😅
              </Button>
            </div>
          )}

          {accepted && (
            <div className="text-center animate-pulse">
              <p className="text-lg text-muted-foreground">
                ¡Te quiero mucho! 🐱💕
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Index;

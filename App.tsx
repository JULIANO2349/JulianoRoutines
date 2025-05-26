
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function App() {
  const [roundActive, setRoundActive] = useState(false);
  const [roundTime, setRoundTime] = useState(180);
  const [restTime, setRestTime] = useState(60);
  const [timeLeft, setTimeLeft] = useState(180);
  const [phase, setPhase] = useState("Round");

  useEffect(() => {
    let timer: any;
    if (roundActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (roundActive && timeLeft === 0) {
      if (phase === "Round") {
        setPhase("Rest");
        setTimeLeft(restTime);
      } else {
        setPhase("Round");
        setTimeLeft(roundTime);
      }
    }
    return () => clearTimeout(timer);
  }, [roundActive, timeLeft, phase, roundTime, restTime]);

  const startTimer = () => {
    setRoundActive(true);
    setPhase("Round");
    setTimeLeft(roundTime);
  };

  const resetTimer = () => {
    setRoundActive(false);
    setTimeLeft(roundTime);
    setPhase("Round");
  };

  return (
    <main className="p-4 max-w-md mx-auto">
      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="today">Hoje</TabsTrigger>
          <TabsTrigger value="timer">Cronômetro</TabsTrigger>
          <TabsTrigger value="combos">Combos</TabsTrigger>
        </TabsList>

        <TabsContent value="today">
          <Card>
            <CardContent className="p-4 space-y-2">
              <h2 className="font-bold">Treino de Hoje</h2>
              <ul className="list-disc pl-4">
                <li>Esteira 30min (Zona 2)</li>
                <li>Muay Thai 20h</li>
                <li>Combo: Jab + Direto + Chute Baixo</li>
                <li>Suplementos às 6h, 16h, 22h</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timer">
          <Card>
            <CardContent className="p-4">
              <h2 className="font-bold mb-2">Cronômetro de {phase}</h2>
              <div className="text-4xl font-mono text-center mb-4">
                {Math.floor(timeLeft / 60).toString().padStart(2, "0")}:
                {(timeLeft % 60).toString().padStart(2, "0")}
              </div>
              <div className="flex gap-2">
                <Button onClick={startTimer} disabled={roundActive}>
                  Iniciar
                </Button>
                <Button variant="secondary" onClick={resetTimer}>
                  Resetar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="combos">
          <Card>
            <CardContent className="p-4 space-y-2">
              <h2 className="font-bold mb-2">Treino de Combos (Visual)</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-red-500 p-4 rounded-xl text-white text-center">Jab</div>
                <div className="bg-blue-500 p-4 rounded-xl text-white text-center">Direto</div>
                <div className="bg-green-500 p-4 rounded-xl text-white text-center">Chute Baixo</div>
              </div>
              <p className="text-sm text-muted-foreground">Essas luzes representam a posição das manoplas.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}

// src/components/sections/MiniChatDemo.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function MiniChatDemo() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "¡Hola! Soy tu asistente de IA. ¿En qué puedo ayudarte hoy?",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Simulate API call to demo endpoint
      const response = await fetch("/api/demo/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: inputValue,
          context: "demo",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Add AI response
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.response || "Gracias por tu mensaje. Estoy aquí para ayudarte.",
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error("Failed to get response");
      }
    } catch (error) {
      console.error("Error:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Lo siento, tuve un problema al procesar tu solicitud. ¿Podrías intentarlo de nuevo?",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-surface/50 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prueba nuestra IA en acción
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experimenta el poder de nuestra inteligencia artificial sin necesidad de registrarte
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6">Demostración interactiva</h3>
            <p className="text-gray-300 mb-6">
              Nuestra IA puede ayudarte con una variedad de tareas, desde responder preguntas complejas hasta ayudarte con tareas de escritura y análisis de datos.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mr-4">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Respuestas inteligentes</h4>
                  <p className="text-gray-400 text-sm">Nuestra IA entiende el contexto y proporciona respuestas relevantes</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mr-4">
                  <Zap className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold">Análisis avanzado</h4>
                  <p className="text-gray-400 text-sm">Procesa información compleja y proporciona insights valiosos</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 mr-4">
                  <Zap className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <h4 className="font-semibold">Personalización</h4>
                  <p className="text-gray-400 text-sm">Adapta sus respuestas según tus necesidades específicas</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-primary hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                Solicitar demo real
              </button>
              <button className="px-6 py-3 border border-gray-600 hover:border-gray-500 text-white font-medium rounded-lg transition-colors">
                Ver casos de éxito
              </button>
            </div>
          </div>
          
          <div className="bg-background/80 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden">
            <div className="p-4 bg-gray-900/50 border-b border-gray-800">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-sm text-gray-400">Chat Demo - ColombiaTIC IA</span>
              </div>
            </div>
            
            <div className="h-96 overflow-y-auto p-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex mb-6 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mr-3">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] ${message.role === "user" ? "bg-primary/20" : "bg-gray-800"} rounded-2xl p-4`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 ml-3">
                      <User className="w-4 h-4 text-blue-500" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex mb-6 justify-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mr-3">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-gray-800 rounded-2xl p-4">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
              <div className="flex">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribe tu mensaje aquí..."
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-3 focus:outline-none focus:border-primary text-white"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-r-lg transition-colors disabled:opacity-50"
                  disabled={isLoading || !inputValue.trim()}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
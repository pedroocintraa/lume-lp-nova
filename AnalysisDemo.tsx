import React, { useState } from 'react';
import { analyzeConversation } from '../services/geminiService';
import { AnalysisResult } from '../types';
import { Button } from './Button';
import { Sparkles, Heart, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

export const AnalysisDemo: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!inputText.trim() || inputText.length < 10) return;
    
    setLoading(true);
    setResult(null);
    
    try {
      const data = await analyzeConversation(inputText);
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="py-20 md:py-24 relative overflow-hidden px-4 bg-lume-100">
      <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-lume-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-lume-highlight rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
           <span className="text-lume-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-3 block">Ferramenta Interativa</span>
          <h2 className="text-3xl md:text-5xl text-lume-900 mb-4 md:mb-6 font-bold tracking-tight text-balance">
            Experimente a Clareza
          </h2>
          <p className="text-lume-800 text-base md:text-lg max-w-2xl mx-auto font-normal opacity-80 leading-relaxed text-balance">
            Cole um trecho de uma conversa. A Lume vai te ajudar a ler nas entrelinhas com total privacidade.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
          <div className="bg-white/90 backdrop-blur-md border border-white/50 p-6 md:p-10 rounded-[2.5rem] shadow-xl animate-fade-in-up delay-150">
            <label className="block text-lume-900 font-bold mb-4 tracking-tight">Sua conversa</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ex: Ele disse que estava 'tudo bem', mas sumiu..."
              className="w-full h-56 md:h-72 p-5 rounded-2xl md:rounded-3xl border border-lume-200 bg-white/50 focus:ring-4 focus:ring-lume-500/10 focus:border-lume-400 outline-none resize-none text-lume-900 placeholder-lume-400/70 shadow-inner transition-all duration-300 font-medium text-sm leading-relaxed"
            />
            <div className="mt-4 flex justify-between items-center text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-lume-400">
              <span>Mínimo 10 caracteres</span>
              <span>{inputText.length} chars</span>
            </div>
            <div className="mt-6 md:mt-8">
              <Button 
                onClick={handleAnalyze} 
                disabled={loading || inputText.length < 10}
                fullWidth
                className="py-4 md:py-5 font-bold text-sm md:text-base rounded-2xl whitespace-nowrap"
              >
                {loading ? (
                  <><Loader2 className="animate-spin h-4 w-4 md:h-5 md:w-5" /> Analisando...</>
                ) : (
                  <><Sparkles className="h-4 w-4 md:h-5 md:w-5" /> Iluminar Conversa</>
                )}
              </Button>
            </div>
          </div>

          <div className="relative min-h-[350px] md:min-h-[450px] animate-fade-in-up delay-300">
            {!result && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 md:p-10 opacity-60">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-2xl md:rounded-[2rem] flex items-center justify-center mb-6 md:mb-8 shadow-sm">
                  <Heart className="h-8 w-8 md:h-10 md:w-10 text-lume-400" />
                </div>
                <h3 className="text-xl md:text-2xl text-lume-800 mb-2 md:mb-3 font-bold tracking-tight">Seu espaço seguro</h3>
                <p className="text-lume-800 text-sm md:text-base font-medium text-balance">
                  O resultado aparecerá aqui com insights gentis.
                </p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center p-10 animate-pulse">
                <div className="w-12 h-12 md:w-20 md:h-20 border-4 border-lume-200 border-t-lume-500 rounded-full animate-spin mb-6"></div>
                <p className="text-lume-900 text-xl md:text-2xl font-bold tracking-tight">Desvendando...</p>
              </div>
            )}

            {result && (
              <div className="bg-white p-6 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border-l-4 md:border-l-8 border-lume-400 animate-fade-in-up">
                <div className="flex items-center justify-between mb-6 md:mb-8 border-b border-lume-50 pb-4 md:pb-6">
                  <h3 className="text-xl md:text-2xl text-lume-900 font-bold tracking-tight">Análise</h3>
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                    result.safetyScore > 70 ? 'bg-green-100 text-green-700' :
                    result.safetyScore > 40 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Segurança: {result.safetyScore}%</span>
                  </div>
                </div>

                <div className="space-y-6 md:space-y-8">
                  <div>
                    <h4 className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-lume-400 mb-1">Tom Emocional</h4>
                    <p className="text-xl md:text-2xl text-lume-900 font-bold tracking-tight italic">"{result.emotionalTone}"</p>
                  </div>

                  <div className="bg-lume-50/50 p-5 md:p-6 rounded-2xl border border-lume-100">
                    <h4 className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-lume-400 mb-1">Nas Entrelinhas</h4>
                    <p className="text-lume-900 text-sm md:text-base leading-relaxed font-medium opacity-90">{result.hiddenSubtext}</p>
                  </div>

                  <div className="bg-lume-500/5 p-5 md:p-7 rounded-2xl border border-lume-500/10">
                    <h4 className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-lume-500 mb-2">
                      <Heart className="h-3 w-3 fill-lume-500" />
                      Conselho
                    </h4>
                    <p className="text-lume-900 text-sm md:text-base leading-relaxed font-bold">{result.advice}</p>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                    <p className="text-[9px] font-bold text-lume-400 mb-4 uppercase tracking-widest">Quer relatórios evolutivos?</p>
                    <Button variant="outline" fullWidth className="text-[10px] py-2.5 font-bold rounded-xl border-lume-200 text-lume-500 whitespace-nowrap">Ver Plano Premium</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
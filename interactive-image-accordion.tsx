import React, { useState } from 'react';
import { Button } from '../Button';
import { Sparkles } from 'lucide-react';

const accordionItems = [
  {
    id: 1,
    title: 'Clareza',
    imageUrl: 'https://images.unsplash.com/photo-1589004491830-ab0666c3359f?q=80&w=687&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Conexão',
    imageUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1169&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Paz Interior',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=799&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Entendimento',
    imageUrl: 'https://images.unsplash.com/photo-1724713042778-7bde8c3f7ce2?q=80&w=1170&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'LUME',
    imageUrl: 'https://images.unsplash.com/photo-1542353436-312f0e1f67ff?q=80&w=942&auto=format&fit=crop',
  },
];

interface AccordionItemProps {
  item: typeof accordionItems[0];
  isActive: boolean;
  onMouseEnter: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isActive, onMouseEnter }) => {
  return (
    <div
      className={`
        relative h-[350px] md:h-[500px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden cursor-pointer
        transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
        ${isActive ? 'w-[240px] md:w-[450px] flex-grow' : 'w-[50px] md:w-[80px] flex-shrink-0'}
      `}
      onMouseEnter={onMouseEnter}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
        onError={(e) => { 
          const target = e.target as HTMLImageElement;
          target.onerror = null; 
          target.src = 'https://placehold.co/400x500/eaddd7/6b5b95?text=LUME'; 
        }}
      />
      
      <div className={`absolute inset-0 bg-gradient-to-t from-lume-900/80 via-lume-900/20 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-90' : 'opacity-60'}`}></div>

      <span
        className={`
          absolute text-white font-bold text-xl md:text-2xl tracking-tight whitespace-nowrap
          transition-all duration-500 ease-in-out
          ${
            isActive
              ? 'bottom-8 left-8 opacity-100 translate-y-0' 
              : 'bottom-20 left-1/2 -translate-x-1/2 rotate-90 opacity-80'
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};

export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden min-h-[90vh] md:min-h-[95vh] flex items-center bg-[#fdf8f6]">
      <div className="absolute top-[-5%] right-[-5%] w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-gradient-to-b from-lume-200 to-lume-300 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[100px] opacity-40 animate-blob"></div>
      <div className="absolute top-[10%] left-[-10%] w-[350px] md:w-[600px] h-[350px] md:w-[600px] bg-lume-highlight rounded-full mix-blend-multiply filter blur-[80px] md:blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-16 lg:gap-24">
          
          <div className="w-full lg:w-5/12 text-center lg:text-left">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white backdrop-blur-sm shadow-sm mb-6 animate-fade-in-up">
                <Sparkles className="h-3.5 w-3.5 text-lume-500" />
                <span className="text-[10px] font-bold text-lume-800 uppercase tracking-[0.2em]">IA para Mulheres</span>
              </div>
            
            <h1 className="text-4xl md:text-[5.5rem] leading-[1.1] text-lume-900 mb-6 font-extrabold tracking-tighter animate-fade-in-up delay-100 text-balance">
              Ilumine o que não foi dito.
            </h1>
            
            <p className="mt-6 text-lg md:text-xl text-lume-800 font-normal leading-relaxed animate-fade-in-up delay-200 opacity-80 max-w-xl mx-auto lg:mx-0">
              Analise suas conversas, entenda padrões emocionais e receba conselhos objetivos. 
              Porque às vezes, a gente só precisa de clareza.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-300">
               <Button onClick={() => document.getElementById('demo')?.scrollIntoView({behavior: 'smooth'})} className="text-base md:text-lg px-8 py-4 font-bold rounded-full whitespace-nowrap">
                Começar Análise
              </Button>
              <Button variant="secondary" className="text-base md:text-lg px-8 py-4 font-bold rounded-full whitespace-nowrap">
                Saiba Mais
              </Button>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-4 text-xs text-lume-500 animate-fade-in-up delay-500">
              <div className="flex -space-x-2.5">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                      <img src={`https://picsum.photos/100/100?random=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="font-medium opacity-80">Junte-se a +2.000 mulheres.</p>
            </div>
          </div>

          <div className="w-full lg:w-7/12 animate-fade-in-up delay-200">
            <div className="flex flex-row items-center justify-center gap-2 md:gap-5 h-[380px] md:h-[550px] py-4">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
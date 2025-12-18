import React, { useState, useEffect, useRef } from 'react';
import { AnalysisDemo } from './components/AnalysisDemo';
import { Button } from './components/Button';
import { LandingAccordionItem as Hero } from './components/ui/interactive-image-accordion';
import { TestimonialStack, Testimonial } from './components/ui/glass-testimonial-swiper';
import { PricingCard } from './components/ui/pricing-card';
import FAQs from './components/ui/faqs';
import { Menu, X, ChevronRight, MessageCircleHeart, Lock, Sparkles, Feather, ArrowRight, Quote, Star, ShieldCheck, Heart, User, CheckCircle2 } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-lume-500 to-lume-300 flex items-center justify-center text-white font-bold italic text-lg shadow-md group-hover:rotate-12 transition-transform duration-500">
            L
          </div>
          <span className="font-bold text-2xl text-lume-900 tracking-tighter group-hover:tracking-normal transition-all duration-500">LUME</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {['Recursos', 'Depoimentos', 'Preços', 'FAQ'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-lume-800 hover:text-lume-500 transition-colors text-sm font-semibold tracking-tight relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lume-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <Button variant="primary" className="py-2 px-6 text-sm font-bold hover:scale-105" onClick={() => document.getElementById('demo')?.scrollIntoView({behavior: 'smooth'})}>
            Experimentar Grátis
          </Button>
        </nav>

        <button className="md:hidden text-lume-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl p-6 flex flex-col gap-4 md:hidden animate-[fadeIn_0.2s_ease-out]">
           {['Recursos', 'Depoimentos', 'Preços', 'FAQ'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-lume-800 py-2 border-b border-gray-50 block font-medium">
              {item}
            </a>
          ))}
           <Button fullWidth onClick={() => {
             setMobileMenuOpen(false);
             document.getElementById('demo')?.scrollIntoView({behavior: 'smooth'});
           }}>Experimentar</Button>
        </div>
      )}
    </header>
  );
};

export const RevealOnScroll: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'active' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: Feather,
      title: "Decodificação Emocional",
      desc: "Vá além das palavras. Nossa IA identifica o tom, a urgência e as emoções ocultas em cada mensagem."
    },
    {
      icon: Lock,
      title: "Espaço Seguro & Privado",
      desc: "Suas conversas são analisadas anonimamente. Nada é salvo. Sinta-se segura para desabafar."
    },
    {
      icon: Sparkles,
      title: "Conselhos de 'Amiga'",
      desc: "Receba recomendações práticas e empáticas, não apenas dados frios. Saiba exatamente como responder."
    }
  ];

  return (
    <section id="recursos" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-lume-500 font-bold uppercase tracking-widest text-xs">Recursos Exclusivos</span>
          <h2 className="text-4xl md:text-5xl text-lume-900 mt-3 mb-6 font-bold tracking-tight">Mais que uma ferramenta,<br/>uma aliada.</h2>
          <p className="text-lume-800 text-lg font-normal max-w-2xl mx-auto opacity-80 leading-relaxed">
            Desenvolvemos o Lume pensando nas nuances da comunicação moderna. 
            É sobre entender, não julgar.
          </p>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <RevealOnScroll key={i} delay={i * 150}>
              <div className="group p-10 rounded-[2.5rem] bg-lume-50 hover:bg-white border border-transparent hover:border-lume-100 shadow-sm hover:shadow-2xl transition-all duration-500 h-full">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <f.icon className="h-8 w-8 text-lume-500" />
                </div>
                <h3 className="text-2xl text-lume-900 mb-4 font-bold tracking-tight">{f.title}</h3>
                <p className="text-lume-700 leading-relaxed font-normal opacity-90">
                  {f.desc}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials: React.FC = () => {
  const testimonialsData: Testimonial[] = [
    {
      id: 1,
      initials: 'MS',
      name: 'Mariana Silva',
      role: 'Usuária Lume',
      quote: "Eu achava que estava exagerando nas minhas percepções. O Lume me ajudou a validar meus sentimentos e identificar uma comunicação passivo-agressiva que eu não conseguia nomear.",
      tags: [{ text: 'DESTAQUE', type: 'featured' }, { text: 'Relacionamento', type: 'default' }],
      stats: [{ icon: CheckCircle2, text: 'Verificada' }, { icon: Heart, text: 'Validado' }],
      avatarGradient: 'linear-gradient(135deg, #6b5b95, #8e7dbe)',
    },
    {
      id: 2,
      initials: 'BC',
      name: 'Beatriz Costa',
      role: 'Usuária Lume',
      quote: "Incrível como a sensibilidade da análise é real. Identificou padrões que eu levei meses de terapia para perceber. Me sinto muito mais segura agora.",
      tags: [{ text: 'Autoconhecimento', type: 'default' }],
      stats: [{ icon: ShieldCheck, text: 'Seguro' }, { icon: Sparkles, text: 'Insight' }],
      avatarGradient: 'linear-gradient(135deg, #8e7dbe, #feb47b)',
    },
    {
      id: 3,
      initials: 'AL',
      name: 'Ana Luísa',
      role: 'Usuária Lume',
      quote: "A clareza que eu precisava para parar de me culpar. É um espaço seguro onde recebo a verdade que preciso ouvir, mas com muito carinho e cuidado.",
      tags: [{ text: 'Cuidado', type: 'default' }, { text: 'Empatia', type: 'default' }],
      stats: [{ icon: Heart, text: 'Coração' }],
      avatarGradient: 'linear-gradient(135deg, #feb47b, #ff7e5f)',
    },
    {
      id: 4,
      initials: 'CM',
      name: 'Clara Mendes',
      role: 'Usuária Lume',
      quote: "Os conselhos são práticos e empáticos. Não parece uma máquina falando, parece uma irmã mais velha que entende tudo de relacionamentos.",
      tags: [{ text: 'Conselho', type: 'featured' }],
      stats: [{ icon: User, text: 'Irmã Lume' }],
      avatarGradient: 'linear-gradient(135deg, #4a3f69, #6b5b95)',
    },
    {
      id: 5,
      initials: 'JR',
      name: 'Juliana Rocha',
      role: 'Usuária Lume',
      quote: "Uso o Lume sempre que sinto um nó no estômago depois de uma conversa. Ele desata o nó e me devolve a paz de espírito para decidir os próximos passos.",
      tags: [{ text: 'Paz', type: 'default' }],
      stats: [{ icon: Sparkles, text: 'Clareza' }],
      avatarGradient: 'linear-gradient(135deg, #ff7e5f, #6b5b95)',
    }
  ];

  return (
    <section id="depoimentos" className="py-24 bg-white relative overflow-hidden flex flex-col items-center">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-lume-200/10 rounded-full blur-[120px] -z-10 animate-blob"></div>
      
      <RevealOnScroll className="container mx-auto px-6 text-center mb-16 relative z-10">
        <span className="text-lume-500 font-bold uppercase tracking-widest text-xs">Vozes da Comunidade</span>
        <h2 className="text-4xl md:text-5xl text-lume-900 mt-3 mb-6 font-bold tracking-tight">Histórias de Clareza</h2>
        <p className="text-lume-800 font-normal text-lg max-w-2xl mx-auto opacity-80">
          Arraste os cartões para conhecer como o Lume transformou a percepção de outras mulheres.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={300} className="container mx-auto px-6 flex justify-center items-center">
        <TestimonialStack testimonials={testimonialsData} />
      </RevealOnScroll>
    </section>
  );
};

const PricingSection: React.FC = () => {
  return (
    <div className="bg-lume-50">
      <PricingCard
        title="Plano Premium"
        description="A clareza que você merece, sem limites."
        price="R$ 19,90"
        originalPrice="R$ 39,90"
        features={[
          {
            title: "Funcionalidades Base",
            items: [
              "Análises de conversas ilimitadas",
              "Identificação de tons ocultos",
              "Conselhos empáticos e práticos",
              "Histórico de insights exclusivo",
            ],
          },
          {
            title: "Benefícios VIP",
            items: [
              "Relatórios semanais de evolução",
              "Suporte prioritário via chat",
              "Acesso antecipado a novos recursos",
              "Guia de comunicação assertiva",
            ],
          },
        ]}
        buttonText="Quero meu Plano Premium"
        onButtonClick={() => window.alert("Obrigado pelo interesse! Em breve o sistema de assinaturas estará disponível.")}
      />
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-lume-900 text-lume-50 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-lume-500 flex items-center justify-center text-white font-bold italic text-2xl shadow-lg">L</div>
              <span className="text-2xl font-bold tracking-tighter">LUME</span>
            </div>
            <p className="text-lume-200 text-base font-normal leading-relaxed opacity-70">
              Trazendo luz para as conversas que importam. Tecnologia com empatia para a mulher moderna.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-8 uppercase tracking-[0.2em] text-[10px]">Plataforma</h4>
            <ul className="space-y-4 text-sm text-lume-300 font-medium">
              <li><a href="#" className="hover:text-lume-400 transition-colors">Início</a></li>
              <li><a href="#demo" className="hover:text-lume-400 transition-colors">Análise Gratuita</a></li>
              <li><a href="#preços" className="hover:text-lume-400 transition-colors">Plano Premium</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-8 uppercase tracking-[0.2em] text-[10px]">Legal</h4>
            <ul className="space-y-4 text-sm text-lume-300 font-medium">
              <li><a href="#" className="hover:text-lume-400 transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-lume-400 transition-colors">Termos de Uso</a></li>
            </ul>
          </div>
          <div>
             <h4 className="font-bold text-white mb-8 uppercase tracking-[0.2em] text-[10px]">Contato</h4>
             <p className="text-sm text-lume-300 font-medium">ola@lumebot.com</p>
          </div>
        </div>
        <div className="border-t border-lume-800 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-lume-400 font-normal tracking-tight">
          <span className="opacity-60">© 2024 LUME. Feito com amor por mulheres para mulheres.</span>
          <div className="flex gap-8">
             <div className="w-10 h-10 rounded-full border border-lume-800 flex items-center justify-center hover:bg-lume-800 hover:text-white cursor-pointer transition-all duration-300"><Heart size={16} /></div>
             <div className="w-10 h-10 rounded-full border border-lume-800 flex items-center justify-center hover:bg-lume-800 hover:text-white cursor-pointer transition-all duration-300"><User size={16} /></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="antialiased text-lume-900 bg-[#fdf8f6] selection:bg-lume-100 selection:text-lume-900">
      <Header />
      <Hero />
      <Features />
      
      <RevealOnScroll>
        <AnalysisDemo />
      </RevealOnScroll>

      <Testimonials />
      <PricingSection />
      
      <RevealOnScroll>
        <FAQs />
      </RevealOnScroll>
      
      <div className="py-24 text-center bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <RevealOnScroll className="max-w-4xl mx-auto glass-card p-16 rounded-[3rem] shadow-2xl relative overflow-hidden border border-lume-100 group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-lume-200 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-lume-300 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            
            <h2 className="text-4xl md:text-5xl mb-8 text-lume-900 relative z-10 font-bold tracking-tight">Pronta para ver a verdade?</h2>
            <p className="text-lume-700 mb-14 text-xl font-normal max-w-2xl mx-auto relative z-10 leading-relaxed opacity-80">
              Comece sua jornada de clareza hoje. Milhares de mulheres já mudaram sua forma de se relacionar com o LUME.
            </p>
            <Button onClick={() => document.getElementById('demo')?.scrollIntoView({behavior: 'smooth'})} className="mx-auto text-xl px-16 py-8 shadow-2xl shadow-lume-500/20 relative z-10 font-bold rounded-full group-hover:scale-105 transition-transform duration-500">
              Iluminar Minha Vida <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </RevealOnScroll>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
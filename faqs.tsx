import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion'
import { Sparkles } from 'lucide-react'

export default function FAQs() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'O que o LUME analisa exatamente?',
            answer: 'O LUME analisa o subtexto emocional de suas conversas, identificando tons ocultos, padrões de comportamento e oferecendo uma perspectiva externa acolhedora.',
        },
        {
            id: 'item-2',
            question: 'Minhas conversas ficam salvas?',
            answer: 'Sua privacidade é prioridade absoluta. As conversas processadas não são armazenadas. Uma vez finalizada a análise, os dados são descartados instantaneamente.',
        },
        {
            id: 'item-3',
            question: 'O LUME substitui a terapia?',
            answer: 'Não. O LUME é uma ferramenta de apoio à clareza emocional imediata, mas não substitui o acompanhamento profissional de um psicólogo.',
        },
        {
            id: 'item-4',
            question: 'Quais tipos de texto posso analisar?',
            answer: 'Você pode colar trechos de qualquer aplicativo ou descrever uma situação. Quanto mais contexto, mais precisa será a análise.',
        },
        {
            id: 'item-5',
            question: 'Como funciona o Plano Premium?',
            answer: 'Assinantes têm acesso ilimitado, relatórios evolutivos e prioridade no suporte. Ideal para quem busca um processo contínuo de autoconhecimento.',
        },
    ]

    return (
        <section id="faq" className="bg-lume-50 py-20 md:py-32 relative overflow-hidden px-4">
             {/* Decorative Elements */}
            <div className="absolute top-1/2 left-0 w-48 md:w-64 h-48 md:h-64 bg-lume-200 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl opacity-20"></div>
            
            <div className="mx-auto max-w-3xl relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-lume-100 shadow-sm mb-6">
                        <Sparkles className="h-3.5 w-3.5 text-lume-500" />
                        <span className="text-[10px] font-bold text-lume-500 uppercase tracking-widest">Dúvidas Frequentes</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl text-lume-900 font-bold tracking-tight mb-4 md:mb-6 text-balance">Sua paz, nossa prioridade</h2>
                    <p className="text-lume-800 text-base md:text-lg font-medium opacity-70 text-balance">Respostas rápidas sobre funcionamento e privacidade.</p>
                </div>

                <div className="mt-8 md:mt-12 bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 shadow-xl shadow-lume-900/5 border border-white">
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full">
                        {faqItems.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}>
                                <AccordionTrigger className="text-base md:text-xl font-bold tracking-tight py-5 md:py-6">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-sm md:text-lg leading-relaxed">{item.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <div className="mt-10 md:mt-12 pt-8 border-t border-lume-50 text-center">
                        <p className="text-lume-400 font-bold text-[9px] md:text-xs uppercase tracking-widest mb-3 md:mb-4">
                            Ainda tem perguntas?
                        </p>
                        <a
                            href="mailto:ola@lumebot.com"
                            className="inline-flex items-center text-sm md:text-base text-lume-500 font-bold hover:underline gap-2 group whitespace-nowrap">
                            Fale com nosso suporte
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
import React, { useState, useRef, useEffect, useCallback, CSSProperties } from 'react';

// --- Component Interfaces ---
export interface Testimonial {
  id: string | number;
  initials: string;
  name: string;
  role: string;
  quote: string;
  tags: { text: string; type: 'featured' | 'default' }[];
  stats: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; text: string; }[];
  avatarGradient: string;
}

export interface TestimonialStackProps {
  testimonials: Testimonial[];
  /** How many cards to show behind the main card */
  visibleBehind?: number;
}

// --- The Component ---
export const TestimonialStack = ({ testimonials, visibleBehind = 2 }: TestimonialStackProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartRef = useRef(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const totalCards = testimonials.length;

  const navigate = useCallback((newIndex: number) => {
    setActiveIndex((newIndex + totalCards) % totalCards);
  }, [totalCards]);

  // Auto-play effect
  useEffect(() => {
    if (isDragging) return; // Pause auto-play while the user is interacting

    const timer = setInterval(() => {
      navigate(activeIndex + 1);
    }, 5000); // Change card every 5 seconds

    return () => clearInterval(timer);
  }, [activeIndex, isDragging, navigate]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, index: number) => {
    if (index !== activeIndex) return;
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartRef.current = clientX;
  };

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragOffset(clientX - dragStartRef.current);
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    if (Math.abs(dragOffset) > 80) {
      navigate(activeIndex + (dragOffset < 0 ? 1 : -1));
    }
    setIsDragging(false);
    setDragOffset(0);
  }, [isDragging, dragOffset, activeIndex, navigate]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);
  
  if (!testimonials?.length) return null;

  return (
    <section className="testimonials-stack relative pb-16">
      <div className="relative w-full flex items-center justify-center">
        {testimonials.map((testimonial, index) => {
          const isActive = index === activeIndex;
          const displayOrder = (index - activeIndex + totalCards) % totalCards;

          const style: CSSProperties = {};
          if (displayOrder === 0) {
            style.transform = `translateX(${dragOffset}px) scale(1)`;
            style.opacity = 1;
            style.zIndex = totalCards;
          } else if (displayOrder <= visibleBehind) {
            const scale = 1 - 0.08 * displayOrder;
            const translateY = -2.5 * displayOrder;
            style.transform = `scale(${scale}) translateY(${translateY}rem)`;
            style.opacity = 1 - 0.3 * displayOrder;
            style.zIndex = totalCards - displayOrder;
          } else {
            style.transform = 'scale(0.8) translateY(0)';
            style.opacity = 0;
            style.zIndex = 0;
          }

          const tagClasses = (type: 'featured' | 'default') => type === 'featured' 
            ? 'bg-lume-500/10 text-lume-500 border border-lume-500/20 font-bold' 
            : 'bg-lume-100 text-lume-800 border border-lume-200/50 font-semibold';
            
          return (
            <div
              ref={el => { cardRefs.current[index] = el; }}
              key={testimonial.id}
              className={`testimonial-card glass-effect rounded-[3rem] overflow-hidden ${isDragging && isActive ? 'transition-none' : 'transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]'}`}
              style={style}
              onMouseDown={(e) => handleDragStart(e, index)}
              onTouchStart={(e) => handleDragStart(e, index)}
            >
              <div className="p-10 md:p-14">
                <div className="flex items-start justify-between mb-10">
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-[1.25rem] flex items-center justify-center text-white font-bold italic text-2xl shadow-inner" style={{ background: testimonial.avatarGradient }}>
                      {testimonial.initials}
                    </div>
                    <div>
                      <h3 className="text-lume-900 text-xl font-bold tracking-tight">{testimonial.name}</h3>
                      <p className="text-[10px] text-lume-400 uppercase font-bold tracking-[0.2em] mt-1">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="text-lume-100 hidden sm:block opacity-50">
                    <svg width="48" height="48" viewBox="0 0 40 40" fill="currentColor">
                      <path d="M12.5 15H7.5V25H12.5L17.5 30V10L12.5 15Z" opacity="0.2"/>
                      <path d="M22 15C23.6569 15 25 16.3431 25 18V22C25 23.6569 23.6569 25 22 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    </svg>
                  </div>
                </div>
                
                <blockquote className="text-lume-900/90 leading-relaxed text-xl md:text-2xl font-medium tracking-tight mb-12">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-t border-lume-100 pt-10 gap-8">
                  <div className="flex flex-wrap gap-2.5">
                    {testimonial.tags.map((tag, i) => (
                      <span key={i} className={['text-[10px]', 'uppercase', 'tracking-widest', 'px-4', 'py-2', 'rounded-xl', tagClasses(tag.type)].join(' ')}>
                        {tag.text}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-8 text-xs text-lume-400 font-bold tracking-wide">
                    {testimonial.stats.map((stat, i) => {
                      const IconComponent = stat.icon;
                      return (
                        <span key={i} className="flex items-center gap-2.5">
                          <IconComponent className="h-4.5 w-4.5 text-lume-300" />
                          {stat.text}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="pagination flex gap-4 justify-center absolute bottom-0 left-0 right-0 z-20">
        {testimonials.map((_, index) => (
          <button 
            key={index} 
            aria-label={`Ir para depoimento ${index + 1}`} 
            onClick={() => navigate(index)} 
            className={`pagination-dot ${activeIndex === index ? 'active' : ''}`} 
          />
        ))}
      </div>
    </section>
  );
};
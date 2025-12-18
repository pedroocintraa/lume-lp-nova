import React, { useEffect, useRef, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./card";
import { motion, useInView, Variants } from "framer-motion";
import { Button } from "./button_shadcn";
import { Check, ShieldCheck } from "lucide-react";
import { Separator } from "./separator";

interface PricingFeature {
  title: string;
  items: string[];
}

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  features: PricingFeature[];
  buttonText?: string;
  onButtonClick?: () => void;
}

export function PricingCard({
  title,
  description,
  price,
  originalPrice,
  features,
  buttonText = "Começar Agora",
  onButtonClick,
}: PricingCardProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const listItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.section
      id="preços"
      ref={containerRef}
      className="container mx-auto px-4 md:px-6 py-16 md:py-24"
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <Card className="relative mx-auto w-full max-w-5xl overflow-hidden group border-lume-100 shadow-2xl rounded-[2rem] md:rounded-[2.5rem]">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side: Pricing Info */}
          <motion.div
            className="flex flex-col justify-between p-8 md:p-14 lg:w-2/5 bg-white"
            variants={itemVariants}
          >
            <div>
              <CardHeader className="p-0">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl md:text-4xl mb-3 text-lume-900 font-serif font-semibold tracking-tight text-balance">{title}</CardTitle>
                    <CardDescription className="mt-2 text-lume-800 text-sm md:text-base font-sans font-light leading-relaxed opacity-80">{description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <motion.div className="mt-8 md:mt-10 space-y-4" variants={itemVariants}>
                <div className="flex items-baseline flex-wrap gap-2">
                  <span className="text-4xl md:text-5xl font-sans font-bold text-lume-900 tracking-tight whitespace-nowrap">{price}</span>
                  {originalPrice && (
                    <span className="text-base md:text-xl text-lume-200 font-sans font-normal line-through opacity-60 italic whitespace-nowrap">
                      {originalPrice}
                    </span>
                  )}
                </div>
                <span className="block text-[9px] md:text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-lume-400">
                  pagamento mensal • cancele quando quiser
                </span>
              </motion.div>
            </div>
            <motion.div className="mt-10 md:mt-12" variants={itemVariants}>
              <Button className="w-full text-base md:text-lg font-sans font-semibold py-6 shadow-xl shadow-lume-500/20 whitespace-nowrap" size="lg" onClick={onButtonClick}>
                {buttonText}
              </Button>
            </motion.div>
          </motion.div>
          
          <Separator className="lg:hidden mx-8 opacity-50" />
          
          {/* Right Side: Features List */}
          <motion.div
            className="bg-lume-50/50 p-8 md:p-14 lg:w-3/5 flex flex-col justify-center"
            variants={itemVariants}
          >
            <div className="space-y-10 md:space-y-12">
              {features.map((feature, featureIndex) => (
                <div key={featureIndex}>
                  <h3 className="mb-5 text-[9px] md:text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-lume-500">{feature.title}</h3>
                  <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                    {feature.items.map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3 md:gap-4"
                        variants={listItemVariants}
                        custom={index + featureIndex * feature.items.length}
                      >
                        <div className="mt-0.5 bg-white p-1 rounded-full shadow-sm border border-lume-100 flex-shrink-0">
                          <Check className="h-3 w-3 text-lume-500" strokeWidth={3} />
                        </div>
                        <span className="text-lume-900 font-sans font-light text-sm leading-snug">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  {featureIndex < features.length - 1 && <Separator className="mt-10 md:mt-12 mb-2 opacity-30" />}
                </div>
              ))}
            </div>
            
            <div className="mt-10 md:mt-12 p-5 md:p-6 rounded-2xl bg-white/40 border border-white/60 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-lume-500/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="h-5 w-5 text-lume-500" />
              </div>
              <p className="text-[10px] md:text-[11px] text-lume-800 font-sans italic leading-tight">
                Privacidade inegociável. Suas conversas não são armazenadas.
              </p>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.section>
  );
}
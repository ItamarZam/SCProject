import React, { useMemo } from 'react';
import { 
  GraduationCap, 
  Brain, 
  Sparkles, 
  LightbulbIcon, 
  Coffee 
} from 'lucide-react';

const logoVariations = [
  {
    icon: GraduationCap,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    animation: 'hover:rotate-12',
  },
  {
    icon: Brain,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    animation: 'hover:scale-110',
  },
  {
    icon: Sparkles,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    animation: 'hover:rotate-180',
  },
  {
    icon: LightbulbIcon,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    animation: 'hover:-translate-y-1',
  },
  {
    icon: Coffee,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
    animation: 'hover:scale-110 hover:rotate-12',
  },
];

const Logo = ({ className = "h-8" }: { className?: string }) => {
  const selectedVariation = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * logoVariations.length);
    return logoVariations[randomIndex];
  }, []);

  const IconComponent = selectedVariation.icon;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`p-2 rounded-lg ${selectedVariation.bgColor} transition-all duration-300 ${selectedVariation.animation}`}>
        <IconComponent className={`w-6 h-6 ${selectedVariation.color}`} />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-xl text-secondary">EDU-BOT</span>
        <span className="text-[10px] text-gray-500 -mt-1">Because Teachers Deserve a Break</span>
      </div>
    </div>
  );
};

export default Logo;
import React, { useState, useEffect } from "react";
import Login from "@/components/Login";
import 'remixicon/fonts/remixicon.css';

const FloatingParticle = ({ delay = 0, duration = 4 }) => {
  const [position, setPosition] = useState({ x: Math.random() * 100, y: Math.random() * 100 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: Math.random() * 100,
        y: Math.random() * 100
      });
    }, duration * 1000);
    
    return () => clearInterval(interval);
  }, [duration]);
  
  return (
    <div 
      className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 animate-pulse"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transition: `all ${duration}s ease-in-out`,
        animationDelay: `${delay}s`
      }}
    />
  );
};

const FeatureCard = ({ icon, title, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`flex gap-5 group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
        isHovered ? 'translate-x-2' : ''
      }`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex items-center h-12 w-12 border-2 justify-center border-purple-500/50 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl transition-all duration-500 group-hover:border-purple-400 group-hover:shadow-lg group-hover:shadow-purple-500/25 ${
        isHovered ? 'animate-bounce' : ''
      }`}>
        <i className={`${icon} text-purple-300 group-hover:text-purple-200 transition-colors duration-300 text-lg`}></i>
      </div>
      <div className="w-[90%] text-sm text-gray-300 group-hover:text-white transition-colors duration-300 flex items-center">
        {title}
      </div>
    </div>
  );
};

const AnimatedBackground = () => {
  return (
    <>
      
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-pulse" style={{ animationDuration: '8s' }} />
      
      
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '6s', animationDelay: '0s' }} />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '8s', animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-600/25 to-purple-600/25 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      
      
      {[...Array(15)].map((_, i) => (
        <FloatingParticle key={i} delay={i * 0.5} duration={4 + Math.random() * 4} />
      ))}
      
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)
          `,
          backgroundSize: '40px 40px',
        }} />
      </div>
    </>
  );
};

const Start = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const features = [
    { icon: "ri-group-fill", title: "Real-time collaboration and member coordination", delay: 200 },
    { icon: "ri-list-check", title: "Smart task management across all household members", delay: 400 },
    { icon: "ri-lock-password-line", title: "Enterprise-grade security and privacy protection", delay: 600 }
  ];

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden relative">
      
      <AnimatedBackground />
      
      
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="flex w-screen h-screen z-10 items-center justify-center relative">
        <div className="w-[70%] h-full flex-col gap-12 flex items-center justify-center">
          
          
          <div className={`flex items-center justify-center flex-col gap-4 transform transition-all duration-1000 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="relative group">
              <span className="h-16 w-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/25 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 animate-pulse">
                <i className="ri-artboard-2-line text-2xl text-white"></i>
              </span>
              
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 opacity-20 blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            
            <div className="relative">
              <h2 className="text-6xl font-bold bg-gradient-to-br from-white via-purple-200 to-pink-400 bg-clip-text text-transparent animate-pulse hover:scale-105 transition-transform duration-500 cursor-default">
                HiveBoard
              </h2>
              
              <div className="absolute inset-0 text-6xl font-bold text-purple-500/20 blur-lg -z-10">
                HiveBoard
              </div>
            </div>
            
            <p className={`w-[60%] text-center text-base text-purple-200 leading-relaxed transform transition-all duration-1000 delay-300 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}>
              Orchestrate your digital households with quantum efficiency and seamless collaboration
            </p>
          </div>

          
          <div className={`flex flex-col items-start justify-center gap-6 w-[40%] transform transition-all duration-1000 delay-500 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {features.map((feature, index) => (
              <div 
                key={index}
                className="transform transition-all duration-300"
                style={{ 
                  animationDelay: `${feature.delay}ms`,
                  animation: isLoaded ? 'fadeInUp 0.8s ease forwards' : ''
                }}
              >
                <FeatureCard 
                  icon={feature.icon}
                  title={feature.title}
                  delay={feature.delay}
                />
              </div>
            ))}
            
            
            <div className="mt-4 flex gap-4">
              {[1, 2, 3].map((_, i) => (
                <div 
                  key={i}
                  className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              ))}
            </div>
          </div>
        </div>

       
        <div className="w-[30%] h-full">
          <Login />
        </div>
      </div>
      
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div 
              key={i}
              className="w-1 h-1 bg-purple-400/60 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
      
     
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Start;
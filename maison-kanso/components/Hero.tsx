import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-[90vh] flex flex-col items-center justify-center text-center bg-white overflow-hidden">
        {/* Abstract Background Element - Optional subtle gradient or image */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1594815467362-09855590c67e?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-10 px-6 animate-fade-in-up">
            <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-kanso-500">Maison Kanso</span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] text-kanso-900">
                A sanctuary for <br />
                <span className="italic font-light text-kanso-600">slow living.</span>
            </h1>
            
            <p className="text-kanso-500 max-w-lg mx-auto text-sm md:text-base leading-relaxed font-light">
                Curated minimalism for the modern home. Objects that breathe and spaces that heal.
            </p>

            <div className="pt-8 flex justify-center">
                 <button className="group relative inline-block text-sm uppercase tracking-[0.2em] text-kanso-900 font-medium pb-2 overflow-hidden">
                    <span className="relative z-10">Explore Collection</span>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-kanso-200"></div>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-kanso-900 transform -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0"></div>
                </button>
            </div>
        </div>
    </section>
  );
};

export default Hero;
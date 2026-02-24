import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-100 bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <p className="text-slate-500 text-sm font-medium">
            © 2026 <span className="text-slate-900 font-bold">Trixtt</span>. All rights reserved.
          </p>
        </div>
        
        <div className="flex gap-8 text-sm font-medium text-slate-400">
          <a 
            href="https://github.com/Trixtt" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-slate-900 transition-colors"
          >
            GitHub
          </a>
          <Link 
            href="/privacy" 
            className="hover:text-slate-900 transition-colors"
          >
            Privacy
          </Link>
          <Link 
            href="/terms" 
            className="hover:text-slate-900 transition-colors"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};
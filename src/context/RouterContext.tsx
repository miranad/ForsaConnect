import React, { createContext, useContext, useState, useEffect } from 'react';

export type PageType = 
  | 'home' 
  | 'opportunities' 
  | 'opportunity-detail' 
  | 'submit' 
  | 'admin' 
  | 'verification' 
  | 'about' 
  | 'contact';

export interface RouteState {
  page: PageType;
  id?: string;
  scopeFilter?: string;
  categoryFilter?: string;
}

interface RouterContextType {
  route: RouteState;
  navigate: (page: PageType, id?: string, extra?: { scopeFilter?: string; categoryFilter?: string }) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

function parseHash(): RouteState {
  const hash = window.location.hash.replace(/^#\/?/, '').trim();
  if (!hash || hash === 'home') {
    return { page: 'home' };
  }
  
  const parts = hash.split('/').filter(Boolean);
  const first = parts[0];

  if (first === 'opportunities') {
    if (parts[1]) {
      return { page: 'opportunity-detail', id: parts[1] };
    }
    return { page: 'opportunities' };
  }
  if (first === 'submit') return { page: 'submit' };
  if (first === 'admin') return { page: 'admin' };
  if (first === 'verification') return { page: 'verification' };
  if (first === 'about') return { page: 'about' };
  if (first === 'contact') return { page: 'contact' };

  // If hash is an ID directly like #FC-001
  if (first.startsWith('FC-')) {
    return { page: 'opportunity-detail', id: first };
  }

  return { page: 'home' };
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState<RouteState>(parseHash);

  useEffect(() => {
    const handleHashChange = () => {
      const newRoute = parseHash();
      setRoute(newRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: PageType, id?: string, extra?: { scopeFilter?: string; categoryFilter?: string }) => {
    let hash = `#/${page}`;
    if (page === 'opportunity-detail' && id) {
      hash = `#/opportunities/${id}`;
    }
    window.location.hash = hash;
    setRoute({ page, id, ...extra });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

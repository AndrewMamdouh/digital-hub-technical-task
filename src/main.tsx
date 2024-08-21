import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { PrimeReactProvider } from 'primereact/api';

import App from './App.tsx';
import './index.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ClerkProvider
            publishableKey={CLERK_PUBLISHABLE_KEY}
            afterSignOutUrl="/"
        >
            <PrimeReactProvider>
                <App />
            </PrimeReactProvider>
        </ClerkProvider>
    </StrictMode>
);

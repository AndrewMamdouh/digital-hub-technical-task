import { UserButton } from '@clerk/clerk-react';
import { ReactNode } from 'react';

export type MainProps = {
    children: ReactNode;
};

const Main = ({ children }: MainProps) => (
    <>
        <header className="fixed inset-x-0 top-0 z-20 shrink-0 bg-secondary">
            <nav className="flex items-center justify-between p-5 lg:px-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="none"
                    viewBox="0 0 40 40"
                >
                    <path
                        className="fill-primary"
                        d="M20 0c11.046 0 20 8.954 20 20v14a6 6 0 0 1-6 6H21v-8.774c0-2.002.122-4.076 1.172-5.78a10 10 0 0 1 6.904-4.627l.383-.062a.8.8 0 0 0 0-1.514l-.383-.062a10 10 0 0 1-8.257-8.257l-.062-.383a.8.8 0 0 0-1.514 0l-.062.383a9.999 9.999 0 0 1-4.627 6.904C12.85 18.878 10.776 19 8.774 19H.024C.547 8.419 9.29 0 20 0Z"
                    ></path>
                    <path
                        className="fill-primary"
                        d="M0 21h8.774c2.002 0 4.076.122 5.78 1.172a10.02 10.02 0 0 1 3.274 3.274C18.878 27.15 19 29.224 19 31.226V40H6a6 6 0 0 1-6-6V21ZM40 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                    ></path>
                </svg>
                <UserButton />
            </nav>
        </header>
        <div className="absolute inset-0 mt-[4.25rem] overflow-auto px-5 pt-8 scrollbar-thin lg:px-6">
            {children}
        </div>
    </>
);

export default Main;

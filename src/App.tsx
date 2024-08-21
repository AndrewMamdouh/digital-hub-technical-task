import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { LoginPage, TasksPage } from '@Pages';

export default function App() {
    return (
        <div className="flex h-full min-h-screen flex-col">
            <SignedOut>
                <LoginPage />
            </SignedOut>
            <SignedIn>
                <TasksPage />
            </SignedIn>
        </div>
    );
}

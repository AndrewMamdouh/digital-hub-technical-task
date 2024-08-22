import { SignInButton } from '@clerk/clerk-react';

import { Button } from '@UI';

const Login = () => {
    return (
        <div className="relative flex grow flex-col items-center justify-center gap-y-24">
            <span className="bg-pattern absolute inset-0 -z-10" />
            <div>
                <h1 className="text-center font-heading text-4xl font-bold leading-[3rem] text-black sm:text-5xl sm:leading-[4rem] md:text-6xl md:leading-[5rem] xl:text-8xl xl:leading-[7rem]">
                    Get it <span className="highlight">organized</span>.
                    <br />
                    Fast, Easy.
                </h1>
                <p className="mt-8 text-center font-body text-xl italic text-black md:text-2xl xl:text-3xl 2xl:text-4xl">
                    We help you to make your work life easier.
                </p>
            </div>
            <SignInButton>
                <Button
                    className="md:px-8 md:py-2 lg:px-12 lg:py-3 xl:px-16 xl:py-4"
                    size="lg"
                >
                    Get Started
                </Button>
            </SignInButton>
        </div>
    );
};

export default Login;

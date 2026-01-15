"use client";

import { GlobalStyles } from "@mui/material";

export const HomeGlobalStyles = () => {
    return (
        <GlobalStyles
            styles={{
                '@keyframes fadeInUp': {
                    from: {
                        opacity: 0,
                        transform: 'translateY(30px)',
                    },
                    to: {
                        opacity: 1,
                        transform: 'translateY(0)',
                    }
                },
                '@keyframes fadeIn': {
                    from: {
                        opacity: 0,
                    },
                    to: {
                        opacity: 1,
                    }
                },
                '@keyframes slideInLeft': {
                    from: {
                        opacity: 0,
                        transform: 'translateX(-30px)',
                    },
                    to: {
                        opacity: 1,
                        transform: 'translateX(0)',
                    }
                },
                '@keyframes slideInRight': {
                    from: {
                        opacity: 0,
                        transform: 'translateX(30px)',
                    },
                    to: {
                        opacity: 1,
                        transform: 'translateX(0)',
                    }
                },
                '@keyframes patternMove': {
                    '0%': {
                        transform: 'translate(0, 0)',
                    },
                    '100%': {
                        transform: 'translate(60px, 60px)',
                    }
                },
                '@keyframes float': {
                    '0%, 100%': {
                        transform: 'translateY(0px)',
                    },
                    '50%': {
                        transform: 'translateY(-10px)',
                    }
                },
                '.fade-in-up': {
                    animation: 'fadeInUp 1s ease-out forwards',
                    opacity: 0,
                },
                '.fade-in-up-delay-1': {
                    animation: 'fadeInUp 1s ease-out 0.2s forwards',
                    opacity: 0,
                },
                '.fade-in-up-delay-2': {
                    animation: 'fadeInUp 1s ease-out 0.4s forwards',
                    opacity: 0,
                },
                '.fade-in': {
                    animation: 'fadeIn 1.5s ease-out forwards',
                    opacity: 0,
                },
                '.slide-in-left': {
                    animation: 'slideInLeft 1s ease-out forwards',
                    opacity: 0,
                },
                '.slide-in-right': {
                    animation: 'slideInRight 1s ease-out forwards',
                    opacity: 0,
                },
                '.float': {
                    animation: 'float 3s ease-in-out infinite',
                },
            }}
        />
    );
};


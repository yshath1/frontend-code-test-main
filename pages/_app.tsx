import React from 'react';
import { AppProps } from 'next/app';
import '../public/css/styles.css';
import { styleRenderer, StyleProvider, ThemePicker } from 'vcc-ui';

const renderer = styleRenderer();

export default function MyApp(props: AppProps) {
    const { Component, pageProps } = props;
    return (
        <React.StrictMode>
            <StyleProvider renderer={renderer}>
                <ThemePicker variant="light">
                    <Component {...pageProps} />
                </ThemePicker>
            </StyleProvider>
        </React.StrictMode>
    );
}

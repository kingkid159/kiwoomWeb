import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';
import Lnb from '@/components/lnb/Lnb';
import Header from '@/components/header/Header';
import AuthGuardClient from '@/components/auth/AuthGuardClient';
import AuthInitializer from '@/components/auth/AuthProvider';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <AuthInitializer>
                    <AuthGuardClient>
                        <div className="flex">
                            <aside className="hidden md:block w-64 shrink-0 bg-gray-100 p-4 z-40">
                                <Lnb />
                            </aside>
                            <div className="flex-1 bg-white h-screen w-full">
                                <Header />
                                {children}
                            </div>
                        </div>
                    </AuthGuardClient>
                </AuthInitializer>
            </body>
        </html>
    );
}

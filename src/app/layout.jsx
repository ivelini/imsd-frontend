import '@/styles/globals.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import '@/styles/prime.custom.css'
import 'primeicons/primeicons.css';

import HeaderSection from "@/components/layout/HeaderSection";
import FooterSection from "@/components/layout/FooterSection";


export default function RootLayout({ children }) {

    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body>
                <div className="app">
                    <div className="wrapper">
                        <HeaderSection />

                        {children}

                        <FooterSection />
                    </div>
                </div>
            </body>
        </html>
    )
}

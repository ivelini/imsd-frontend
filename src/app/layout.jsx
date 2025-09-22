import '@/styles/globals.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import '@/styles/prime.custom.css'
import 'primeicons/primeicons.css';

import HeaderSection from "@/app/_components/layout/HeaderSection";
import FooterSection from "@/app/_components/layout/FooterSection";
import Script from "next/script";


export default function RootLayout({ children }) {

    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){
              (m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j=0; j<document.scripts.length; j++) {
                if (document.scripts[j].src === r) { return; }
              }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],
              k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(36278095, "init", {
                  webvisor:true,
                  clickmap:true,
                  ecommerce:"dataLayer",
                  accurateTrackBounce:true,
                  trackLinks:true
              });
            `}}/>
                <noscript>
                    <div>
                        <img
                            src="https://mc.yandex.ru/watch/36278095"
                            style={{ position: "absolute", left: "-9999px" }}
                            alt=""
                        />
                    </div>
                </noscript>
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

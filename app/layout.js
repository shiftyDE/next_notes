import './style.css'

export const metadata = {
  title: 'Note App – Organisiere deine Notizen',
  description: 'Eine elegante Note-App zum Erfassen, Bearbeiten und Organisieren deiner Gedanken. Schnell, übersichtlich und immer dabei.',
  keywords: ['Notizapp', 'Notes', 'Notizen', 'Gedanken', 'Memo', 'Todo'],
  robots: 'index,follow',
  openGraph: {
    title: 'Note App – Organisiere deine Notizen',
    description: 'Eine elegante Note-App zum Erfassen, Bearbeiten und Organisieren deiner Gedanken. Schnell, übersichtlich und immer dabei.',
    type: 'website',
    url: 'https://notes.app',
    siteName: 'Note App',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Note App – Organisiere deine Notizen',
    description: 'Eine elegante Note-App zum Erfassen, Bearbeiten und Organisieren deiner Gedanken.',
    site: '@nextnotesapp',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="de" className="dark">
      <head>
        {/* Canonical URL */}
        <link rel="canonical" href="https://notes.app/" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Note App – Organisiere deine Notizen" />
        <meta property="og:description" content="Eine elegante Note-App zum Erfassen, Bearbeiten und Organisieren deiner Gedanken." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://notes.app/" />
        <meta property="og:site_name" content="Note App" />
        <meta property="og:locale" content="de_DE" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Note App – Organisiere deine Notizen" />
        <meta name="twitter:description" content="Eine elegante Note-App zum Erfassen, Bearbeiten und Organisieren deiner Gedanken." />
        
        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Note App",
            "description": "Eine elegante Note-App zum Erfassen, Bearbeiten und Organisieren deiner Gedanken.",
            "url": "https://notes.app/",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "CrossPlatform",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR"
            }
          })}
        </script>
      </head>
      
      <body className="min-h-screen bg-gray-900 text-white font-sans antialiased transition-colors duration-300">
        {/* Background gradient overlay */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 -z-10" />
        
        {children}
      </body>
    </html>
  )
}
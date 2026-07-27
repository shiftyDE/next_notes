import './style.css'

export const metadata = {
  title: 'Note App – Organize Your Notes',
  description: 'An elegant note app for capturing, editing, and organizing your thoughts. Fast, clean, and always with you.',
  keywords: ['Note App', 'Notes', 'Thoughts', 'Memo', 'Todo'],
  robots: 'index,follow',
  openGraph: {
    title: 'Note App – Organize Your Notes',
    description: 'An elegant note app for capturing, editing, and organizing your thoughts. Fast, clean, and always with you.',
    type: 'website',
    url: 'https://notes.app',
    siteName: 'Note App',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Note App – Organize Your Notes',
    description: 'An elegant note app for capturing, editing, and organizing your thoughts.',
    site: '@nextnotesapp',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Canonical URL */}
        <link rel="canonical" href="https://notes.app/" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Note App – Organize Your Notes" />
        <meta property="og:description" content="An elegant note app for capturing, editing, and organizing your thoughts." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://notes.app/" />
        <meta property="og:site_name" content="Note App" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Note App – Organize Your Notes" />
        <meta name="twitter:description" content="An elegant note app for capturing, editing, and organizing your thoughts." />
      </head>
      
      <body className="min-h-screen bg-gray-900 text-white font-sans antialiased transition-colors duration-300 focus-trap-container">
        {/* Background gradient overlay */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 -z-10" />
        
        {children}

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Note App",
            "description": "An elegant note app for capturing, editing, and organizing your thoughts.",
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

        {/* Footer */}
        <footer aria-label="Site footer">
          <h2 className="sr-only">Footer</h2>
          <p>Built with ✨ Tailwind CSS & React</p>
        </footer>
      </body>
    </html>
  )
}
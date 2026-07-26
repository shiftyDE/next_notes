import './globals.css';
import './style.css'

export const metadata = {
  title: 'Note App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-gray-900 text-white font-sans antialiased transition-colors duration-300">
        {/* Background gradient overlay */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 -z-10" />
        
        {children}
      </body>
    </html>
  );
}
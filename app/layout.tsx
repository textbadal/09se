import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Dream Homes Bihar",
  description: "House planning, Vastu design, 3D elevation & more",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />


<a
  href="https://wa.me/916205820278"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition transform hover:scale-105 animate-bounce"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="w-6 h-6"
  >
    <path d="M20.52 3.48A11.9 11.9 0 0012 0C5.37 0 .02 5.35 0 12c-.02 2.12.55 4.22 1.6 6.06L0 24l6.22-1.62A11.92 11.92 0 0012 24c6.63 0 12-5.35 12-12 0-3.2-1.25-6.2-3.48-8.52zM12 22c-1.86 0-3.64-.5-5.2-1.44l-.37-.22-3.7.97.97-3.6-.23-.38A10.08 10.08 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.54l-2.4-1.1a.5.5 0 00-.48.07l-1.13.8a8.73 8.73 0 01-4.1-4.1l.8-1.13a.5.5 0 00.07-.48l-1.1-2.4a.5.5 0 00-.48-.28h-1.67a.5.5 0 00-.5.5 7.06 7.06 0 007 7 .5.5 0 00.5-.5v-1.67a.5.5 0 00-.28-.48z"/>
  </svg>
  <span className="font-medium">Chat with us</span>
</a>



      </body>
    </html>
  );
}

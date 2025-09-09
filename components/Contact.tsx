export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
        <p className="mt-4 text-lg opacity-80">
          Have questions or want to start your dream project? Contact us today!
        </p>

        {/* Contact Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="tel:+916205820278"
            className="px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition"
          >
            📞 Call Us: +91 62058 20278
          </a>
          <a
            href="https://wa.me/916205820278"
            target="_blank"
            className="px-6 py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition"
          >
            💬 Chat on WhatsApp
          </a>
        </div>

        {/* Contact Form */}
        <div className="mt-12 max-w-2xl mx-auto text-left">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-black"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-black"
                placeholder="Your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Message</label>
              <textarea
                rows={4}
                className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-black"
                placeholder="Tell us about your project..."
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

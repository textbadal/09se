import Link from "next/link";
import { 
  Grid, Box, Spline, Droplet, Compass, Layers, ArrowRight 
} from "lucide-react";

const HOMEPAGE_SERVICES = [
  {
    id: "floor-plans",
    title: "2D Floor Plans",
    icon: Grid,
    desc: "Ergonomic interior layouts maximizing circulation and carpet area usage.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "elevation-renders",
    title: "3D Facade Elevation",
    icon: Box,
    desc: "Visualize lighting, depth, and material textures in photorealistic 4K renders.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "structural-drawings",
    title: "Structural Engineering",
    icon: Spline,
    desc: "Critical load-bearing frameworks guaranteeing structural longevity and site safety.",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=600&q=80"
  },
 {
    id: "electrical-plumbing",
    title: "Electrical & Plumbing",
    icon: Droplet,
    desc: "Precision MEP layout mapping preventing internal pipeline conflicts.",
    // Modern infrastructure engineering layout (clean wiring and pipeline coordination style)
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "vastu-plans",
    title: "Vastu Shastra Compliance",
    icon: Compass,
    desc: "Harmonizing natural elements, directional alignments, and cosmic energy flow.",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "custom-projects",
    title: "Bespoke & Custom Architecture",
    icon: Layers,
    desc: "Tailor-made structural planning built around unique project parameters.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80"
  }
];

export default function ServicesPreview() {
  return (
    <section className="bg-white text-slate-900 py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Architectural <span className="text-emerald-600">Capabilities</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base">
            Select a core pillar to review complete specifications, technical requirements, and drawing inclusions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOMEPAGE_SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Link 
                href={`/services/${service.id}`} 
                key={service.id}
                className="group relative bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden relative border-b border-slate-200">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-4 left-4 p-2.5 bg-white/90 backdrop-blur-md text-emerald-600 rounded-xl border border-slate-200/80 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                  View Full Details & Blueprints <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}

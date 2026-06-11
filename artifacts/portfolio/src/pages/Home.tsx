import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SiWhatsapp, SiInstagram } from "react-icons/si";
import { Mail, MapPin, GraduationCap, Briefcase, Sparkles } from "lucide-react";

/* ─── design tokens ─── */
const C = {
  cream: "#FAF7F2",
  beige: "#F3ECE4",
  terra: "#C68663",
  terraDark: "#A96B48",
  nude: "#D8B7A6",
  ink: "#1E1E1E",
  muted: "#6F6A66",
  border: "#E8DED5",
};

/* ─── animation helpers ─── */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger = (i: number) => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12, ease: EASE } },
});

function FadeInSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── preloader ─── */
function Preloader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const img = new Image();
    img.src = "/foto.png";
    const t = setTimeout(() => {
      if (img.complete) onComplete();
      else { img.onload = () => onComplete(); img.onerror = () => onComplete(); }
    }, 800);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: C.cream }}
    >
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.3em" }}
        animate={{ opacity: 1, letterSpacing: "0.45em" }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ fontFamily: "'Playfair Display', serif", color: C.terra, fontSize: "1.1rem", fontWeight: 500 }}
      >
        ALEJANDRA ALZATE
      </motion.p>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0, height: 1, width: "8rem", backgroundColor: C.terra, marginTop: "1rem" }}
      />
    </motion.div>
  );
}

/* ─── navbar ─── */
const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Educación", href: "#educacion" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Contacto", href: "#contacto" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
        backgroundColor: scrolled ? "rgba(250,247,242,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: C.ink, letterSpacing: "0.04em", fontWeight: 600 }}>
          AA.
        </span>
        <nav style={{ display: "flex", gap: "2.5rem" }}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} style={{ fontSize: "0.82rem", color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = C.terra)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}

/* ─── skill pill ─── */
const skills = [
  "Soporte Técnico", "Redes", "Mantenimiento de Equipos",
  "Ofimática / Excel", "Sistemas Operativos", "Atención al Usuario",
];

/* ─── main component ─── */
export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>{loading && <Preloader onComplete={() => setLoading(false)} />}</AnimatePresence>

      {!loading && (
        <div style={{ minHeight: "100vh", backgroundColor: C.cream, color: C.ink }}>
          <Navbar />

          {/* ══════════ HERO ══════════ */}
          <section id="inicio" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 72 }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 2rem", width: "100%" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>

                {/* left: text */}
                <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
                  <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.terra, marginBottom: "1.5rem", fontWeight: 500 }}>
                    Portafolio Profesional
                  </p>
                  <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 5vw, 4.5rem)", lineHeight: 1.1, fontWeight: 600, marginBottom: "1.75rem", color: C.ink }}>
                    Alejandra<br />
                    <em style={{ fontStyle: "italic", color: C.terra }}>Alzate</em>
                  </h1>
                  <p style={{ fontSize: "1rem", color: C.muted, lineHeight: 1.8, maxWidth: 420, marginBottom: "2.5rem" }}>
                    Estudiante de Media Técnica en Auxiliar de Sistemas en Compuestudio,
                    con formación en soporte técnico, redes y ofimática. Apasionada
                    por la tecnología y el aprendizaje continuo.
                  </p>

                  {/* contact row */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2.5rem" }}>
                    {[
                      { icon: <SiWhatsapp size={14} />, label: "+57 311 718 4993", href: "https://wa.me/573117184993?text=Hola%20Alejandra%2C%20me%20gustar%C3%ADa%20contactarte.", hover: "#16a34a" },
                      { icon: <SiInstagram size={14} />, label: "@maleja", href: "https://instagram.com/maleja", hover: "#e1306c" },
                      { icon: <MapPin size={14} />, label: "Colombia", href: undefined, hover: C.terra },
                    ].map(item => (
                      item.href ? (
                        <a key={item.label} href={item.href} target="_blank" rel="noreferrer"
                          style={{ display: "flex", alignItems: "center", gap: 8, padding: "0.55rem 1.1rem", borderRadius: 999, border: `1px solid ${C.border}`, backgroundColor: "white", color: C.muted, fontSize: "0.82rem", textDecoration: "none", transition: "all 0.25s" }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = item.hover; e.currentTarget.style.color = item.hover; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}>
                          {item.icon} {item.label}
                        </a>
                      ) : (
                        <span key={item.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "0.55rem 1.1rem", borderRadius: 999, border: `1px solid ${C.border}`, backgroundColor: "white", color: C.muted, fontSize: "0.82rem" }}>
                          {item.icon} {item.label}
                        </span>
                      )
                    ))}
                  </div>

                  {/* CTA */}
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <a href="#contacto"
                      style={{ display: "inline-block", padding: "0.85rem 2rem", borderRadius: 999, backgroundColor: C.terra, color: "white", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.06em", textDecoration: "none", transition: "background 0.25s, transform 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.terraDark; e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.terra; e.currentTarget.style.transform = "translateY(0)"; }}>
                      Contáctame
                    </a>
                    <a href="#educacion"
                      style={{ display: "inline-block", padding: "0.85rem 2rem", borderRadius: 999, backgroundColor: "transparent", color: C.ink, border: `1px solid ${C.border}`, fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.06em", textDecoration: "none", transition: "all 0.25s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.terra; e.currentTarget.style.color = C.terra; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.ink; }}>
                      Ver perfil
                    </a>
                  </div>
                </motion.div>

                {/* right: photo */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  style={{ position: "relative", display: "flex", justifyContent: "flex-end" }}
                >
                  {/* decorative blob */}
                  <div style={{ position: "absolute", inset: "-2rem", borderRadius: "60% 40% 50% 60% / 50% 60% 40% 50%", backgroundColor: C.beige, zIndex: 0 }} />
                  {/* small accent circle */}
                  <div style={{ position: "absolute", top: "1rem", right: "1rem", width: 80, height: 80, borderRadius: "50%", backgroundColor: C.nude, opacity: 0.5, zIndex: 0 }} />
                  <div style={{ position: "relative", zIndex: 1, width: "min(420px, 90%)", aspectRatio: "3/4", borderRadius: 32, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.10)" }}>
                    <motion.img
                      src="/foto.png"
                      alt="Alejandra Alzate"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
                    />
                  </div>
                  {/* floating badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    style={{ position: "absolute", bottom: "2rem", left: "-1.5rem", zIndex: 2, backgroundColor: "white", borderRadius: 16, padding: "1rem 1.25rem", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", border: `1px solid ${C.border}` }}
                  >
                    <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.12em", color: C.terra, marginBottom: 2 }}>Actualmente</p>
                    <p style={{ fontSize: "0.85rem", fontWeight: 600, color: C.ink }}>Practicante en Corona S.A.</p>
                  </motion.div>
                </motion.div>

              </div>
            </div>
          </section>

          {/* ══════════ HABILIDADES ══════════ */}
          <section style={{ backgroundColor: C.beige, padding: "6rem 2rem" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <FadeInSection>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "3rem" }}>
                  <Sparkles size={16} color={C.terra} />
                  <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.18em", color: C.terra, fontWeight: 500 }}>Áreas de Formación</p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                  {skills.map((s, i) => (
                    <motion.span
                      key={s}
                      variants={stagger(i)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      style={{ padding: "0.6rem 1.25rem", borderRadius: 999, backgroundColor: "white", color: C.ink, fontSize: "0.85rem", border: `1px solid ${C.border}`, fontWeight: 400, letterSpacing: "0.02em" }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </FadeInSection>
            </div>
          </section>

          {/* ══════════ EDUCACIÓN ══════════ */}
          <section id="educacion" style={{ padding: "8rem 2rem" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", alignItems: "start" }}>

                {/* label col */}
                <FadeInSection>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
                    <GraduationCap size={16} color={C.terra} />
                    <p style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.2em", color: C.terra, fontWeight: 500 }}>Educación</p>
                  </div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 2.75rem)", lineHeight: 1.2, fontWeight: 600, color: C.ink }}>
                    Formación<br /><em style={{ fontStyle: "italic", color: C.terra }}>Académica</em>
                  </h2>
                </FadeInSection>

                {/* card */}
                <FadeInSection>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    style={{ backgroundColor: C.beige, borderRadius: 28, padding: "2.5rem", border: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}
                  >
                    {/* decorative corner */}
                    <div style={{ position: "absolute", top: -32, right: -32, width: 120, height: 120, borderRadius: "50%", backgroundColor: C.nude, opacity: 0.3 }} />

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
                      <div>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.35rem", fontWeight: 600, color: C.ink, marginBottom: "0.35rem" }}>
                          Media Técnica en Auxiliar de Sistemas
                        </h3>
                        <p style={{ fontSize: "0.9rem", color: C.terra, fontWeight: 500 }}>Compuestudio</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ display: "inline-block", padding: "0.4rem 1rem", borderRadius: 999, backgroundColor: "white", color: C.terra, fontSize: "0.78rem", fontWeight: 500, border: `1px solid ${C.border}` }}>
                          Estudiante activa
                        </span>
                        <p style={{ fontSize: "0.8rem", color: C.muted, marginTop: "0.4rem" }}>2023 – Presente</p>
                      </div>
                    </div>

                    <p style={{ fontSize: "0.92rem", color: C.muted, lineHeight: 1.8 }}>
                      Formación técnica en soporte de sistemas, redes de computadores,
                      mantenimiento de equipos y software. Desarrollo de competencias en
                      instalación y configuración de sistemas operativos, ofimática avanzada
                      y atención al usuario.
                    </p>
                  </motion.div>
                </FadeInSection>

              </div>
            </div>
          </section>

          {/* ══════════ EXPERIENCIA ══════════ */}
          <section id="experiencia" style={{ backgroundColor: C.beige, padding: "8rem 2rem" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", alignItems: "start" }}>

                {/* label col */}
                <FadeInSection>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
                    <Briefcase size={16} color={C.terra} />
                    <p style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.2em", color: C.terra, fontWeight: 500 }}>Experiencia</p>
                  </div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 2.75rem)", lineHeight: 1.2, fontWeight: 600, color: C.ink }}>
                    Trayectoria<br /><em style={{ fontStyle: "italic", color: C.terra }}>Laboral</em>
                  </h2>
                </FadeInSection>

                {/* card */}
                <FadeInSection>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    style={{ backgroundColor: "white", borderRadius: 28, padding: "2.5rem", border: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}
                  >
                    <div style={{ position: "absolute", top: -32, right: -32, width: 120, height: 120, borderRadius: "50%", backgroundColor: C.beige, opacity: 0.8 }} />

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
                      <div>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.35rem", fontWeight: 600, color: C.ink, marginBottom: "0.35rem" }}>
                          Practicante de Sistemas
                        </h3>
                        <p style={{ fontSize: "0.9rem", color: C.terra, fontWeight: 500 }}>Corona S.A.</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ display: "inline-block", padding: "0.4rem 1rem", borderRadius: 999, backgroundColor: C.beige, color: C.muted, fontSize: "0.78rem", fontWeight: 500, border: `1px solid ${C.border}` }}>
                          Práctica empresarial
                        </span>
                      </div>
                    </div>

                    <p style={{ fontSize: "0.92rem", color: C.muted, lineHeight: 1.8 }}>
                      Apoyo en soporte técnico a usuarios internos, mantenimiento preventivo
                      y correctivo de equipos de cómputo, instalación de software y
                      periféricos, y gestión de incidencias tecnológicas.
                    </p>
                  </motion.div>
                </FadeInSection>

              </div>
            </div>
          </section>

          {/* ══════════ CTA CONTACTO ══════════ */}
          <section id="contacto" style={{ padding: "8rem 2rem", textAlign: "center" }}>
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
              <FadeInSection>
                <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.2em", color: C.terra, marginBottom: "1.25rem", fontWeight: 500 }}>Contacto</p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.25rem, 4vw, 3.25rem)", lineHeight: 1.15, fontWeight: 600, marginBottom: "1.5rem", color: C.ink }}>
                  ¿Hablamos?
                </h2>
                <p style={{ fontSize: "1rem", color: C.muted, lineHeight: 1.8, marginBottom: "3rem" }}>
                  Estoy disponible para oportunidades de práctica, proyectos y colaboraciones.
                  No dudes en escribirme.
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                  <a
                    href="https://wa.me/573117184993?text=Hola%20Alejandra%2C%20me%20gustar%C3%ADa%20contactarte."
                    target="_blank" rel="noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.9rem 2rem", borderRadius: 999, backgroundColor: C.terra, color: "white", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.04em", textDecoration: "none", transition: "all 0.25s" }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.terraDark; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.terra; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <SiWhatsapp size={16} /> WhatsApp
                  </a>
                  <a
                    href="https://instagram.com/maleja"
                    target="_blank" rel="noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.9rem 2rem", borderRadius: 999, backgroundColor: "transparent", color: C.ink, border: `1px solid ${C.border}`, fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.04em", textDecoration: "none", transition: "all 0.25s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.terra; e.currentTarget.style.color = C.terra; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.ink; }}
                  >
                    <SiInstagram size={16} /> Instagram
                  </a>
                </div>
              </FadeInSection>
            </div>
          </section>

          {/* ══════════ FOOTER ══════════ */}
          <footer style={{ borderTop: `1px solid ${C.border}`, padding: "2.5rem 2rem", backgroundColor: C.cream }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: C.ink, letterSpacing: "0.04em" }}>Alejandra Alzate</span>
              <div style={{ display: "flex", gap: "1.5rem" }}>
                <a href="https://wa.me/573117184993" target="_blank" rel="noreferrer" style={{ color: C.muted, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = C.terra)}
                  onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
                  <SiWhatsapp size={18} />
                </a>
                <a href="https://instagram.com/maleja" target="_blank" rel="noreferrer" style={{ color: C.muted, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = C.terra)}
                  onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
                  <SiInstagram size={18} />
                </a>
              </div>
              <p style={{ fontSize: "0.78rem", color: C.muted }}>© 2026 · Todos los derechos reservados</p>
            </div>
          </footer>

        </div>
      )}
    </>
  );
}

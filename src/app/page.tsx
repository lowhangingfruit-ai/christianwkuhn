"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const links = [
  {
    title: "Bank of Marin",
    description: "Retail Banker",
    href: "https://www.bankofmarin.com",
    icon: "🏦",
  },
  {
    title: "Noble House Spice",
    description: "Founder — Equitably sourced bulk spices",
    href: "https://noblehousespice.com",
    icon: "🌶️",
  },
  {
    title: "The Ferment Guide",
    description: "Founder — Home fermentation education",
    href: "https://www.thefermentguide.com",
    icon: "🫙",
  },
  {
    title: "Roots of Peace",
    description: "Family nonprofit — Mines to vines in war-torn lands",
    href: "https://www.rootsofpeace.org",
    icon: "🕊️",
  },
  {
    title: "BPAC San Rafael",
    description: "Bicycle & Pedestrian Advisory Committee member",
    href: "https://www.cityofsanrafael.org/bicycle-and-pedestrian-advisory-committee/",
    icon: "🚲",
  },
  {
    title: "San Rafael Porchfest",
    description: "Volunteer",
    href: "https://www.sanrafaelporchfest.com",
    icon: "🎶",
  },
];

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/kuhnmeister",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/christian-kuhn25/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:cwrkuhn@gmail.com",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

const photos = ["IMG_9565.JPG", "IMG_9581.JPG", "Tezza-4984.JPG"];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const [activePhoto, setActivePhoto] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen font-mono">
      <div className="fixed inset-0 z-0">
        <Image
          src="/background.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>
      <motion.div
        className="pointer-events-none fixed z-0 h-[600px] w-[600px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(42,157,143,0.15) 0%, transparent 70%)",
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <main className="relative z-10 mx-auto max-w-2xl px-6 py-16 sm:py-24">
        {/* Header */}
        <motion.header
          className="mb-12 flex flex-col items-center text-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.div
            className="relative mb-8 h-64 w-full overflow-hidden rounded-2xl border border-card-border sm:h-80"
            variants={fadeUp}
          >
            {photos.map((photo, i) => (
              <motion.div
                key={photo}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: activePhoto === i ? 1 : 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <Image
                  src={`/photos/${photo}`}
                  alt={`Christian W. Kuhn photo ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 672px"
                  className="object-cover"
                  priority={i === 0}
                />
              </motion.div>
            ))}
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhoto(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    activePhoto === i
                      ? "w-6 bg-white"
                      : "w-1.5 bg-white/50"
                  }`}
                  aria-label={`View photo ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>

          <motion.h1
            className="text-2xl font-bold uppercase tracking-wider text-foreground sm:text-3xl"
            variants={fadeUp}
          >
            Christian W. Kuhn
          </motion.h1>
          <motion.p
            className="mt-2 text-sm tracking-wide text-muted"
            variants={fadeUp}
          >
            San Rafael, CA
          </motion.p>

          {/* Socials */}
          <motion.div className="mt-5 flex gap-4" variants={fadeUp}>
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-muted transition-colors hover:text-accent"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.header>

        {/* Link Cards */}
        <section className="flex flex-col gap-3">
          {links.map((link, i) => (
            <motion.a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-card-border bg-card-bg px-5 py-4 transition-colors hover:border-accent hover:shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl">{link.icon}</span>
              <div className="flex-1">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                  {link.title}
                </h2>
                <p className="mt-0.5 text-xs text-muted">{link.description}</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
              >
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </motion.a>
          ))}
        </section>

        {/* Fun Facts */}
        <motion.section
          className="mt-12 rounded-2xl border border-card-border bg-card-bg p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
            A Bit More
          </h3>
          <ul className="space-y-3 text-sm text-foreground">
            {[
              "Spoke at the United Nations at age 12",
              "Family founded Roots of Peace — removing landmines and replacing them with farmland across Afghanistan, Vietnam & Guatemala",
              "Volunteers with County of Marin Parks Department",
            ].map((fact, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              >
                <span className="mt-0.5 text-accent">&#x2022;</span>
                {fact}
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* Interests */}
        <section className="mt-6 flex flex-wrap gap-2">
          {[
            "Fermentation",
            "Cooking",
            "Hiking",
            "Volunteering",
            "Community Building",
          ].map((interest, i) => (
            <motion.span
              key={interest}
              className="rounded-full border border-card-border bg-card-bg px-3 py-1 text-xs tracking-wide text-muted"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              whileHover={{ scale: 1.08, borderColor: "var(--accent)" }}
            >
              {interest}
            </motion.span>
          ))}
        </section>

        {/* Contact */}
        <motion.section
          className="mt-12 rounded-2xl border border-card-border bg-card-bg p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">
            Contact
          </h3>
          <p className="text-lg font-semibold text-foreground">
            Drop me a line
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Want to work together? If you think I can help you with your project,
            drop me an email at{" "}
            <a
              href="mailto:cwrkuhn@gmail.com"
              className="font-medium text-accent underline underline-offset-2 transition-colors hover:text-accent-hover"
            >
              cwrkuhn@gmail.com
            </a>
          </p>
        </motion.section>

        {/* Footer */}
        <motion.footer
          className="mt-16 border-t border-card-border pt-6 text-center text-xs text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          &copy; {new Date().getFullYear()} Christian W. Kuhn
        </motion.footer>
      </main>
    </div>
  );
}

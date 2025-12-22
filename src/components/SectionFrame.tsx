import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

type Props = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  children: ReactNode;
};

export function SectionFrame({ id, index, eyebrow, title, body, children }: Props) {
  return (
    <motion.section
      id={id}
      className="section-anchor mx-auto max-w-6xl px-5 py-12 md:px-10"
      initial={{ opacity: 0.32, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <div className="grid gap-8 lg:grid-cols-[0.28fr_0.72fr]">
        <div>
          <p className="display-face text-6xl text-copper/25">{index}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.35em] text-teal">{eyebrow}</p>
          <h2 className="display-face mt-4 text-4xl text-ink">{title}</h2>
          <p className="mt-5 max-w-sm text-lg leading-8 text-fog">{body}</p>
        </div>
        <div className="rounded-[2rem] border border-line/70 bg-white/80 p-6 shadow-card ink-rule md:p-8">{children}</div>
      </div>
    </motion.section>
  );
}

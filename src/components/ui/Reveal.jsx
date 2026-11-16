import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/** Fades and lifts its children into view once, when scrolled into the viewport. */
export function Reveal({ as = 'div', delay = 0, y = 28, amount = 0.2, className, children, ...rest }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

/** Staggers direct <RevealItem> children as the group enters the viewport. */
export function RevealGroup({ as = 'div', stagger = 0.08, amount = 0.15, className, children, ...rest }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

const revealItemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

export function RevealItem({ as = 'div', className, children, ...rest }) {
  const Comp = motion[as]
  return (
    <Comp className={className} variants={revealItemVariants} {...rest}>
      {children}
    </Comp>
  )
}

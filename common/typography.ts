import { FontStyle, FontStyleType } from "interfaces";

export default {
  title: {
    type: 'display',
    fontSize: 128,
    height: 112,
    spacing: -.04,
    color: 'var(--text)',
  },
  h2: {
    type: 'display',
    fontSize: 96,
    height: 96,
    spacing: -.04,
    color: 'var(--text)',
  },
  subtitle: {
    type: 'text',
    fontSize: 20,
    height: 28,
    color: 'var(--secondary)',
  },
  body: {
    type: 'text',
    fontSize: 22,
    height: 36,
    color: 'var(--secondary)',
    wrap: true,
  },
  menuSelected: {
    type: 'display',
    fontSize: 20,
    spacing: -0.04,
    height: 24,
    color: 'var(--text)',
  },
  menu: {
    type: 'text',
    fontSize: 18,
    height: 24,
    color: 'var(--secondary)',
  },
  action: {
    type: "display",
    fontSize: 16,
    height: 24,
    color: 'var(--text)'
  },
  footer: {
    type: 'text',
    fontSize: 12,
    height: 16,
    color: 'var(--secondary)',
  },
} as  Record<FontStyleType, FontStyle>;

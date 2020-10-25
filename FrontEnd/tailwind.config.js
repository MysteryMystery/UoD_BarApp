module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {},
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus"],
    scale: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    outline: ['responsive', 'focus', 'hover', 'active']
  },
  plugins: [],
}

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        // primary: "#0094C6",
        // secondary: "#005E7C",
        // light: "#CEE5F2",
        // dark: "#001242",
        // very_dark: "#040F16"
        primary: "#DC143C",
        secondary: "#37515F",
        light: "#DFF8EB",
        dark: "#220c10",
        very_dark: "#220c10"
      }
    },
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus"],
    scale: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    outline: ['responsive', 'focus', 'hover', 'active']
  },
  plugins: [],
}

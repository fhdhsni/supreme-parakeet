module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: ["../**/lib/*.tsx", "../**/lib/*.tsx"],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};

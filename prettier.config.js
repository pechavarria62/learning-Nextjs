const styleguide = require('@vercel/style-guide/prettier').default;

module.exports = {
  ...styleguide,
  plugins: [...styleguide.plugins, 'prettier-plugin-tailwindcss'],
};

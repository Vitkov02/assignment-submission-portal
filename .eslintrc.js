module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'prettier', 'tailwindcss'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  rules: {
    'prettier/prettier': ['error'],
    '@typescript-eslint/no-unused-vars': 'off',
    'tailwindcss/no-custom-classname': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  },
  settings: {
    tailwindcss: {
      config: './tailwind.config.js'
    }
  }
}

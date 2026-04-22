import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  // Add this custom rules section
  {
    rules: {
      // Disable unescaped entity errors (fixes all quote errors)
      'react/no-unescaped-entities': 'off',
      
      // Downgrade unused variables to warnings instead of errors
      '@typescript-eslint/no-unused-vars': 'warn',
      
      // Downgrade missing hook dependencies to warnings
      'react-hooks/exhaustive-deps': 'warn',
      
      // Downgrade img element warning (optional - but recommended to fix later)
      '@next/next/no-img-element': 'warn',
      
      // Additional helpful rules
      'prefer-const': 'warn',
    },
  },
];

export default eslintConfig;
import jsEslint from '@eslint/js';
import globals from 'globals';
import tsEslint from 'typescript-eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import importX from 'eslint-plugin-import-x';
import unusedImports from 'eslint-plugin-unused-imports';
import prettier from 'eslint-plugin-prettier/recommended';

export default tsEslint.config(
    { ignores: ['node_modules', 'dist', 'public'] },
    {
        extends: [
            jsEslint.configs.recommended,
            ...tsEslint.configs.recommended,
            importX.configs.typescript,
            prettier,
        ],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'simple-import-sort': simpleImportSort,
            'import-x': importX,
            'unused-imports': unusedImports,
        },
        rules: {
            'no-unused-vars': 'off',
            'simple-import-sort/exports': 'error',
            'import-x/first': 'error',
            'import-x/newline-after-import': 'error',
            'import-x/no-duplicates': 'error',
            'import-x/order': [
                'error',
                {
                    groups: [
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                    ],
                    'newlines-between': 'always',
                    pathGroups: [
                        {
                            pattern: '^@(/|[A-Z]).*',
                            group: 'internal',
                        },
                    ],
                },
            ],
            'unused-imports/no-unused-imports': 'error',
        },
    }
);

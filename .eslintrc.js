module.exports = {
    env: {
        node: true,
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        'plugin:import/recommended',
    ],
    settings: {
        react: {
            // set for eslint-plugin-react, to detect the version of React in this project
            version: 'detect',
        },
        'import/extensions': ['.ts', '.tsx', '.js', '.jsx'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            node: {
                extensions: ['.ts', '.tsx', '.js', '.jsx'],
            },
        },
    },
    rules: {
        '@typescript-eslint/class-name-casting': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        'no-restricted-syntax': 'off',
        'no-use-before-define': 'off',
        'no-unused-vars': 'off',
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'no-params-reassign': 'off',
        'no-underscore-dangle': 'off',
        'react/react-in-jsx-scope': 'off',
        'prettier/prettier': 'error',
        // @TBD add other rules here...
    },
};

# SonarK UI sandbox

###### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation & Usage

```bash
yarn install
yarn start
yarn format
yarn lint
yarn build
```

## Dependencies

Mirror `jsonar/kibana` `v7.5.2` dependencies:

##### React & Eui dependencies:
```json
"dependencies": {
    "@elastic/datemath": "5.0.2",
    "@elastic/eui": "14.8.0",
    "moment": "^2.20.1",
    "react": "^16.8.0",
    "react-dom": "^16.8.0"
}
```
```json
"devDependencies": {
  "@types/node": "^10.12.27",
  "@types/react": "^16.8.0",
  "@types/react-dom": "^16.8.0"
},
```

##### Eslint dependencies:
```json
"devDependencies": {
  "@elastic/eslint-config-kibana": "0.15.0",
  "@elastic/eslint-plugin-eui": "0.0.2",
  "@kbn/eslint-plugin-eslint": "1.0.0",
  "@typescript-eslint/eslint-plugin": "1.13.0",
  "@typescript-eslint/parser": "1.13.0",
  "eslint-config-prettier": "6.3.0",
  "eslint-plugin-babel": "^5.3.0",
  "eslint-plugin-ban": "1.3.0",
  "eslint-plugin-import": "2.18.2",
  "eslint-plugin-jest": "22.17.0",
  "eslint-plugin-mocha": "6.1.1",
  "eslint-plugin-prefer-object-spread": "1.2.1",
  "eslint-plugin-prettier": "3.1.1",
  "eslint-plugin-react": "7.13.0",
  "eslint-plugin-react-hooks": "1.6.0",
  "prettier": "1.18.2"
},
```

##### Sass dependencies:
```json
"devDependencies": {
  "node-sass": "^4.9.4"
}
```

##### Local packages
```bash
"@elastic/eslint-config-kibana": "0.15.0", --> packages/eslint-config-kibana
"@kbn/eslint-plugin-eslint": "1.0.0", --> packages/kbn-eslint-plugin-eslint
```

*Note*:
- dependencies are mirrored to exact match, `<name>@<fixed version>` or `<name>@^<version>`.
- local packages are copied from `v7.5.2`.
- current `"typescript": "3.5.3"` is not supported by any older `react-scripts` version, so we're using the future `elastic/kibana` `v7.11.1` `"typescript": "4.1.3"`.

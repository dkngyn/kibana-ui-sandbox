# SonarK UI sandbox

##### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation & Usage

```bash
yarn install
yarn start
yarn test
yarn build
```

## Changes

Mirror `jsonar/kibana` `v7.5.2` dependencies
```json
"dependencies": {
    "@elastic/datemath": "5.0.2",
    "@elastic/eui": "14.8.0",
    "react": "^16.8.0",
    "react-dom": "^16.8.0",
}

"devDependencies": {
  "@types/node": "^10.12.27",
  "@types/react": "^16.8.0",
  "@types/react-dom": "^16.8.0"
},
```

Note: can't find the `react-scripts` version of current `"typescript": "3.5.3"` to work with, so we're using the future `elastic/kibana` `v7.11.1` `"typescript": "4.1.3"`.

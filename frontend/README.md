<div align="center">
  <h1>Kinetic - React Native App</h1>
  <br />
  <p align="center">
    <a href="#-intro"><b>What is this?</b></a>
    &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
    <a href="#-getting-started"><b>Usage</b></a>
    &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
    <a href="#-docs"><b>Docs</b></a>
  </p>
  <br />
</div>

---

## 👋 Intro

This project in the [React Native](https://reactnative.dev/) application which aim to provide a modern mobile app for
physiotherapy.

---

## 🚀 Getting Started

### Setup :

Follow basic step on [React Native - environment](https://reactnative.dev/docs/environment-setup)

- Install `java JDK 1.8` and set `JAVA_HOME`
- Install android `SDK - API 10 (Q)` and set `ANDROID_HOME`
- Install node `v16.13.1`
- Install [React Native Debugger](https://github.com/jhen0409/react-native-debugger/releases) and open before running
  the app
- Install `eslint`, `prettier` and `editor config` plugins into your IDE
- Ensure your machine has
  the [React Native dependencies installed](https://facebook.github.io/react-native/docs/getting-started)

### Run up :

#### install

```bash
# Install dependencies
yarn install && ( cd ios && pod install )
```

#### Run

```bash
# Start in the iOS Simulator
npx react-native run-ios --simulator="iPhone 11"
```

```bash
# Start in the Android Simulator
#  - Note: open Android Studio > Tools > AVD > Run a device
#  - Example device specs: https://medium.com/pvtl/react-native-android-development-on-mac-ef7481f65e47#d5da
npx react-native run-android
```

---

## 📖 Docs

```bash
# Check folder
/documentation/ index.adoc
```

---

## 👣 Bibliography

- [React Native Dev](https://reactnative.dev/)

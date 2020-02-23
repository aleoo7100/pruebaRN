# pruebaRN

## Instrucciones de instalacion

Este proyecto no necesita configuraciones distintas a lo habitual cuando se clona un repositorio de app react native.

* Clonar repositorio
* ejecutar
```$ npm install ``` o ```$ yarn ```
* ejecutar ```$ npx react-native run-android ``` o ```$ react-native run-android ``` (segun version de react native instalada)

## LLaves de firmado

El archivo my-upload-key.keystore se encuentra en la ruta /android/app/ y plenamente configurado en el gradlew del proyecto

## Apk

El apk en modo release se encuentra e la reaiz del proyecto bajo el nombre app-release.apk

## Nota

Android desde su version android Pie requiere que toda comunicacion con un API o web service se realice a traves de una conección https (certificado SSL).
En vista de que el web service que se solicito consumir para este proyecto no cuenta con certificad SSL el apk en modo release negara la coneccion con dicha API, por lo que slo podra ser probada en modo debug.

# PF-202303-PENALOZA-VERGARA
Cada día, el 52,5% de la población de
Barranquilla toma vehículos de transporte público como Bus,
Buseta, Transmetro, etc... Para moverse por la ciudad, no obstante
No existe ningún método que permita a los ciudadanos saber
dónde está el vehículo que deben llevar, esto sumado al largo
tiempos de espera, la mala gestión de rutas dificulta el día a día
experiencia como tomar un autobús para ir a trabajar, una experiencia incómoda
experiencia para los usuarios. Para abordar este problema, este proyecto es el
desarrollo de un sistema multiplataforma que permita a los ciudadanos
comprobar en un mapa la posición real del vehículo que necesitan
tomar, sino que también permite a las empresas administrar y
supervisar sus vehículos, utilizando GPS y API de Google como
Google Maps (para mostrar en un mapa las posiciones), Firebase (como
base de datos) y Google Cloud (como ventana acoplable para realizar la implementación)

La aplicación estará disponible en el [enlace](https://busnav-imqcc3ojiq-uc.a.run.app/).
## Tabla de Contenidos

- [Requerimientos][def4]
- [App conductores][def2]
- [App usuarios][def]
- [Interfaz web][def3]

##  requerimientos 
#### Requerimientos previos: 
1. **Tener instalado node.JS en el computador**
2. **Cuenta de expo.dev**

    Es para poder ejecutar las apps de usuario y conductor, puede crear la cuenta en el siguiente enlace: [EXPO](https://expo.dev/)

3. **Instalar git para clonar el repositorio**

   Escoger las opciones que nos ponen por defecto en la capa gratuita y continuar con la creación de la base de datos, al crear la base de datos guardar el _**user**_ y el _**password**_

4. **Instalar git para clonar el repositorio**

   descargar _**expo GO**_ en el celular para escanaear el _**QR**_ que se genera en la ejecución de la apps móviles

##  conductores 
#### Ejecuciór de la aplicación: 
1. **Modificar la ruta**
        Para ir a la raíz del proyecto toca ejecutar la siguiente línea en la console de la carpeta dónde se haya clonado el repositorio
     ```cmd
     cd conductor/PF-conductor
    ```
2. **Instalar dependencias**

    ```cmd
     npm i
    ```

3. **Ejecución del entorno de prueba**

    ```cmd
     npm run start
    ```
## usuarios

#### Ejecuciór de la aplicación: 
1. **Modificar la ruta**
        Para ir a la raíz del proyecto toca ejecutar la siguiente línea en la console de la carpeta dónde se haya clonado el repositorio
     ```cmd
     cd usuario/PF-usuario
    ```
2. **Instalar dependencias**

    ```cmd
     npm i
    ```

3. **Ejecución del entorno de prueba**

    ```cmd
     npm run start
    ```
## web

1. **Modificar la ruta**
        Para ir a la raíz del proyecto toca ejecutar la siguiente línea en la console de la carpeta dónde se haya clonado el repositorio
     ```cmd
     cd web
    ```
2. **Instalar dependencias**

    ```cmd
     npm i
    ```

3. **Ejecución del entorno de prueba**

    ```cmd
     npm run dev
    ```
4. **Visualización del entorno**

    Para ver la aplicacición se ejecutará en el siguiente [enlace](localhost:3000)
5. **IMPORTANTE**

    Es requerido crear un archivo _*.env*_ con el siguiente contenido:
    ```cmd
    
    DB_URL="https://pf-2023-aleja-yesid-default-rtdb.firebaseio.com/"
    PORT=3000

    //API_KEY
    API_KEY= "YOUR_API_KEY",
    DOMAIN= "YOUR_DOMAIN",
    projectId= "YOUR_projectId",
    storageBucket= "YOUR_storageBucket",
    messagingSenderId= "YOUR_messagingSenderId",
    appId= "YOUR_appId",
    measurementId= "YOUR_measurementId"
    
    ```

[def]: #usuarios
[def2]: #conductores
[def3]: #web
[def4]: #requerimientos
# FrontendGestorInventario

Este proyecto esta generado con imagen de docker  [Angular CLI](https://github.com/angular/angular-cli) version 9.1.5.
 - [Angular CLI](https://github.com/angular/angular-cli) version 9.1.5.
 - [Ng Bootstrap](https://github.com/ng-bootstrap/ng-bootstrap) v4.4.1

## Instalacion del proyecto via docker

Nos dirigimos al directorio donde tenemos el proyecto y seguimos los siguientes pasos:

 - Utilizamos el siguiente comando a instalar, que nos proporcionara la instalación de las dependencias del proyecto:
    
    `docker run -u $(id -u) --rm -v "$PWD":/app trion/ng-cli:9.1.5 npm install`

 - Compilamos el codigo con el siguiente comando:
    
    `docker run -u $(id -u) --rm -v "$PWD":/app trion/ng-cli:9.1.5 ng build`

Una vez completado los pasos anteriores iniciamos el docker que contiene nuestro sistema:

Iniciando proyecto con la imagen de docker [Trion/ng-cli](https://hub.docker.com/r/trion/ng-cli/):

   `docker run -u $(id -u) --rm -p 4200:4200 -v "$PWD":/app trion/ng-cli:9.1.5 ng serve --host 0.0.0.0`

Mediante docker-compose:

 - Levantamos los contenedores

    `docker-compose -p app up -d`

 - Borramos los contenedores

    `docker-compose -p app down`

## Test E2E (end-to-end)

Imagen utilizada para test [Trion/ng-cli-e2e:9.1.5](https://hub.docker.com/r/trion/ng-cli-e2e/).

Creamos una red para los contenedores de docker:

  `docker network create front`

Iniciamos el docker para testing:

  `docker run -u $(id -u) --rm --network=front --name=miangular2 -v "$PWD":/app trion/ng-cli-e2e:6.0.7 ng serve --port 4200 --host miangular2`

Ingresar al servicio que ejecuta angular-cli y ejecutar el siguiente comando:

 - Ejemplo mi servicio es: "miangular2":

   `ng e2e --host miangular2 --port 4300`

Esto ejecutara end-to-end el testeo via [Protractor](http://www.protractortest.org/).

## Ayuda

Para mas ayuda dobre Angular CLI utilice `ng help` o ingresa a [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

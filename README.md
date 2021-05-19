# [Lexica](http://153.19.8.161/start)

Aplikacja webowa umożliwiająca tworzenie i wypełnianie krótkich i przystępnych
zadań, pomagających przy nauce języków obcych.

## Instalacja

Aplikacja wymaga serwera z odblokowanym portem `:80`,
po pobraniu repozytorium należy zainstalować następujące zależności:

- [Java](https://adoptopenjdk.net/) (wersja ≥11)
- [Maven](https://maven.apache.org/download.cgi)
- [Node.js](https://nodejs.org/en/download/)
- [AngularCLI](https://angular.io/cli/)

## Uruchomienie
Przed kompilacją backendu należy dodać plik

`backend/src/main/resources/application.properties`

Korzystając z następującego szablonu:
```properties
spring.jpa.database=POSTGRESQL
spring.datasource.platform=postgres
spring.datasource.url=jdbc:postgresql://localhost:5432/lexicadb
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.jpa.generate-ddl=true
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true
```

Maven powinien sam pobrać swoje zależności i zbudować backend, natomiast dla Node trzeba to zrobić ręcznie i  zaserwować frontend za pomocą AngularCLI.

```console
$ cd backend
$ mvn spring-boot:run
$ cd ../frontend
$ npm install && ng serve
```

## Deploy

Do wystawienia aplikacji służy załączony skrypt `./deploy.sh`

```console
$ ./deploy.sh
$ cd backend
$ mvn spring-boot:run
```

**(Uwaga)** Adres IP docelowego serwera należy skonfigurować w pliku
`frontend/src/app/lexica.properties.ts`

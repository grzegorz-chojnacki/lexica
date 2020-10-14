# Lexika

Aplikacja webowa umożliwiająca tworzenie i wypełnianie krótkich i przystępnych
zadań, pomagających przy nauce obcych języków.

## Role użytkowników:
- Gość - niezalogowany użytkownik, który może korzystać z podstawowych funkcji
  aplikacji i zapisywać postęp lokalnie.
- Prowadzący - zalogowany zarządca jednego lub więcej zespołów, posiada
  przywileje administratorskie w obrębie danego zespołu.
- Uczeń - zalogowany członek jednego lub więcej zespołów, ma dostęp do zleconych
  zadań.

## Zakres funkcjonalności:

### **Gość**:
- Panel do kreatora/edytora lokalnych zadań
- Możliwość eksportu/importu lokalnych zadań z/do pliku
- Panel postępu dla lokalnych zadań

### ***Użytkownik zalogowany***:
- *(To samo co Gość)*
- Panel wyboru zespołów
- Panel postępu dla wszystkich zadań
- Panel ustawień konta

  ### **Prowadzący**:
  - Panel główny zespołu z informacjami i skrótami
  - Panel kreatora/edytora zadań zespołu
  - Możliwość eksportu/importu zdalnych zadań z/do pliku
  - Panel aktywowania zadań
  - Panel zarządzania zespołem i jego członkami
  - Panel postępu dla całego zespołu
  - Panel postępu dla danego członka

  ### **Uczeń**:
  - Panel główny zespołu z informacjami i skrótami
  - Panel postępu w przynależnych zespołach
  - Panel aktywnych zadań

  > ***Użytkownik zalogowany*** będąc **prowadzącym** jest jednocześnie
  > **uczniem**, ale nie na odwrót.

## Wymagania funkcjonalne:
- Bezpieczne przechowywanie danych zarejestrowanych użytkowników na serwerze.
- Szybka, atomowa i bezproblemowa synchronizacja zespołów i postępów.
- Absolutne respektowanie ustawionych uprawnień różnych ról użytkowników.
- Przejrzysty i łatwy w obsłudze interfejs użytkownika, pozwalający na sprawne
  zarządzanie zadaniami, zespołami i swoim kontem.
- Podstawowy typ zadań - tłumaczenie słówek między ojczystym i obcym językiem.
- Prosty i semantyczny format zapisu zadań w plikach tekstowych.

## Technologie:

### Frontend:
- Angular

### Backend:
- PostgreSQL
- Java + Spring

---

## Dodatkowe funkcje:
- Generowanie kodu dołączającego do zespołu, który pozwoli na automatyczne
  przypisanie dużej liczby członków (za zatwierdzeniem przez prowdzącego).
- Praca samodzielna i możliwość zdalnego zapisu postępu, dzięki jednoosobowemu
  zespołowi, gdzie prowadzący jest również uczniem (specjalna opcja widniejąca
  przy tworzeniu zespołu).
- Wypełnianie luk w przygotowanych zdaniach.
- Możliwość dołączania plików graficznych jako url, lub string base64.

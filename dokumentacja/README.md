# Fazy działania
1. Podstawowy frontend
   - Skupiamy się na minimalnej zakładanej funkcjonalności UI
   - Na razie nie potrzebujemy logowania - będzie tylko przeszkadzać
   - Trzeba przygotować wszystkie komponenty
   - Każdy komponent powinien opierać się na mock-serwisach z fałszywymi danymi
   - Komponenty mają mieć wszystkie elementy, ale nie muszą dobrze wyglądać
   - Wszystkie widoki i okienka dialogowe muszą być przygotowane i podłączone
   - Kończymy w momencie w którym cała strona *zachowuje się* tak jak powinna

2. Backend
   - Trzeba wziąć fałszyme mock-serwisy i na ich podstawie przygotować API
   - Przygotować baze danych z danymi do testowania
   - Zaimplementować API i przygotować testy dla wszystkich zapytań
   - Zadbać o dobry system logowania i rejestracji
   - Zmodyfikować frontend tak, aby pobierał prawdziwe dane z serwera
   - Zintegrować backend z frontendem, tak aby serwer hostował stronę
   - Jeżeli wszystko będzie działać poprawnie to przechodzimy dalej

3. Frontend v2.0
   - **Wracamy na front** i tym razem dbamy o to by aplikacja wygląda bardzo dobrze
   - Trzeba przejść przez wszystkie komponenty od początku do końca i porównać
   - Pozamieniać ew. zwykłe sub-komponenty na komponenty material
   - Reszte podrasować scss-em
   - Należy jeszcze *pozamykać wszystkie backdoor'y* i dodać sesje z logowaniem
   - W tym momencie będziemy mieli już gotowy minimalny produkt

4. Dalszy rozwój
   - Mając gotowy już cały minimalny system, możemy zacząć dopieszczać resztę
   - Cała aplikacja powinna być w tym momencie pokryta testami,
     jeżeli nie to trzeba zadbać by była
   - Nie trzeba dzielić się na fazy frontend-backend,
     należy jednak pamiętać o tym, by wszystko działało i było zsynchronizowane
   - Generalnie proces powinien przypominać to, co było do tej pory,
     ale na mniejszą skalę - najpierw UI, a potem API


# Nazwy

| Polska           | Techniczna   |
| ---------------- | ------------ |
| Gość             | `Guest`      |
| Uczestnik        | `Member`     |
| Prowadzący       | `Leader`     |
| Użytkownik       | `User`       |
| Zespół           | `Team`       |
| Zadanie          | `Task`       |
| Fiszka prosta    | `SimpleCard` |
| Fiszka trudna    | `TypedCard`  |
| Przeciągane luki | `DraggedGap` |
| Wpisywane luki   | `TypedGap`   |
| Test wyboru      | `ChoiceTest` |
| Test wyborów     | `MultiTest`  |


# Routing

### Strony dostępne dla gościa
- **lexica.com** - Strona powitalna
- **lexica.com/local** - Strona z zadaniami lokalnymi

### Strony dostępne po zalogowaniu
- **lexica.com/account** - Strona z ustawieniami konta
- **lexica.com/workspace** - Strona główna z zespołami itd
- **lexica.com/workspace?name={Zespół}** - Widok wyszukiwania po nazwie

### Strony dostępne dla uczestników
- **lexica.com/team/{KodZespołu}** - Strona główna zespołu
- **lexica.com/team/{KodZespołu}/{Zadanie}** - Widok zadania

### Strony dostępne dla prowadzących
- **lexica.com/team/{KodZespołu}/new** - Edytor zadania


# Komponenty

## Natalia
- Informacje Użytkownika
- Dialog Ustawienia konta
  - Templatki do zmiany imienia, nazwiska, email itd

- Sidebar
  - Element listy zespołów

- Widok zadania Fiszki
- Podsumowanie zadania (Ogólny)
- Dodawanie zadania
- Edytor zadania
  - Przykład zadania

## Grzegorz
- Dialog Dodawanie zespołu (Dałączanie i tworzenie)
- Element listy uczestników
- Kontener na zespoły (Moje zespoły, Przynależne zespoły, Wyniki wyszukiwania)
- Karta zespołu (wszystkie warianty w jednym)
- Widok zespołu (Karta zespołu, postęp, lista zadań / uczestników)
- Widok zespołu lokalnego (postęp, lista zadań)

- Zadanie (Zakładki: Rozpoczynanie i Szczegóły - połączyć dwie karty w jedną)
- Opis typu zadania
- Element listy zadań
- Menu zadania

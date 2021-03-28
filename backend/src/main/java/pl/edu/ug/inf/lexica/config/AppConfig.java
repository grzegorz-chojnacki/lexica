package pl.edu.ug.inf.lexica.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import pl.edu.ug.inf.lexica.domain.*;
import pl.edu.ug.inf.lexica.repository.TaskTypeRepository;
import pl.edu.ug.inf.lexica.service.TeamService;
import pl.edu.ug.inf.lexica.service.UserService;

import java.util.*;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@Configuration
@EnableJpaRepositories("pl.edu.ug.inf.lexica.repository")
public class AppConfig {
    private final TaskType simpleCardType = new TaskType(1, "Fiszka", "Fiszka to karteczka, która zawiera słówko w języku obcym, a na odwrocie jego tłumaczenie. Służy do nauki w oparciu o prosty mechanizm pytanie-odpowiedź.");
    private final TaskType choiceTestType = new TaskType(2, "Test jednokrotnego wyboru", "Test polega na wybraniu jednej prawidłowej odpowiedzi.");
    private final TaskType multiTestType = new TaskType(3, "Test wielokrotnego wyboru", "Test polega na wybraniu wszystkich prawidłowych odpowiedzi.");
    private final UserService userService;
    private final TaskTypeRepository taskTypeRepository;
    private final TeamService teamService;

    @Autowired
    public AppConfig(UserService userService, TaskTypeRepository taskTypeRepository, TeamService teamService) {
        this.userService = userService;
        this.taskTypeRepository = taskTypeRepository;
        this.teamService = teamService;
    }

    Supplier<List<Example>> generateMultiTest = () ->
            List.of(new MultiTest("Choose native English speaking country/ies.", Set.of("USA","United Kingdom","Australia"), Set.of("Poland")),
                    new MultiTest("Co to jest jajko?", Set.of("Egg"), Set.of("Eye","Ear")),
                    new MultiTest("Co oznacza 'nail'", Set.of("Gwóźdź","Paznokieć"), Set.of("Ślimak","Uśmiech")));

   Supplier<List<Example>> generateChoiceTest = () ->
          List.of(new ChoiceTest("Pies po angielsku to:", "Dog", Set.of("Cat","Duck")),
                  new ChoiceTest("Co to jest jajko?", "Egg", Set.of("Eye")),
                  new ChoiceTest("Co oznacza 'nail'", "Jedno i drugie", Set.of("Gwóźdź","Paznokieć")));


    Supplier<List<SimpleCard>> generateCards = () -> Map.ofEntries(
            Map.entry("Jabłko", "Apple"),
            Map.entry("Banan", "Banana"),
            Map.entry("Pomarańcza", "Orange"),
            Map.entry("Mango", "Mango"),
            Map.entry("Cytryna", "Lemon")).entrySet().stream()
            .map(entry -> new SimpleCard(entry.getKey(), entry.getValue()))
            .collect(Collectors.toList());

    Supplier<List<Example>> generateCards1 = () -> Map.ofEntries(
            Map.entry("liczba", "number"),
            Map.entry("cyfra", "digit"),
            Map.entry("liczba pierwsza", "prime number"),
            Map.entry("liczba dodatnia", "positive number"),
            Map.entry("liczba ujemna", "negative number"),
            Map.entry("liczba parzysta", "even number"),
            Map.entry("liczba nieparzysta", "odd number"),
            Map.entry("liczba całkowita", "integer"),
            Map.entry("liczba naturalna", "natural number"),
            Map.entry("liczba rzeczywista", "real number"),
            Map.entry("liczba wymierna", "rational number"),
            Map.entry("liczba porządkowa", "ordinal number"),
            Map.entry("liczba niewymierna", "irrational number")).entrySet().stream()
            .map(entry -> new SimpleCard(entry.getKey(), entry.getValue()))
            .collect(Collectors.toList());

    Supplier<List<Example>> generateCards2 = () -> Map.ofEntries(
            Map.entry("wąskie gardło", "bottleneck"),
            Map.entry("przeglądarka", "browser"),
            Map.entry("znaczna część", "chunk"),
            Map.entry("uszkodzenie obwodu", "circuit failure"),
            Map.entry("obudowywanie danych", "data encapsulation"),
            Map.entry("miejsce docelowe", "destination"),
            Map.entry("wpis", "entry"),
            Map.entry("czynnik", "factor"),
            Map.entry("lista wyników wyszukiwania", "hit list"),
            Map.entry("wyszukiwanie indeksowe", "indexed search"),
            Map.entry("słowo kluczowe", "key word")).entrySet().stream()
            .map(entry -> new SimpleCard(entry.getKey(), entry.getValue()))
            .collect(Collectors.toList());


    List<Task> testTasks = new ArrayList<>();

    Supplier<List<Task>> generateTasks1 = () -> List.of(
            List.of("Fruit", "Naucz się podstawowych słówek z kategorii owoce."),
            List.of("House", ""),
            List.of("Music", "Bardzo przyswajalny temat :)."),
            List.of("Numbers_0", "Basic words."),
            List.of("Zadanie nieambitne", ""),
            List.of("The Internet and WWW",
                    "Zadanie z trochę trudniejszymi przykładami. Poszerza  bardziej szczegółową wiedzę z zakresu świata informatycznego.")).stream()
            .map(list -> new Task(list.get(0),generateCards1.get(), list.get(1),simpleCardType))
            .peek(task -> testTasks.add(task))
            .collect(Collectors.toList());

    Supplier<List<Task>> generateTasks2 = () -> List.of(
            List.of("Fruit", "Naucz się podstawowych słówek z kategorii owoce."),
            List.of("The Internet and WWW",
                    "Zadanie z trochę trudniejszymi przykładami. Poszerza  bardziej szczegółową wiedzę z zakresu świata informatycznego.")).stream()
            .map(list -> new Task(list.get(0),generateCards2.get(), list.get(1), simpleCardType))
            .peek(task -> testTasks.add(task))
            .collect(Collectors.toList());

    Supplier<List<Task>> generateTasks3 = () -> List.of(
            List.of("Seasons", "Naucz się pór roku."),
            List.of("Inne",
                    "Zadanie z trochę trudniejszymi przykładami. Przetestuj swoją wiedzę.")).stream()
            .map(list -> new Task(list.get(0),generateChoiceTest.get(), list.get(1), choiceTestType))
            .peek(task -> testTasks.add(task))
            .collect(Collectors.toList());

    Supplier<List<Task>> generateTasks4 = () -> List.of(
            List.of("Różne", "Naucz się pór roku."),
            List.of("Inne",
                    "Zadanie z trochę trudniejszymi przykładami. Przetestuj swoją wiedzę.")).stream()
            .map(list -> new Task(list.get(0),generateMultiTest.get(), list.get(1), multiTestType))
            .peek(task -> testTasks.add(task))
            .collect(Collectors.toList());


    private Set<Progress> generateProgress(List<Task> tasks) {
        return tasks.stream()
                .map(task -> new Progress(task, new Random().nextInt(101)))
                .collect(Collectors.toSet());
    }
    List<User> testUsers = List.of(
            new User("Jan", "Kowalski", "jkowalski", "opBUs", "#D2326A"),
            new User("Anna", "Nowak", "anowak", "jxodRBo", "#8FBE8D"),
            new User("Fryderyk", "Bastow", "fbastow", "Kv474Uw", "#946E83"),
            new User("Henryk", "Felten", "hfelten", "QF416Kb", "#767EB9"),
            new User("Franciszek", "Sabkowski", "fsabkowski", "c5IDuMrp2GO0AQw", "#886778"),
            new User("Edyta", "Kamińska", "ekaminska", "tcOCnWgAFrpzrg", "#7B5F6C"),
            new User("Waldemar", "Olejnik", "wolejnik", "Q5wzLBetyjNy", "#615055"),
            new User("Oskar", "Chomicki", "ochomicki", "OPUgvEv0cFkr", "#5D6FA2"),
            new User("Damgmara", "Fryc", "dfryc", "JYtQnNdtNJBaR", "#588DEE"),
            new User("Patrycja", "Gajda", "pgajda", "WyAq1CjwM", "#9F865C"));

    List<Team> testTeams1 = List.of(
            new Team("MusicLovers", testUsers.get(0), "Grupa, w której ceni się angielską muzykę.", "#96BDC6"),
            new Team("Angielski UG 2020 gr.2", testUsers.get(1), "Studenci drugiego roku filologii angielskiej.", "#395E66"),
            new Team("TeamUG2008", testUsers.get(2), "Witamy osoby z rocznika 2008!", "#CFB9A5"),
            new Team("Deutsche Gruppe 5", testUsers.get(3), "Ich lade Schüler der dritten Klasse ein.", "#E8CCBF"));

    List<Team> testTeams2 = List.of(
            new Team("angielski gr.1", testUsers.get(5), "", "#846267"),
            new Team("niemiecki gr.1a", testUsers.get(6), "Przygotowania do matury z j. niemieckigo.", "#133C55"));

    List<Team> testTeams3 = List.of(
            new Team("TDW", testUsers.get(4), "", "#723D46"));

    Set<User> testUserGroup(User leader) {
        return testUsers.stream()
                .filter(user -> user.getId() != leader.getId())
                .collect(Collectors.toSet());
    }

    public void initDataBase() {
        taskTypeRepository.save(simpleCardType);
        taskTypeRepository.save(choiceTestType);
        taskTypeRepository.save(multiTestType);
        userService.registerAll(testUsers);

        initTeams(testTeams1, generateTasks1);
        initTeams(testTeams2, generateTasks3);
        initTeams(testTeams3, generateTasks4);

        testUsers.forEach(user -> user.setProgress(generateProgress(testTasks)));
        userService.addAll(testUsers);
    }

    private void initTeams(List<Team> teams, Supplier<List<Task>> taskSupplier) {
        teams.stream().peek(team -> {
            team.setTasks(taskSupplier.get());
            team.setMembers(new HashSet<>(testUsers));
        }).forEach(teamService::add);
    }
}

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
    private final UserService userService;
    private final TaskTypeRepository taskTypeRepository;
    private final TeamService teamService;

    @Autowired
    public AppConfig(UserService userService, TaskTypeRepository taskTypeRepository, TeamService teamService) {
        this.userService = userService;
        this.taskTypeRepository = taskTypeRepository;
        this.teamService = teamService;
    }


    Supplier<List<SimpleCard>> generateCards = () -> Map.ofEntries(
            Map.entry("Jabłko", "Apple"),
            Map.entry("Banan", "Banana"),
            Map.entry("Pomarańcza", "Orange"),
            Map.entry("Mango", "Mango"),
            Map.entry("Cytryna", "Lemon")).entrySet().stream()
            .map(entry -> new SimpleCard(entry.getKey(), entry.getValue()))
            .collect(Collectors.toList());

    Supplier<List<SimpleCard>> generateCards1 = () -> Map.ofEntries(
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

    Supplier<List<SimpleCard>> generateCards2 = () -> Map.ofEntries(
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

    Supplier<List<Task>> generateTasks = () -> List.of(
            List.of("Fruit", "Naucz się podstawowych słówek z kategorii owoce."),
            List.of("House", ""),
            List.of("Music", "Bardzo przyswajalny temat :)."),
            List.of("Numbers_0", "Basic words."),
            List.of("Zadanie nieambitne", ""),
            List.of("The Internet and WWW",
                    "Zadanie z trochę trudniejszymi przykładami. Poszerza  bardziej szczegółową wiedzę z zakresu świata informatycznego.")).stream()
            .map(list -> new Task(list.get(0),generateCards1.get()  , true, list.get(1), simpleCardType))
            .peek(task -> task.setActive(!task.getName().equals("Zadanie nieaktywne")))
            .peek(task -> testTasks.add(task))
            .collect(Collectors.toList());

    Supplier<List<Task>> generateTasks2 = () -> List.of(
            List.of("Fruit", "Naucz się podstawowych słówek z kategorii owoce."),
            List.of("The Internet and WWW",
                    "Zadanie z trochę trudniejszymi przykładami. Poszerza  bardziej szczegółową wiedzę z zakresu świata informatycznego.")).stream()
            .map(list -> new Task(list.get(0),generateCards2.get()  , true, list.get(1), simpleCardType))
            .peek(task -> task.setActive(!task.getName().equals("Zadanie nieaktywne")))
            .peek(task -> testTasks.add(task))
            .collect(Collectors.toList());



    private Set<Progress> generateProgress(List<Task> tasks) {
        return tasks.stream()
                .map(task -> new Progress(task, new Random().nextInt(101)))
                .collect(Collectors.toSet());
    }
    List<User> testUsers = List.of(
            new User("Jan", "Kowalski", "jkowalski@example.com", "opBUs", "#D2326A"),
            new User("Anna", "Nowak", "anowak@example.com", "jxodRBo", "#8FBE8D"),
            new User("Fryderyk", "Bastow", "fbastow@example.com", "Kv474Uw", "#946E83"),
            new User("Henryk", "Felten", "hfelten@example.com", "QF416Kb", "#767EB9"),
            new User("Franciszek", "Sabkowski", "fsabkowski@example.com", "c5IDuMrp2GO0AQw", "#886778"),
            new User("Edyta", "Kamińska", "ekaminska@example.com", "tcOCnWgAFrpzrg", "#7B5F6C"),
            new User("Waldemar", "Olejnik", "wolejnik@example.com", "Q5wzLBetyjNy", "#615055"),
            new User("Oskar", "Chomicki", "ochomicki@example.com", "OPUgvEv0cFkr", "#5D6FA2"),
            new User("Damgmara", "Fryc", "dfryc@example.com", "JYtQnNdtNJBaR", "#588DEE"),
            new User("Patrycja", "Gajda", "pgajda@example.com", "WyAq1CjwM", "#9F865C"));

    List<Team> testTeams = List.of(
            new Team("MusicLovers", testUsers.get(0), "Grupa, w której ceni się angielską muzykę.", "#96BDC6"),
            new Team("Angielski UG 2020 gr.2", testUsers.get(1), "Studenci drugiego roku filologii angielskiej.", "#395E66"),
            new Team("TeamUG2008", testUsers.get(2), "Witamy osoby z rocznika 2008!", "#CFB9A5"),
            new Team("Deutsche Gruppe 5", testUsers.get(3), "Ich lade Schüler der dritten Klasse ein.", "#E8CCBF"));

    List<Team> testTeams2 = List.of(
            new Team("angielski gr.1", testUsers.get(5), "", "#846267"),
            new Team("niemiecki gr.1a", testUsers.get(6), "Przygotowania do matury z j. niemieckigo.", "#133C55"),
            new Team("TDW", testUsers.get(4), "", "#723D46"));

    Set<User> testUserGroup(User leader) {
        return testUsers.stream()
                .filter(user -> user.getId() != leader.getId())
                .collect(Collectors.toSet());
    }

    public void initDataBase() {
        taskTypeRepository.save(simpleCardType);
        userService.registerAll(testUsers);

        setTasks(testTeams, generateTasks);
        setTasks(testTeams2, generateTasks2);

        testUsers.forEach(user -> user.setProgress(generateProgress(testTasks)));
        userService.addAll(testUsers);
    }

    private void setTasks(List<Team> testTeams2, Supplier<List<Task>> generateTasks2) {
        testTeams2.stream().peek(team -> {
            team.setTasks(generateTasks2.get());
            userService.get(team.getLeader().getId()).ifPresent(leader -> {
                Set<User> members = testUserGroup(leader);
                team.setMembers(members);
            });
        }).forEach(teamService::add);
    }
}

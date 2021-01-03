package pl.edu.ug.inf.lexica.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import pl.edu.ug.inf.lexica.domain.*;
import pl.edu.ug.inf.lexica.service.TaskTypeService;
import pl.edu.ug.inf.lexica.service.TeamService;
import pl.edu.ug.inf.lexica.service.UserService;

import java.util.*;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@Configuration
@EnableJpaRepositories("pl.edu.ug.inf.lexica.repository")
public class AppConfig {
    private final TaskType simpleCardType = new TaskType("Fiszka", "Opis fiszki");
    private final UserService userService;
    private final TaskTypeService taskTypeService;
    private final TeamService teamService;

    @Autowired
    public AppConfig(UserService userService, TaskTypeService taskTypeService, TeamService teamService) {
        this.userService = userService;
        this.taskTypeService = taskTypeService;
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

    List<Task> testTasks = new ArrayList<>();

    Supplier<List<Task>> generateTasks = () -> List.of(
            List.of("Zadanie z fiszkami", "Opis zadania z fiszkami"),
            List.of("Zadanie bez opisu", "Opis zadania bez opisu"),
            List.of("Następne zadanie z fiszkami", "Opis następnego zadania z fiszkami"),
            List.of("Zadanie z kolejną porcją fiszk", "Opis zadania z kolejną porcją fiszek"),
            List.of("Zadanie nieaktywne", "Opis zadania nieaktywnego"),
            List.of("Zadanie z trochę dłuższym opisem",
                    "Opis Zadanie z trochę dłuższym opisem, który się ciągnie i ciągnie i ciągnie bez końca")).stream()
            .map(list -> new Task(list.get(0), generateCards.get(), true, list.get(1), simpleCardType))
            .peek(task -> task.setActive(!task.getName().equals("Zadanie nieaktywne")))
            .peek(task -> testTasks.add(task))
            .collect(Collectors.toList());

     private Set<Progress> generateProgress(List<Task> tasks) {
        return tasks.stream()
                .map(task -> new Progress(task, new Random().nextInt(101)))
                .collect(Collectors.toSet());
    }

    List<User> testUsers = List.of(
            new User("Lyn", "Tommaseo", "ltommaseo@example.com", "opBUs"),
            new User("Amie", "Acomb", "aacomb@example.com", "jxodRBo"),
            new User("Frederich", "Bastow", "fbastow@example.com", "Kv474Uw"),
            new User("Hilde", "Felten", "hfelten@example.com", "QF416Kb"),
            new User("Fraser", "Spaule", "fspaule@example.com", "c5IDuMrp2GO0AQw"),
            new User("Erna", "Yokley", "eyokley@example.com", "tcOCnWgAFrpzrg"),
            new User("Walt", "Verrick", "wverrick@example.com", "Q5wzLBetyjNy"),
            new User("Ossie", "Capoun", "ocapoun@example.com", "OPUgvEv0cFkr"),
            new User("Damita", "Fransinelli", "dfransinelli@example.com", "JYtQnNdtNJBaR"),
            new User("Peggie", "Gerrelt", "pgerrelt@example.com", "WyAq1CjwM"));

    List<Team> testTeams = List.of(
            new Team("Khaki", testUsers.get(0), "Milt op involving oth dest arcrft, civilian, sequela"),
            new Team("Aquamarine", testUsers.get(1), "Contracture, unspecified hip"),
            new Team("Fuscia", testUsers.get(2), "Smith\"s fx r radius, subs for opn fx type I/2 w nonunion"),
            new Team("Orange", testUsers.get(3), "Stress fracture, right femur, initial encounter for fracture"),
            new Team("Aquamarine", testUsers.get(5), "Left sided colitis"),
            new Team("Crimson", testUsers.get(6), "Pulsating exophthalmos, left eye"),
            new Team("Mauv", testUsers.get(4), ""));

    Set<User> testUserGroup(User leader) {
        return testUsers.stream()
                .filter(user -> user.getId() != leader.getId())
                .collect(Collectors.toSet());
    }

    public void initDataBase() {
        taskTypeService.add(simpleCardType);
        userService.addAll(testUsers);
        testTeams.stream().peek(team -> {
                team.setTasks(generateTasks.get());
                userService.get(team.getLeader().getId()).ifPresent(leader -> {
                    Set<User> members = testUserGroup(leader);
                    team.setMembers(members);
                });
            }).forEach(teamService::add);

        testUsers.forEach(user -> user.setProgress(generateProgress(testTasks)));
        userService.addAll(testUsers);
    }
}

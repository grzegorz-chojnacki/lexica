package pl.edu.ug.inf.lexica.config;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import pl.edu.ug.inf.lexica.domain.*;

import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.Callable;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@Configuration
@EnableJpaRepositories("pl.edu.ug.inf.lexica.repository")
public class AppConfig {
    private final TaskType simpleCardType = new TaskType("Fiszka", "Opis fiszki");

    Supplier<List<SimpleCard>> generateCards = () -> Map.ofEntries(
            Map.entry("Jabłko", "Apple"),
            Map.entry("Banan", "Banana"),
            Map.entry("Pomarańcza", "Orange"),
            Map.entry("Mango", "Mango"),
            Map.entry("Cytryna", "Lemon")).entrySet().stream()
            .map(entry -> new SimpleCard(entry.getKey(), entry.getValue()))
            .collect(Collectors.toList());

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
            .collect(Collectors.toList());

    Function<List<Task>, List<Progress>> generateProgress = (tasks) -> tasks.stream()
            .map(task -> new Progress(task, new Random().nextInt(task.getExamples().size() + 1)))
            .collect(Collectors.toList());

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

    private List<User> testUserGroup(User leader) {
        return testUsers.stream()
                .filter(user -> user != leader)
                .collect(Collectors.toList());
    }

    List<Team> testTeams = List.of(
            new Team("Khaki", testUsers.get(0), "Milt op involving oth dest arcrft, civilian, sequela"),
            new Team("Aquamarine", testUsers.get(1), "Contracture, unspecified hip"),
            new Team("Fuscia", testUsers.get(2), "Smith\"s fx r radius, subs for opn fx type I/2 w nonunion"),
            new Team("Orange", testUsers.get(3), "Stress fracture, right femur, initial encounter for fracture"),
            new Team("Aquamarine", testUsers.get(5), "Left sided colitis"),
            new Team("Crimson", testUsers.get(6), "Pulsating exophthalmos, left eye"),
            new Team("Mauv", testUsers.get(4), "")).stream()
            .peek(team -> {
                User leader = team.getLeader();
                List<Task> tasks = generateTasks.get();
                team.setMembers(testUserGroup(leader));
                team.setTasks(tasks);
                // team.getMembers().forEach(member -> member.getProgress().addAll(generateProgress.apply(tasks)));
            }).collect(Collectors.toList());

    @Bean
    @Qualifier("taskTypes")
    public TaskType createTypeTasks() { return simpleCardType; }

    @Bean
    @Qualifier("teams")
    public List<Team> createTeams() { return testTeams; }

    @Bean
    @Qualifier("users")
    public List<User> createUsers() { return testUsers; }

    @Bean
    @Qualifier("tasks")
    public List<Task> createTasks() {
        return testTeams.stream()
            .map(Team::getTasks)
            .flatMap(List::stream)
            .collect(Collectors.toList());
    }

    @Bean
    @Qualifier("progressSetup")
    public Function<List<Team>, List<Team>> setupProgress() {
        return (teams) -> teams.stream()
                .peek(team -> {
                    Hibernate.initialize(team);
                    team.getMembers()
                            .forEach(member -> member.getProgress().addAll(generateProgress.apply(team.getTasks())));
                })
                .collect(Collectors.toList());
    }
}

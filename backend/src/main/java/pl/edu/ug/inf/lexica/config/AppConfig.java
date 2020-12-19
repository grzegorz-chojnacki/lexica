package pl.edu.ug.inf.lexica.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import pl.edu.ug.inf.lexica.domain.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Configuration
@EnableJpaRepositories("pl.edu.ug.inf.lexica.repository")
public class AppConfig {
    private final TaskType simpleCardType = new TaskType(1, "Fiszka", "Opis fiszki");

    List<SimpleCard> testCards = List.of(
            new SimpleCard(1, "Jabłko", "Apple"),
            new SimpleCard(2, "Banan", "Banana"),
            new SimpleCard(3, "Pomarańcza", "Orange"),
            new SimpleCard(4, "Mango", "Mango"),
            new SimpleCard(5, "Cytryna", "Lemon")
    );

    List<Task> testTasks = List.of(
            new Task(1, "Zadanie z fiszkami 1", testCards, true, "Opis zadania z fiszkami 1", simpleCardType),
            new Task(2, "Zadanie bez opisu", testCards, true, "", simpleCardType),
            new Task(3, "Zadanie z fiszkami 2", testCards, true, "Jakieś następne zadanie", simpleCardType),
            new Task(4, "Zadanie z fiszkami 3", testCards, true, "Opis zadania z bardzo długim opisiem, który najprawdopodobniej powinien zostać ograniczony", simpleCardType),
            new Task(5, "Zadanie nieaktywne", testCards, false, "Opis zadania nieaktywnego", simpleCardType),
            new Task(6, "Zadanie z trochę dłuższym tytułem",testCards, true, "Opis zadania z dłuższym tytułem", simpleCardType)
    );

    List<Progress> testProgress1 = List.of(
            new Progress(1, testTasks.get(0), 0),
            new Progress(2, testTasks.get(1), 30),
            new Progress(3, testTasks.get(2), 34),
            new Progress(4, testTasks.get(3), 56),
            new Progress(5, testTasks.get(4), 28),
            new Progress(6, testTasks.get(5), 45)
    );

    List<Progress> testProgress2 = List.of(
            new Progress(7, testTasks.get(0), 53),
            new Progress(8, testTasks.get(1), 13),
            new Progress(9, testTasks.get(2), 23),
            new Progress(10, testTasks.get(3), 49),
            new Progress(11, testTasks.get(4), 19),
            new Progress(12, testTasks.get(5), 20)
    );

    List<User> testUsers = List.of(
            new User(1, "Lyn", "Tommaseo", "ltommaseo@example.com", "opBUs", testProgress1),
            new User(2, "Amie", "Acomb", "aacomb@example.com", "jxodRBo", testProgress2),
            new User(3, "Frederich", "Bastow", "fbastow@example.com", "Kv474Uw", testProgress1),
            new User(4, "Hilde", "Felten", "hfelten@example.com", "QF416Kb", testProgress2),
            new User(5, "Fraser", "Spaule", "fspaule@example.com", "c5IDuMrp2GO0AQw", testProgress1),
            new User(6, "Erna", "Yokley", "eyokley@example.com", "tcOCnWgAFrpzrg", testProgress1),
            new User(7, "Walt", "Verrick", "wverrick@example.com", "Q5wzLBetyjNy", testProgress2),
            new User(8, "Ossie", "Capoun", "ocapoun@example.com", "OPUgvEv0cFkr", testProgress1),
            new User(9, "Damita", "Fransinelli", "dfransinelli@example.com", "JYtQnNdtNJBaR", testProgress2),
            new User(10, "Peggie", "Gerrelt", "pgerrelt@example.com", "WyAq1CjwM", testProgress2)
    );

    private List<User> testUserGroup(User leader) {
        return testUsers.stream()
                .filter(user -> user != leader)
                .collect(Collectors.toList());
    }

    List<Team> testTeams = List.of(
            new Team(1, "Khaki", testUsers.get(0), testUserGroup(testUsers.get(0)), testTasks, "Milt op involving oth dest arcrft, civilian, sequela"),
            new Team(2, "Aquamarine", testUsers.get(1), testUserGroup(testUsers.get(1)), testTasks, "Contracture, unspecified hip"),
            new Team(3, "Fuscia", testUsers.get(2), testUserGroup(testUsers.get(2)), testTasks, "Smith\"s fx r radius, subs for opn fx type I/2 w nonunion"),
            new Team(4, "Orange", testUsers.get(3), testUserGroup(testUsers.get(3)), testTasks, "Stress fracture, right femur, initial encounter for fracture"),
            new Team(5, "Aquamarine", testUsers.get(5), testUserGroup(testUsers.get(5)), testTasks, "Left sided colitis"),
            new Team(6, "Crimson", testUsers.get(6), testUserGroup(testUsers.get(6)), testTasks, "Pulsating exophthalmos, left eye"),
            new Team(7, "Mauv", testUsers.get(4), testUserGroup(testUsers.get(4)), testTasks, "")
    );

    @Bean
    @Qualifier("taskTypes")
    public TaskType createTypeTasks() { return simpleCardType; }

    @Bean
    @Qualifier("simpleCards")
    public List<SimpleCard> createSimpleCard() { return testCards; }

    @Bean
    @Qualifier("tasks")
    public List<Task> createTasks() { return testTasks; }

    @Bean
    @Qualifier("teams")
    public List<Team> createTeams() { return testTeams; }

    @Bean
    @Qualifier("users")
    public List<User> createUsers() { return testUsers; }

    @Bean
    @Qualifier("progress")
    public List<Progress> createProgress() {
        return Stream.concat(testProgress1.stream(), testProgress2.stream())
                .collect(Collectors.toList());
    }
}

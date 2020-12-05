package pl.edu.ug.inf.lexica.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.edu.ug.inf.lexica.domain.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Configuration
public class AppConfig {
    List<SimpleCard> testCards = List.of(
            new SimpleCard("Jabłko", "Apple"),
            new SimpleCard("Banan", "Banana"),
            new SimpleCard("Pomarańcza", "Orange"),
            new SimpleCard("Mango", "Mango")
    );

    List<Task<SimpleCard>> testTasks = List.of(
            new Task<>("Zadanie z fiszkami 1",
                    testCards, true, "Opis zadania z fiszkami 1",
                    SimpleCard.type),
            new Task<>("Zadanie bez opisu",
                    testCards, true, "",
                    SimpleCard.type),
            new Task<>("Zadanie z fiszkami 2",
                    testCards, true, "Jakieś następne zadanie",
                    SimpleCard.type),
            new Task<>("Zadanie z fiszkami 3", testCards, true,
                    "Opis zadania z bardzo długim opisiem, który najprawdopodobniej powinien zostać ograniczony",
                    SimpleCard.type),
            new Task<>("Zadanie nieaktywne", testCards, false,
                    "Opis zadania nieaktywnego",
                    SimpleCard.type),
            new Task<>("Zadanie z trochę dłuższym tytułem",
                    testCards, true, "Opis zadania z dłuższym tytułem",
                    SimpleCard.type)
    );

    List<Progress<SimpleCard>> testProgress1 = List.of(
            new Progress<>(testTasks.get(0), 0),
            new Progress<>(testTasks.get(1), 30),
            new Progress<>(testTasks.get(2), 34),
            new Progress<>(testTasks.get(3), 56),
            new Progress<>(testTasks.get(4), 28)
    );

    List<Progress<SimpleCard>> testProgress2 = List.of(
            new Progress<>(testTasks.get(0), 53),
            new Progress<>(testTasks.get(1), 13),
            new Progress<>(testTasks.get(2), 23),
            new Progress<>(testTasks.get(3), 49),
            new Progress<>(testTasks.get(4), 19)
    );

    List<User> testUsers = List.of(
            new User("Lyn", "Tommaseo", "ltommaseo@example.com", "opBUs", testProgress1),
            new User("Amie", "Acomb", "aacomb@example.com", "jxodRBo", testProgress2),
            new User("Frederich", "Bastow", "fbastow@example.com", "Kv474Uw", testProgress1),
            new User("Hilde", "Felten", "hfelten@example.com", "QF416Kb", testProgress2),
            new User("Fraser", "Spaule", "fspaule@example.com", "c5IDuMrp2GO0AQw", testProgress1),
            new User("Erna", "Yokley", "eyokley@example.com", "tcOCnWgAFrpzrg", testProgress1),
            new User("Walt", "Verrick", "wverrick@example.com", "Q5wzLBetyjNy", testProgress2),
            new User("Ossie", "Capoun", "ocapoun@example.com", "OPUgvEv0cFkr", testProgress1),
            new User("Damita", "Fransinelli", "dfransinelli@example.com", "JYtQnNdtNJBaR", testProgress2),
            new User("Peggie", "Gerrelt", "pgerrelt@example.com", "WyAq1CjwM", testProgress2)
    );

    private List<User> testUserGroup(User leader) {
        return testUsers.stream()
                .filter(user -> user != leader)
                .collect(Collectors.toList());
    }

    List<Team> testTeams = List.of(
            new Team("haki",
                    testUsers.get(0), testUserGroup(testUsers.get(0)), testTasks,
                    "Milt op involving oth dest arcrft, civilian, sequela"),
            new Team("Aquamarine",
                    testUsers.get(1), testUserGroup(testUsers.get(1)), testTasks,
                    "Contracture, unspecified hip"),
            new Team("Fuscia",
                    testUsers.get(2), testUserGroup(testUsers.get(2)), testTasks,
                    "Smith\"s fx r radius, subs for opn fx type I/2 w nonunion"),
            new Team("Orange",
                    testUsers.get(3), testUserGroup(testUsers.get(3)), testTasks,
                    "Stress fracture, right femur, initial encounter for fracture"),
            new Team("Aquamarine",
                    testUsers.get(5), testUserGroup(testUsers.get(5)), testTasks,
                    "Left sided colitis"),
            new Team("Crimson",
                    testUsers.get(6), testUserGroup(testUsers.get(6)), testTasks,
                    "Pulsating exophthalmos, left eye"),
            new Team("Mauv",
                    testUsers.get(4), testUserGroup(testUsers.get(4)), testTasks,
                    ""
            )
    );

    @Bean
    @Qualifier("tasks")
    public List<Task<SimpleCard>> createTasks() { return testTasks; }

    @Bean
    @Qualifier("teams")
    public List<Team> createTeams() { return testTeams; }

    @Bean
    @Qualifier("users")
    public List<User> createUsers() { return testUsers; }

    @Bean
    @Qualifier("progresses")
    public List<Progress<SimpleCard>> createProgresses() {
        return Stream.concat(testProgress1.stream(), testProgress2.stream())
                .collect(Collectors.toList());
    }
}

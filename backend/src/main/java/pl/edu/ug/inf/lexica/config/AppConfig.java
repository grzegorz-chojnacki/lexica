package pl.edu.ug.inf.lexica.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.edu.ug.inf.lexica.domain.SimpleCard;
import pl.edu.ug.inf.lexica.domain.Task;

import java.util.List;

@Configuration
public class AppConfig {
    List<SimpleCard> testCards = List.of(
            new SimpleCard("Jabłko", "Apple"),
            new SimpleCard("Banan", "Banana"),
            new SimpleCard("Pomarańcza", "Orange"),
            new SimpleCard("Mango", "Mango")
    );

    @Bean
    @Qualifier("tasks")
    public List<Task<SimpleCard>> createTask() {
      return  List.of(new Task("Zadanie z fiszkami 1",
                        testCards, true, "Opis zadania z fiszkami 1"),
                new Task("Zadanie bez opisu",
                        testCards, true, ""),
                new Task("Zadanie z fiszkami 2",
                        testCards, true, "Jakieś następne zadanie"),
                new Task("Zadanie z fiszkami 3", testCards, true,
                        "Opis zadania z bardzo długim opisiem, który najprawdopodobniej powinien zostać ograniczony"),
                new Task("Zadanie nieaktywne", testCards, false,
                        "Opis zadania nieaktywnego"),
                new Task("Zadanie z trochę dłuższym tytułem",
                        testCards, true, "Opis zadania z dłuższym tytułem")
        );
    }
}

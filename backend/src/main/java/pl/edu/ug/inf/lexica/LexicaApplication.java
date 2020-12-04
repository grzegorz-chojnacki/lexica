package pl.edu.ug.inf.lexica;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import pl.edu.ug.inf.lexica.domain.SimpleCard;
import pl.edu.ug.inf.lexica.domain.Task;
import pl.edu.ug.inf.lexica.service.EntityService;
import pl.edu.ug.inf.lexica.service.TaskInMemory;

import java.util.List;

@SpringBootApplication
public class LexicaApplication {

	@Autowired
	static EntityService<Task<SimpleCard>> taskService;
	TaskInMemory tim;
	public static void main(String[] args) {

		//ApplicationContext annotationApplicationContext = new AnnotationConfigApplicationContext(LexicaApplication.class);
		//TaskInMemory tim = annotationApplicationContext.getBeansOfType(TaskInMemory.class);
		//EntityService<Task<SimpleCard>> taskService = annotationApplicationContext.getBean(TaskInMemory.class);


		SpringApplication.run(LexicaApplication.class, args);

	/*	List<SimpleCard> testCards = List.of(
				new SimpleCard("Jabłko", "Apple"),
				new SimpleCard("Banan", "Banana"),
				new SimpleCard("Pomarańcza", "Orange"),
				new SimpleCard("Mango", "Mango")
		);
		 taskService.addAll(List.of(new Task<SimpleCard>("Zadanie z fiszkami 1",
				 testCards, true, "Opis zadania z fiszkami 1"),
				 new Task<SimpleCard>("Zadanie bez opisu",
						 testCards, true, ""),
				 new Task<SimpleCard>("Zadanie z fiszkami 2",
						 testCards, true, "Jakieś następne zadanie"),
				 new Task<SimpleCard>("Zadanie z fiszkami 3", testCards, true,
						 "Opis zadania z bardzo długim opisiem, który najprawdopodobniej powinien zostać ograniczony"),
				 new Task<SimpleCard>("Zadanie nieaktywne", testCards, false,
						 "Opis zadania nieaktywnego"),
				 new Task<SimpleCard>("Zadanie z trochę dłuższym tytułem",
						 testCards, true, "Opis zadania z dłuższym tytułem")
				 ));*/
	}

}

package pl.edu.ug.inf.lexica;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import pl.edu.ug.inf.lexica.domain.SimpleCard;
import pl.edu.ug.inf.lexica.domain.Task;
import pl.edu.ug.inf.lexica.service.EntityService;

import java.util.List;

@SpringBootApplication
public class LexicaApplication {

	@Autowired
	static EntityService<Task<SimpleCard>> taskService;

	public static void main(String[] args) {
		SpringApplication.run(LexicaApplication.class, args);

		// taskService.addAll(List.of());
	}

}

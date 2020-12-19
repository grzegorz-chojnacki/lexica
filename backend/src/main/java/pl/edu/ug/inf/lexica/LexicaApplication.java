package pl.edu.ug.inf.lexica;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import pl.edu.ug.inf.lexica.domain.*;
import pl.edu.ug.inf.lexica.service.*;

import java.util.List;

@SpringBootApplication
public class LexicaApplication {

	public static void main(String[] args) {
		SpringApplication.run(LexicaApplication.class, args);
	}

	@Bean
	@Autowired
	CommandLineRunner init(
			TaskService taskService, List<Task> tasks,
			TeamService teamService, List<Team> teams,
			UserService userService, List<User> users,
			ProgressService progressService, List<Progress> progress) {
		return (args) -> {
			taskService.addAll(tasks);
			progressService.addAll(progress);
			userService.addAll(users);
			teamService.addAll(teams);
		};
	}
}

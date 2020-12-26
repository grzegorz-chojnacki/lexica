package pl.edu.ug.inf.lexica;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import pl.edu.ug.inf.lexica.domain.*;
import pl.edu.ug.inf.lexica.service.*;

import java.util.List;
import java.util.function.Function;

@SpringBootApplication
public class LexicaApplication {

	public static void main(String[] args) {
		SpringApplication.run(LexicaApplication.class, args);
	}

	@Bean
	@Autowired
	CommandLineRunner init(
			TaskTypeService taskTypeService, TaskType taskTypes,
			TeamService teamService, List<Team> teams,
			UserService userService, List<User> users, Function<List<Team>, List<Team>> progressSetup) {
		return (args) -> {
			taskTypeService.addAll(List.of(taskTypes));
			userService.addAll(users);
			teamService.addAll(teams);
			// TODO: NAPRAWIC
			progressSetup.apply(teamService.getAll()).forEach(teamService::update);
		};
	}
}

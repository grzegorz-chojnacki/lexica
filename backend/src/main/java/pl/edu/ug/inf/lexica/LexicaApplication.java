package pl.edu.ug.inf.lexica;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import pl.edu.ug.inf.lexica.config.AppConfig;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class LexicaApplication {

	public static void main(String[] args) {
		SpringApplication.run(LexicaApplication.class, args);
	}

	//@Bean
	//@Autowired
	//CommandLineRunner init(AppConfig appConfig) {
	//	return (args) -> appConfig.initDataBase();
	//}
}

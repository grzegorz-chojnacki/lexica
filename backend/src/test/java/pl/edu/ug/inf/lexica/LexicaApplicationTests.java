package pl.edu.ug.inf.lexica;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import pl.edu.ug.inf.lexica.api.TeamController;
import pl.edu.ug.inf.lexica.api.UserController;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class LexicaApplicationTests {
	@Autowired
	private UserController userController;
	@Autowired
	private TeamController teamController;

	@Test
	void contextLoads() {
		assertThat(userController).isNotNull();
		assertThat(teamController).isNotNull();
	}

}

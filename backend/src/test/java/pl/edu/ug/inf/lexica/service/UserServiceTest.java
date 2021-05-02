package pl.edu.ug.inf.lexica.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import pl.edu.ug.inf.lexica.domain.Example;
import pl.edu.ug.inf.lexica.domain.Task;
import pl.edu.ug.inf.lexica.domain.TaskType;
import pl.edu.ug.inf.lexica.domain.User;
import pl.edu.ug.inf.lexica.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;

@SpringBootTest
class UserServiceTest {
    @Autowired
    private UserService service;

    /**
     * Create a mock implementation of the TaskRepository
     */
    @MockBean
    private UserRepository repository;
    @MockBean
    private BCryptPasswordEncoder crypt;
    @MockBean
    private TeamService teamService;

    UUID id = UUID.fromString("c81d4e2e-bcf2-11e6-869b-7df92533d2db");
    @Test
    void add() {
        // Setup our mock repository
        User user = new User("Patrycja", "Gajda", "pgajda", "WyAq1CjwM", "#9F865C");
        doReturn(user).when(repository).save(any());

        // Execute the service call
        User returnedWidget = service.add(user).get();

        // Assert the response
        Assertions.assertNotNull(returnedWidget, "The saved task should not be null");
       // Assertions.assertEquals(2, returnedWidget.getVersion(), "The version should be incremented");
    }


    @Test
    @DisplayName("Test get success")
    void get() {

        List<Example> list = new ArrayList<>();
        TaskType taskType = new TaskType();
        Task task = new Task("task", list, "description", taskType);
  //      when(repository.findById(id)).thenReturn(Optional.of(task));
        doReturn(Optional.of(task)).when(repository).findById(id);

        Optional<User> optionalTask = service.get(id);
        Assertions.assertTrue(optionalTask.isPresent(), "user was not found");
        Assertions.assertSame(optionalTask.get(), task, "The user returned was not the same as the mock");

    }
    @Test
    @DisplayName("Test get Not Found")
    void getNotFound() {
        // Setup our mock repository
        doReturn(Optional.empty()).when(repository).findById(id);

        // Execute the service call
        Optional<User> returnedUser = service.get(id);

        // Assert the response
        Assertions.assertFalse(returnedUser.isPresent(), "User should not be found");
    }
}
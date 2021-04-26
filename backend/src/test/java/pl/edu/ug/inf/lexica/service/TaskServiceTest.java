package pl.edu.ug.inf.lexica.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import pl.edu.ug.inf.lexica.domain.Example;
import pl.edu.ug.inf.lexica.domain.Task;
import pl.edu.ug.inf.lexica.domain.TaskType;
import pl.edu.ug.inf.lexica.repository.TaskRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import static org.mockito.Mockito.doReturn;
import static org.mockito.ArgumentMatchers.any;

import java.security.*;
@SpringBootTest
class TaskServiceTest {
    @Autowired
    private TaskService service;

    /**
     * Create a mock implementation of the TaskRepository
     */
    @MockBean
    private TaskRepository repository;

    UUID id = UUID.fromString("c81d4e2e-bcf2-11e6-869b-7df92533d2db");
    @Test
    void add() {
        // Setup our mock repository
        List<Example> list = new ArrayList<>();
        TaskType taskType = new TaskType();
        Task widget = new Task("task", list, "description", taskType);
        doReturn(widget).when(repository).save(any());

        // Execute the service call
        Task returnedWidget = service.add(widget).get();

        // Assert the response
        Assertions.assertNotNull(returnedWidget, "The saved task should not be null");
       // Assertions.assertEquals(2, returnedWidget.getVersion(), "The version should be incremented");
    }


    @Test
    void remove() {
    }

    @Test
    @DisplayName("Test get success")
    void get() {

        List<Example> list = new ArrayList<>();
        TaskType taskType = new TaskType();
        Task task = new Task("task", list, "description", taskType);
  //      when(repository.findById(id)).thenReturn(Optional.of(task));
        doReturn(Optional.of(task)).when(repository).findById(id);

        Optional<Task> optionalTask = service.get(id);
        Assertions.assertTrue(optionalTask.isPresent(), "Task was not found");
        Assertions.assertSame(optionalTask.get(), task, "The task returned was not the same as the mock");

    }
    @Test
    @DisplayName("Test get Not Found")
    void getNotFound() {
        // Setup our mock repository
        doReturn(Optional.empty()).when(repository).findById(id);

        // Execute the service call
        Optional<Task> returnedTask = service.get(id);

        // Assert the response
        Assertions.assertFalse(returnedTask.isPresent(), "Task should not be found");
    }
    @Test
    void update() {
    }
}
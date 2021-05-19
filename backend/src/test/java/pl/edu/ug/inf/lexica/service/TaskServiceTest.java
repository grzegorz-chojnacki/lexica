package pl.edu.ug.inf.lexica.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
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

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;

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
        Task task = new Task("task", list, "description", taskType);
        doReturn(task).when(repository).save(any());

        // Execute the service call
        Task returnedWidget = service.add(task).get();

        // Assert the response
        Assertions.assertNotNull(returnedWidget, "The saved task should not be null");
        // Assertions.assertEquals(2, returnedWidget.getVersion(), "The version should be incremented");
    }

    @Test
    void remove() {
        // Setup our mock repository
        List<Example> list = new ArrayList<>();
        TaskType taskType = new TaskType();
        Task task = new Task("task", list, "description", taskType);
        doReturn(null).when(repository).findById(task.getId());

        // Execute the service call
        service.remove(task.getId());
        Optional<Task> returnedtask = service.get(task.getId());

        // Assert the response
        Assertions.assertNull(returnedtask, "The removed task should be null");
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
        Assertions.assertTrue(optionalTask.isPresent(), "Task was found");
        Assertions.assertSame(optionalTask.get(), task, "The task returned was the same as the mock");

    }

    @Test
    @DisplayName("Test get success find by id")
    void getById() {

        List<Example> list = new ArrayList<>();
        TaskType taskType = new TaskType();
        Task task = new Task("task", list, "description", taskType);

        doReturn(Optional.of(task)).when(repository).findById(id);

        Optional<Task> optionalTask = service.get(id);
        Assertions.assertEquals("description", optionalTask.get().getDescription());
        Assertions.assertEquals("task", optionalTask.get().getName());

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
    @DisplayName("Test get success find by id")
    void update() {
        List<Example> list = new ArrayList<>();
        TaskType taskType = new TaskType();
        Task task = new Task("task", list, "description", taskType);
        repository.saveAndFlush(task);

        task.setDescription("new description");
        repository.save(task);
        doReturn(Optional.of(task)).when(repository).findById(id);

        Optional<Task> optionalTask = service.get(id);
        Assertions.assertEquals("new description", optionalTask.get().getDescription());
        Assertions.assertEquals("task", optionalTask.get().getName());
    }

    @Test
    void sholudNotUpdate() {
        List<Example> list = new ArrayList<>();
        TaskType taskType = new TaskType();
        Task task = new Task("task", list, "description", taskType);
        repository.saveAndFlush(task);

        doReturn(Optional.of(task)).when(repository).findById(id);
        Task taskUpdate = new Task();
        taskUpdate.setDescription("new description");

        Optional<Task> optionalTask = service.get(id);
        Assertions.assertNotEquals(taskUpdate.getDescription(), optionalTask.get().getDescription());
    }

}
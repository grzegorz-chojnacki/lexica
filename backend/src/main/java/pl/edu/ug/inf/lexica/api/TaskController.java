package pl.edu.ug.inf.lexica.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.inf.lexica.domain.SimpleCard;
import pl.edu.ug.inf.lexica.domain.Task;
import pl.edu.ug.inf.lexica.service.EntityService;

import java.util.List;

@RestController
public class TaskController {

    private final EntityService<Task<SimpleCard>> taskService;

    @Autowired
    public TaskController(EntityService<Task<SimpleCard>> taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/task/{id}")
    public Task<SimpleCard> getTask(@PathVariable String id) {
        return taskService.get(id).orElse(null);
    }

    @GetMapping("/task")
    public List<Task<SimpleCard>> getTasks() {
        return taskService.getAll();
    }


    @PostMapping("/task")
    public Task<SimpleCard> addTask(@RequestBody Task<SimpleCard> newTask) {
        Task<SimpleCard> task = new Task<SimpleCard>().patch(newTask);
        taskService.add(task);
        return task;
    }

    @PutMapping("/task/{id}")
    public Task<SimpleCard> updateTask(@RequestBody Task<SimpleCard> newTask, @PathVariable String id) {
        return taskService.replace(id, newTask);
    }

    @DeleteMapping("/task/{id}")
    public void deleteTask(@PathVariable String id) {
        taskService.remove(id);
    }
}

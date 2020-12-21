package pl.edu.ug.inf.lexica.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.inf.lexica.domain.Progress;
import pl.edu.ug.inf.lexica.domain.SimpleCard;
import pl.edu.ug.inf.lexica.domain.Task;
import pl.edu.ug.inf.lexica.service.EntityService;
import pl.edu.ug.inf.lexica.service.TaskService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/task")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/{id}")
    public Task getTask(@PathVariable Integer id) {
        return taskService.get(id).orElse(null);
    }

    @GetMapping
    public List<Task> getTasks() {
        return taskService.getAll();
    }

    @PostMapping
    public void addTask(@RequestBody Task newTask) {
        taskService.add(newTask);
    }

    @PutMapping("/{id}")
    public void updateTask(@RequestBody Task newTask, @PathVariable String id) {
        taskService.replace(newTask);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Integer id) {
        taskService.remove(id);
    }
}

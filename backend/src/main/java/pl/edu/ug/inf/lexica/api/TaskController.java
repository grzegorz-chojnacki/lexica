package pl.edu.ug.inf.lexica.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.inf.lexica.domain.Task;
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
        return taskService.get(id).orElse(new Task());
    }

    @PutMapping("/{id}")
    public void updateTask(@RequestBody Task updated, @PathVariable Integer id) {
        taskService.get(id).ifPresent(task -> {
            if (task.getType().getId() == updated.getType().getId()) {
                task.setName(updated.getName());
                task.setDescription(updated.getDescription());
                task.setActive(updated.isActive());
                task.setExamples(updated.getExamples());
                taskService.update(task);
            }
        });
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Integer id) {
        taskService.remove(id);
    }
}

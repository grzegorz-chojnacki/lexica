package pl.edu.ug.inf.lexica.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.inf.lexica.domain.Identifiable;
import pl.edu.ug.inf.lexica.domain.SimpleCard;
import pl.edu.ug.inf.lexica.service.EntityService;
import pl.edu.ug.inf.lexica.service.SimpleCardInMemory;

import java.util.List;

@RestController
public class TaskController {

    private final EntityService<SimpleCard> simpleCardService;

    @Autowired
    public TaskController(EntityService<SimpleCard> simpleCardService) {
        this.simpleCardService = simpleCardService;
    }

    @GetMapping("/task")
    public List<SimpleCard> getTasks() {
        return simpleCardService.getAll();
    }

    @PostMapping("/task")
    public SimpleCard addTask(@RequestBody SimpleCard newTask) {
        SimpleCard simpleCard = new SimpleCard().patch(newTask);
        simpleCardService.add(simpleCard);
        return simpleCard;
    }

    @PutMapping("/task/{id}")
    public SimpleCard updateTask(@RequestBody SimpleCard newTask, @PathVariable String id) {
        return simpleCardService.replace(id, newTask);
    }

    @DeleteMapping("/task/{id}")
    public void deleteTask(@PathVariable String id) {
        simpleCardService.remove(id);
    }
}

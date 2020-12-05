package pl.edu.ug.inf.lexica.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.inf.lexica.domain.Progress;
import pl.edu.ug.inf.lexica.domain.SimpleCard;
import pl.edu.ug.inf.lexica.service.EntityService;

import java.util.List;

@RestController
public class ProgressController {
    private final EntityService<Progress<SimpleCard>> progressService;

    @Autowired
    public ProgressController(EntityService<Progress<SimpleCard>> progressService) {
        this.progressService = progressService;
    }

    @GetMapping("/progress")
    public List<Progress<SimpleCard>> getUsers() {
        return progressService.getAll();
    }

    @PostMapping("/progress")
    public Progress<SimpleCard> addUser(@RequestBody Progress<SimpleCard> newUser) {
        Progress<SimpleCard> progress = new Progress<SimpleCard>().patch(newUser);
        progressService.add(progress);
        return progress;
    }

    @PutMapping("/progress/{id}")
    public Progress<SimpleCard> updateUser(@RequestBody Progress<SimpleCard> newUser, @PathVariable String id) {
        return progressService.replace(id, newUser);
    }

    @DeleteMapping("/progress/{id}")
    public void deleteUser(@PathVariable String id) {
        progressService.remove(id);
    }
}

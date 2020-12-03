package pl.edu.ug.inf.lexica.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.inf.lexica.domain.Progress;
import pl.edu.ug.inf.lexica.service.EntityService;

import java.util.List;

@RestController
public class ProgressController {
    private final EntityService<Progress> progressService;

    @Autowired
    public ProgressController(EntityService<Progress> progressService) {
        this.progressService = progressService;
    }

    @GetMapping("/progress")
    public List<Progress> getUsers() {
        return progressService.getAll();
    }

    @PostMapping("/progress")
    public Progress addUser(@RequestBody Progress newUser) {
        Progress progress = new Progress().patch(newUser);
        progressService.add(progress);
        return progress;
    }

    @PutMapping("/progress/{id}")
    public Progress updateUser(@RequestBody Progress newUser, @PathVariable String id) {
        return progressService.replace(id, newUser);
    }

    @DeleteMapping("/progress/{id}")
    public void deleteUser(@PathVariable String id) {
        progressService.remove(id);
    }
}

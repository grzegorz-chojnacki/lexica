package pl.edu.ug.inf.lexica.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.inf.lexica.domain.Progress;
import pl.edu.ug.inf.lexica.service.EntityService;

import java.util.List;

@RestController
@RequestMapping("/progress")
public class ProgressController {
    private final EntityService<Progress> progressService;

    @Autowired
    public ProgressController(EntityService<Progress> progressService) {
        this.progressService = progressService;
    }

    @GetMapping
    public List<Progress> getProgresses() {
        return progressService.getAll();
    }

    @GetMapping("/{id}")
    public Progress getProgress(@PathVariable String id) {
        return progressService.get(id).orElse(null);
    }

    @PostMapping
    public Progress addProgress(@RequestBody Progress newProgress) {
        Progress progress = new Progress().patch(newProgress);
        progressService.add(progress);
        return progress;
    }

    @PutMapping("/{id}")
    public Progress updateProgress(@RequestBody Progress newProgress, @PathVariable String id) {
        return progressService.replace(id, newProgress);
    }

    @DeleteMapping("/{id}")
    public void deleteProgress(@PathVariable String id) {
        progressService.remove(id);
    }
}

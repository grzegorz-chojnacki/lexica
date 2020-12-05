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
    public List<Progress<SimpleCard>> getProgresses() {
        return progressService.getAll();
    }

    @GetMapping("/progress/{id}")
    public Progress<SimpleCard> getProgress(@PathVariable String id) {
        return progressService.get(id).orElse(null);
    }

    @PostMapping("/progress")
    public Progress<SimpleCard> addProgress(@RequestBody Progress<SimpleCard> newProgress) {
        Progress<SimpleCard> progress = new Progress<SimpleCard>().patch(newProgress);
        progressService.add(progress);
        return progress;
    }

    @PutMapping("/progress/{id}")
    public Progress<SimpleCard> updateProgress(@RequestBody Progress<SimpleCard> newProgress, @PathVariable String id) {
        return progressService.replace(id, newProgress);
    }

    @DeleteMapping("/progress/{id}")
    public void deleteProgress(@PathVariable String id) {
        progressService.remove(id);
    }
}

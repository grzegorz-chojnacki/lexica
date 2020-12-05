package pl.edu.ug.inf.lexica.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.inf.lexica.domain.Progress;
import pl.edu.ug.inf.lexica.domain.SimpleCard;
import pl.edu.ug.inf.lexica.service.EntityService;

import java.util.List;

@RestController
@RequestMapping("/progress")
public class ProgressController {
    private final EntityService<Progress<SimpleCard>> progressService;

    @Autowired
    public ProgressController(EntityService<Progress<SimpleCard>> progressService) {
        this.progressService = progressService;
    }

    @GetMapping
    public List<Progress<SimpleCard>> getProgresses() {
        return progressService.getAll();
    }

    @GetMapping("/{id}")
    public Progress<SimpleCard> getProgress(@PathVariable String id) {
        return progressService.get(id).orElse(null);
    }

    @PostMapping
    public Progress<SimpleCard> addProgress(@RequestBody Progress<SimpleCard> newProgress) {
        Progress<SimpleCard> progress = new Progress<SimpleCard>().patch(newProgress);
        progressService.add(progress);
        return progress;
    }

    @PutMapping("/{id}")
    public Progress<SimpleCard> updateProgress(@RequestBody Progress<SimpleCard> newProgress, @PathVariable String id) {
        return progressService.replace(id, newProgress);
    }

    @DeleteMapping("/{id}")
    public void deleteProgress(@PathVariable String id) {
        progressService.remove(id);
    }
}

package pl.edu.ug.inf.lexica.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.inf.lexica.domain.Progress;
import pl.edu.ug.inf.lexica.service.ProgressService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/progress")
public class ProgressController {
    private final ProgressService progressService;

    @Autowired
    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping("/{id}")
    public Optional<Progress> getProgress(@PathVariable Integer id) {
        return progressService.get(id);
    }

    @GetMapping
    public List<Progress> getProgress() {
        return progressService.getAll();
    }

    @PostMapping
    public Progress addProgress(@RequestBody Progress newProgress) {
        progressService.add(newProgress);
        return null;
    }

    // @PutMapping("/{id}")
    // public Progress updateProgress(@RequestBody Progress newProgress, @PathVariable String id) {
    //     return progressService.replace(id, newProgress);
    // }

    // @DeleteMapping("/{id}")
    // public void deleteProgress(@PathVariable String id) {
    //     progressService.remove(id);
    // }
}

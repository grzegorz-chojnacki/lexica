package pl.edu.ug.inf.lexica.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.inf.lexica.domain.Progress;
import pl.edu.ug.inf.lexica.domain.Task;
import pl.edu.ug.inf.lexica.domain.User;
import pl.edu.ug.inf.lexica.repository.ProgressRepository;
import pl.edu.ug.inf.lexica.service.EntityService;
import pl.edu.ug.inf.lexica.service.ProgressService;
import pl.edu.ug.inf.lexica.service.UserService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getAll();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Integer id) {
        return userService.get(id).orElse(new User());
    }

    @PostMapping("/{id}/progress")
    public void addProgress(@RequestBody Progress p, @PathVariable Integer id) {
        userService.get(id).ifPresent(user -> {
            user.getProgress().add(p);
            userService.replace(user);
        });
    }

    @GetMapping("/{id}/progress")
    public List<Progress> getProgress(@PathVariable Integer id) {
        return userService.get(id).orElse(new User()).getProgress();
    }

    @PostMapping
    public void addUser(@RequestBody User user) {
        userService.add(user);
    }

    @PutMapping("/{id}")
    public void updateUser(@RequestBody User user, @PathVariable Integer id) {
        userService.replace(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id) {
        userService.remove(id);
    }
}

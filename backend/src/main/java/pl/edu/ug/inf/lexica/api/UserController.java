package pl.edu.ug.inf.lexica.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.inf.lexica.domain.Progress;
import pl.edu.ug.inf.lexica.domain.User;
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
    public void addProgress(@RequestBody Progress progress, @PathVariable Integer id) {
        userService.get(id).ifPresent(user -> {
            user.getProgress().add(progress);
            userService.update(user);
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
        userService.update(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id) {
        userService.remove(id);
    }
}

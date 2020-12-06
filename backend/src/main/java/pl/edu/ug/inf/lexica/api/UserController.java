package pl.edu.ug.inf.lexica.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.inf.lexica.domain.User;
import pl.edu.ug.inf.lexica.service.EntityService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/user")
public class UserController {
    private final EntityService<User> userService;

    @Autowired
    public UserController(EntityService<User> userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getAll();
    }

    @GetMapping("/{id}")
    public User getUsers(@PathVariable String id) {
        return userService.get(id).orElse(null);
    }

    @PostMapping
    public User addUser(@RequestBody User newUser) {
        User user = new User().patch(newUser);
        userService.add(user);
        return user;
    }

    @PutMapping("/{id}")
    public User updateUser(@RequestBody User newUser, @PathVariable String id) {
        return userService.replace(id, newUser);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.remove(id);
    }
}

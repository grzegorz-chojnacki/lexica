package pl.edu.ug.inf.lexica.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.inf.lexica.domain.Progress;
import pl.edu.ug.inf.lexica.domain.Team;
import pl.edu.ug.inf.lexica.domain.User;
import pl.edu.ug.inf.lexica.service.UserService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}/team")
    public List<Team> getTeams(@PathVariable UUID id) {
        return userService.get(id).map(user -> Stream
                .concat(user.getLeading().stream(), user.getTeams().stream())
                .map(Team::withSomeInfo)
                .collect(Collectors.toList())
        ).orElse(List.of());
    }

    @GetMapping()
    public List<User> getUsers() {
        return userService.getAll().stream().map(User::withMoreInfo).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable UUID id) {
        return userService.get(id).map(User::withMoreInfo);
    }

    @PostMapping("/{id}/progress")
    public void addProgress(@RequestBody Progress progress, @PathVariable UUID id) {
        userService.get(id).ifPresent(user -> {
            user.getProgress().add(progress);
            userService.update(user);
        });
    }

    @GetMapping("/{id}/progress")
    public List<Progress> getProgress(@PathVariable UUID id) {
        return userService.get(id).orElse(new User()).getProgress();
    }

    @PostMapping
    public void addUser(@RequestBody User user) {
        userService.add(user);
    }

    @PutMapping("/{id}")
    public void updateUser(@RequestBody User updated, @PathVariable UUID id) {
        userService.get(id).ifPresent(user -> {
            user.setFirstname(updated.getFirstname());
            user.setSurname(updated.getSurname());
            user.setEmail(updated.getEmail());
            user.setPassword(updated.getPassword());
            userService.update(user);
        });
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable UUID id) {
        userService.remove(id);
    }
}

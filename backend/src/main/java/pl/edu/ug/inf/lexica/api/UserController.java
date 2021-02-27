package pl.edu.ug.inf.lexica.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.inf.lexica.domain.Progress;
import pl.edu.ug.inf.lexica.domain.Team;
import pl.edu.ug.inf.lexica.domain.User;
import pl.edu.ug.inf.lexica.service.UserService;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userService, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/{id}/team")
    public List<Team> getTeams(@PathVariable UUID id) {
        return userService.get(id).map(user -> Stream
                .concat(user.getLeading().stream(), user.getTeams().stream())
                .distinct()
                .map(Team::withSomeInfo)
                .sorted(Comparator.comparing(Team::getId))
                .sorted(Comparator.comparing(Team::getName))
                .collect(Collectors.toList())
        ).orElse(List.of());
    }

    @GetMapping()
    public List<User> getUsers() {
        return userService.getAll().stream().map(User::withSomeInfo).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable UUID id) {
        return userService.get(id).map(User::withProgress);
    }

    @PostMapping("/login")
    public Optional<User> login(@RequestBody Map<String, String> user) {
        return userService.get(user.get("email"))
                .filter(u -> passwordEncoder.matches(user.get("password"), u.getPassword()));
    }

    @PutMapping("/{id}/progress")
    public void addProgress(@RequestBody Progress progress, @PathVariable UUID id) {
        userService.get(id).ifPresent(user -> {
            user.getProgress().stream()
                    .filter(p -> p.getTask().getId().equals(progress.getTask().getId()))
                    .findAny()
                    .ifPresentOrElse( // Keep at most one progress for each task
                             p -> p.setCompletion(progress.getCompletion()),
                            () -> user.getProgress().add(progress));
            userService.update(user);
        });
    }

    @GetMapping("/{id}/progress")
    public Set<Progress> getProgress(@PathVariable UUID id) {
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
            user.setColor(updated.getColor());
            if (updated.getPassword() != null) user.setPassword(updated.getPassword());
            userService.update(user);
        });
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable UUID id) {
        userService.remove(id);
    }
}

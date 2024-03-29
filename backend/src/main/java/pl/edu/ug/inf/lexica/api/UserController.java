package pl.edu.ug.inf.lexica.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.inf.lexica.domain.Progress;
import pl.edu.ug.inf.lexica.domain.Team;
import pl.edu.ug.inf.lexica.domain.User;
import pl.edu.ug.inf.lexica.service.UserService;

import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userService, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/team")
    public List<Team> getTeams(Principal principal) {
        return userService.get(principal).map(user -> Stream
                .concat(user.getLeading().stream(), user.getTeams().stream())
                .distinct() // Merge teams where user is both leader and member
                .map(Team::withSomeInfo)
                .sorted(Comparator.comparing(Team::getId)) // If two teams have the same name their order is stable
                .sorted(Comparator.comparing(Team::getName))
                .collect(Collectors.toList())
        ).orElse(List.of());
    }

    @GetMapping
    public Optional<User> getUser(Principal principal) {
        return userService.get(principal).map(User::withProgress);
    }

    @PostMapping("/login")
    public Optional<User> login(@RequestBody Map<String, String> user) {
        return userService.get(user.get("username"))
                .filter(u -> passwordEncoder.matches(user.get("password"), u.getPassword()));
    }

    @PostMapping("/register")
    public Optional<User> register(@RequestBody Map<String, String> registration) {
        User user = new User();
        user.setUsername (registration.get("username"));
        user.setPassword (registration.get("password"));
        user.setFirstname(registration.get("firstname"));
        user.setSurname  (registration.get("surname"));
        user.setColor    (registration.get("color"));
        return userService.add(user);
    }

    @PutMapping("/progress")
    public void addProgress(@RequestBody Progress progress, Principal principal) {
        userService.get(principal).ifPresent(user -> {
            user.getProgress().stream()
                    .filter(p -> p.getTask().getId().equals(progress.getTask().getId()))
                    .findAny()
                    .ifPresentOrElse( // Keep at most one progress for each task
                             p -> p.setCompletion(progress.getCompletion()),
                            () -> user.getProgress().add(progress));
            userService.update(user);
        });
    }

    @GetMapping("/progress")
    public Set<Progress> getProgress(Principal principal) {
        return userService.get(principal).orElse(new User()).getProgress();
    }

    @PutMapping
    public void updateUser(@RequestBody Map<String, String> updated, Principal principal) {
        userService.get(principal).ifPresent(user -> {
            user.setFirstname(updated.get("firstname"));
            user.setSurname  (updated.get("surname"));
            user.setUsername (updated.get("username"));
            user.setColor    (updated.get("color"));
            if (updated.get("password") != null) user.setPassword(updated.get("password"));
            userService.updateWithPassword(user);
        });
    }

    @DeleteMapping
    @Transactional
    public void deleteUser(Principal principal) {
        userService.remove(principal.getName());
    }
}

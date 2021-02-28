package pl.edu.ug.inf.lexica.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.edu.ug.inf.lexica.domain.Team;
import pl.edu.ug.inf.lexica.domain.User;
import pl.edu.ug.inf.lexica.repository.UserRepository;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService implements EntityService<User> {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private TeamService teamService;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Autowired
    void setTeamService(TeamService teamService) {
        this.teamService = teamService;
    }

    private User encodePassword(User user) {
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        return user;
    }

    @Override
    public void add(User entity) {
        userRepository.save(entity);
    }

    @Override
    public void addAll(List<User> entities) {
        userRepository.saveAll(entities);
    }

    public void registerAll(List<User> entities) {
        userRepository.saveAll(entities.stream().map(this::encodePassword).collect(Collectors.toList()));
    }

    @Override
    public void remove(UUID id) { userRepository.deleteById(id); }

    public void remove(String username) {
        userRepository.findByUsername(username).ifPresent(user -> {
            user.getProgress().clear();
            user.getTeams().forEach(team -> teamService.leaveTeam(team.getId(), user.getId()));
            user.getLeading().stream().map(Team::getId).forEach(teamService::remove);
            userRepository.deleteByUsername(username);
        });
    }

    public Optional<User> get(UUID id) {
        return userRepository.findById(id);
    }

    public Optional<User> get(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> get(Principal principal) {
        return get(principal.getName());
    }

    @Override
    public void update(User entity) {
        userRepository.save(entity);
    }
}

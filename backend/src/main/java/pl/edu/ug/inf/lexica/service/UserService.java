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

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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

    public void remove(String email) { userRepository.deleteByEmail(email); }

    @Override
    public List<User> getAll() { return userRepository.findAll(); }

    public Optional<User> get(UUID id) {
        return userRepository.findById(id);
    }

    public Optional<User> get(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> get(Principal principal) {
        return get(principal.getName());
    }

    @Override
    public void update(User entity) {
        userRepository.save(entity);
    }
}

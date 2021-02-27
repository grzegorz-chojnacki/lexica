package pl.edu.ug.inf.lexica.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import pl.edu.ug.inf.lexica.domain.User;
import pl.edu.ug.inf.lexica.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService implements EntityService<User> {
    UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public void add(User entity) { userRepository.save(entity); }

    @Override
    public void addAll(List<User> entities) {
        userRepository.saveAll(entities);
    }

    @Override
    public void remove(UUID id) { userRepository.deleteById(id); }

    @Override
    public List<User> getAll() { return userRepository.findAll(); }

    public Optional<User> get(UUID id) {
        return userRepository.findById(id);
    }

    public Optional<User> get(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void update(User entity) {
        userRepository.save(entity);
    }
}

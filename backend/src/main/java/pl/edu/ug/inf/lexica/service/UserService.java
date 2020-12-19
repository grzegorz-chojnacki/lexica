package pl.edu.ug.inf.lexica.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.ug.inf.lexica.domain.User;
import pl.edu.ug.inf.lexica.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements EntityService<User> {
    UserRepository userRepository;
    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public void add(User entity) { }

    @Override
    public void addAll(List<User> entities) { }

    @Override
    public void remove(Integer id) { }

    @Override
    public List<User> getAll() { return userRepository.findAll(); }

    public Optional<User> get(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public User replace(Integer id, User newEntity) { return null; }
}

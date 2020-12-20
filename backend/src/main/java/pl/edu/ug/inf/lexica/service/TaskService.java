package pl.edu.ug.inf.lexica.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.ug.inf.lexica.domain.Task;
import pl.edu.ug.inf.lexica.repository.TaskRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService implements EntityService<Task> {
    TaskRepository taskRepository;
    @Autowired
    public TaskService(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }

    @Override
    public void add(Task entity) {
        taskRepository.save(entity.getName(),entity.getDescription(),entity.getType().getId(),entity.isActive());
    }

    @Override
    public void addAll(List<Task> entities) {
        taskRepository.saveAll(entities);
    }

    @Override
    public void remove(Integer id) {
        taskRepository.deleteById(id);
    }

    @Override
    public List<Task> getAll() { return taskRepository.findAll(); }

    public Optional<Task> get(Integer id) {
        return taskRepository.findById(id);
    }

    @Override
    public Task replace(Task newEntity) { return taskRepository.save(newEntity); }
}

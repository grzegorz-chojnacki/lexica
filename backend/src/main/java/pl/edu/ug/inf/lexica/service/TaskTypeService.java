package pl.edu.ug.inf.lexica.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.ug.inf.lexica.domain.TaskType;
import pl.edu.ug.inf.lexica.repository.TaskTypeRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TaskTypeService implements EntityService<TaskType> {
    TaskTypeRepository taskTypeRepository;

    @Autowired
    public TaskTypeService(TaskTypeRepository taskTypeRepository){
        this.taskTypeRepository = taskTypeRepository;
    }

    @Override
    public void add(TaskType entity) {
        taskTypeRepository.save(entity);
    }

    @Override
    public void addAll(List<TaskType> entities) {
        taskTypeRepository.saveAll(entities);
    }

    @Override
    public void remove(UUID id) {
        taskTypeRepository.deleteById(id);
    }

    @Override
    public List<TaskType> getAll() { return taskTypeRepository.findAll(); }

    public Optional<TaskType> get(UUID id) {
        return taskTypeRepository.findById(id);
    }

    @Override
    public void update(TaskType entity) {
        taskTypeRepository.save(entity);
    }
}

package pl.edu.ug.inf.lexica.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.ug.inf.lexica.domain.TaskType;
import pl.edu.ug.inf.lexica.repository.TaskTypeRepository;

import java.util.List;
import java.util.Optional;

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
    public void remove(Integer id) {
        taskTypeRepository.deleteById(id);
    }

    @Override
    public List<TaskType> getAll() { return taskTypeRepository.findAll(); }

    public Optional<TaskType> get(Integer id) {
        return taskTypeRepository.findById(id);
    }

    @Override
    public void replace(TaskType newEntity) {
        taskTypeRepository.save(newEntity);
    }
}

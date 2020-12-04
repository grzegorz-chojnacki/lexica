package pl.edu.ug.inf.lexica.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import pl.edu.ug.inf.lexica.domain.SimpleCard;
import pl.edu.ug.inf.lexica.domain.Task;

import java.util.List;

@Service
public class TaskInMemory extends EntityService<Task<SimpleCard>> {
    @Autowired
    @Qualifier("tasks")
    List<Task<SimpleCard>> tasks;

    @Autowired
    EntityService<Task<SimpleCard>> taskService;

    public EntityService<Task<SimpleCard>> getTaskService() {
        taskService.addAll(tasks);
        return taskService;
    }

    @Override
    public void addAll(List<Task<SimpleCard>> tasks) {
       tasks.stream()
            .peek(task -> task
                .getContent()
                .forEach(simpleCard -> simpleCard.setId(getNewId())))
            .forEach(this::add);

    }
}

package pl.edu.ug.inf.lexica.service;

import org.springframework.stereotype.Service;
import pl.edu.ug.inf.lexica.domain.SimpleCard;
import pl.edu.ug.inf.lexica.domain.Task;

import java.util.List;

@Service
public class TaskInMemory extends EntityService<Task<SimpleCard>> {
    @Override
    public void addAll(List<Task<SimpleCard>> tasks) {
       tasks.stream()
            .peek(task -> task
                .getExamples()
                .forEach(simpleCard -> simpleCard.setId(getNewId())))
            .forEach(this::add);

    }
}

package pl.edu.ug.inf.lexica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.ug.inf.lexica.domain.TaskType;

import java.util.List;
import java.util.Optional;

public interface TaskTypeRepository extends JpaRepository<TaskType, Integer> {
    Optional<TaskType> findById(Integer id);
    List<TaskType> findAll();
}

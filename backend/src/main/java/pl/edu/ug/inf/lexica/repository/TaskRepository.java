package pl.edu.ug.inf.lexica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.edu.ug.inf.lexica.domain.Task;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    Optional<Task> findById(Integer id);
    List<Task> findAll();

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO task (name, description, type_id, is_active) VALUES (?1, ?2, ?3, ?4)", nativeQuery = true)
    void save(String name , String description, int type_id, boolean active);
}

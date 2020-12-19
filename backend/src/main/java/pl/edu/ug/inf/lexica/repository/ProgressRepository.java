package pl.edu.ug.inf.lexica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.edu.ug.inf.lexica.domain.Progress;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProgressRepository extends JpaRepository<Progress, Integer> {
    Optional<Progress> findById(Integer id);
    List<Progress> findAll();

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO progress (task_id, completed) VALUES (?1, ?2)", nativeQuery = true)
    void save(int taskId, int completed);
}

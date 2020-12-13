package pl.edu.ug.inf.lexica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.ug.inf.lexica.domain.Progress;

import java.util.Optional;

public interface ProgressRepository extends JpaRepository<Progress,String> {
    Optional<Progress> findById(String id);
}

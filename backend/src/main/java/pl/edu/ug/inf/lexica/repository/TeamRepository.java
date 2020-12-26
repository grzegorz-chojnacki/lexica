package pl.edu.ug.inf.lexica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.edu.ug.inf.lexica.domain.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> { }

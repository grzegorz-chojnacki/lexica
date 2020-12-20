package pl.edu.ug.inf.lexica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.edu.ug.inf.lexica.domain.SimpleCard;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface SimpleCardRepository extends JpaRepository<SimpleCard, Integer> {
    Optional<SimpleCard> findById(Integer id);
    List<SimpleCard> findAll();
}

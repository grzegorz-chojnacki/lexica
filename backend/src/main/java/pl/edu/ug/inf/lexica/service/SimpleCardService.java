package pl.edu.ug.inf.lexica.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.ug.inf.lexica.domain.SimpleCard;
import pl.edu.ug.inf.lexica.repository.SimpleCardRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SimpleCardService implements EntityService<SimpleCard>{
    SimpleCardRepository simpleCardRepository;

    @Autowired
    public SimpleCardService(SimpleCardRepository simpleCardRepository){
        this.simpleCardRepository = simpleCardRepository;
    }

    @Override
    public void add(SimpleCard entity) {
        simpleCardRepository.save(entity);
    }

    @Override
    public void addAll(List<SimpleCard> entities) {
        simpleCardRepository.saveAll(entities);
    }

    @Override
    public void remove(Long id) {
        simpleCardRepository.deleteById(id);
    }

    @Override
    public List<SimpleCard> getAll() { return simpleCardRepository.findAll(); }

    public Optional<SimpleCard> get(Long id) {
        return simpleCardRepository.findById(id);
    }

    @Override
    public void update(SimpleCard entity) {
        simpleCardRepository.save(entity);
    }
}

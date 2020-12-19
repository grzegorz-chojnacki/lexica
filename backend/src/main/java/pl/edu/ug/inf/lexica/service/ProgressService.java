package pl.edu.ug.inf.lexica.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.ug.inf.lexica.domain.Progress;
import pl.edu.ug.inf.lexica.repository.ProgressRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProgressService implements EntityService<Progress>{
    ProgressRepository progressRepository;

    @Autowired
    public ProgressService(ProgressRepository progressRepository) {
        this.progressRepository = progressRepository;
    }

    @Override
    public void add(Progress entity) { }

    @Override
    public void addAll(List<Progress> entities) {
        progressRepository.saveAll(entities);
    }

    @Override
    public void remove(Integer id) { }

    @Override
    public List<Progress> getAll() { return progressRepository.findAll(); }

    public Optional<Progress> get(Integer id) {
        return progressRepository.findById(id);
    }

    @Override
    public Progress replace(Integer id, Progress newEntity) { return null; }
}

package pl.edu.ug.inf.lexica.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.ug.inf.lexica.domain.Progress;
import pl.edu.ug.inf.lexica.repository.ProgressRepository;

import java.util.Optional;

@Service
public class ProgressService {
    ProgressRepository progressRepository;
    @Autowired
    public ProgressService(ProgressRepository progressRepository){
        this.progressRepository=progressRepository;
    }
    public Optional<Progress> get(String id) {
        return progressRepository.findById(id);
    }
}

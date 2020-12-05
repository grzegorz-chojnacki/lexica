package pl.edu.ug.inf.lexica.service;

import org.springframework.stereotype.Service;
import pl.edu.ug.inf.lexica.domain.Progress;
import pl.edu.ug.inf.lexica.domain.SimpleCard;

@Service
public class ProgressInMemory extends EntityService<Progress<SimpleCard>> { }

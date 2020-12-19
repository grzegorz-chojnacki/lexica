package pl.edu.ug.inf.lexica.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.ug.inf.lexica.domain.Team;
import pl.edu.ug.inf.lexica.repository.TeamRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService implements EntityService<Team> {
    TeamRepository teamRepository;
    @Autowired
    public TeamService(TeamRepository teamRepository){
        this.teamRepository = teamRepository;
    }

    @Override
    public void add(Team entity) { }

    @Override
    public void addAll(List<Team> entities) { }

    @Override
    public void remove(Integer id) { }

    @Override
    public List<Team> getAll() { return teamRepository.findAll(); }

    public Optional<Team> get(Integer id) {
        return teamRepository.findById(id);
    }

    @Override
    public Team replace(Integer id, Team newEntity) { return null; }
}

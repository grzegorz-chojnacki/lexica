package pl.edu.ug.inf.lexica.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.ug.inf.lexica.domain.Task;
import pl.edu.ug.inf.lexica.domain.Team;
import pl.edu.ug.inf.lexica.domain.User;
import pl.edu.ug.inf.lexica.repository.TeamRepository;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.function.BiFunction;

@Service
public class TeamService implements EntityService<Team> {
    private final TeamRepository teamRepository;

    @Autowired
    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    @Override
    public void add(Team entity) {
        teamRepository.save(entity);
    }

    @Override
    public void addAll(List<Team> entities) {
        teamRepository.saveAll(entities);
    }

    @Override
    public void remove(UUID id) {
        teamRepository.findById(id).ifPresent(team -> {
            team.getTasks().clear();
            teamRepository.delete(team);
        });
    }

    public Optional<Team> getIfLeader(UUID id, Principal principal) {
        return teamRepository.findById(id).filter(team -> team.getLeader().getUsername().equals(principal.getName()));
    }

    private Optional<Task> getFrom(UUID teamId, UUID taskId, Principal principal,
                                   BiFunction<UUID, Principal, Optional<Team>> from) {
        return from.apply(teamId, principal)
                .flatMap(team -> team.getTasks().stream()
                        .filter(task -> task.getId().equals(taskId))
                        .findAny());
    }

    public Optional<Task> getIfMember(UUID teamId, UUID taskId, Principal principal) {
        return getFrom(teamId, taskId, principal, this::getIfMember);
    }

    public Optional<Task> getIfLeader(UUID teamId, UUID taskId, Principal principal) {
        return getFrom(teamId, taskId, principal, this::getIfLeader);
    }

    public Optional<Team> getIfMember(UUID id, Principal principal) {
        return teamRepository.findById(id).filter(team -> team.getMembersWithLeader().stream()
                .map(User::getUsername)
                .anyMatch(username -> username.equals(principal.getName()))
        );
    }

    public Optional<Team> get(UUID id) {
        return teamRepository.findById(id);
    }

    @Override
    public void update(Team entity) {
        teamRepository.save(entity);
    }
}

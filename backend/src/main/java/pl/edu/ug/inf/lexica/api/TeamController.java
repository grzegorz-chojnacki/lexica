package pl.edu.ug.inf.lexica.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.inf.lexica.domain.Team;
import pl.edu.ug.inf.lexica.service.EntityService;

import java.util.List;

@RestController
public class TeamController {
    private final EntityService<Team> teamService;

    @Autowired
    public TeamController(EntityService<Team> teamService) {
        this.teamService = teamService;
    }

    @GetMapping("/team")
    public List<Team> getTeams() {
        return teamService.getAll();
    }

    @PostMapping("/team")
    public Team addTeam(@RequestBody Team newTeam) {
        Team team = new Team().patch(newTeam);
        teamService.add(team);
        return team;
    }

    @PutMapping("/team/{id}")
    public Team updateTeam(@RequestBody Team newTeam, @PathVariable String id) {
        return teamService.replace(id, newTeam);
    }

    @DeleteMapping("/team/{id}")
    public void deleteTeam(@PathVariable String id) {
        teamService.remove(id);
    }
}

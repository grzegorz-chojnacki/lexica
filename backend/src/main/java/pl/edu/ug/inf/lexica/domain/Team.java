package pl.edu.ug.inf.lexica.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @ManyToOne
    private User leader;

    @ManyToMany
    private List<User> members;

    // ToDo: @OneToMany
    @ManyToMany(cascade = CascadeType.ALL)
    private List<Task> tasks;

    private String description;

    public Team withSomeInfo() {
        Team team = new Team();

        team.setId(this.id);
        team.setName(this.name);
        team.setLeader(this.leader.withSomeInfo());
        team.setDescription(this.description);

        return team;
    }

    public Team withMoreInfo() {
        Team team = new Team();

        team.setId(this.id);
        team.setName(this.name);
        team.setLeader(this.leader.withMoreInfo());
        team.setDescription(this.description);

        List<Task> tasks = this.tasks.stream()
                .map(Task::withSomeInfo)
                .collect(Collectors.toList());
        team.setTasks(tasks);

        List<User> members = this.members.stream()
                .map(User::withMoreInfo)
                .collect(Collectors.toList());
        team.setMembers(members);

        return team;
    }
}

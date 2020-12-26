package pl.edu.ug.inf.lexica.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
public class Team {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @NonNull
    private String name;

    @NonNull
    @ManyToOne
    private User leader;

    @ManyToMany
    private List<User> members = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    private List<Task> tasks = new ArrayList<>();

    @NonNull
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

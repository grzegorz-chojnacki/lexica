package pl.edu.ug.inf.lexica.domain;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.*;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode(exclude="members")
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
    private Set<User> members = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL)
    private List<Task> tasks = new ArrayList<>();

    @NonNull
    private String description;

    public boolean hasLeaderWithoutMembership(User user) {
        return leader.equals(user) && !members.contains(user);
    }

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

        Set<User> members = this.members.stream()
                .map(User::withMoreInfo)
                .collect(Collectors.toSet());
        team.setMembers(members);

        return team;
    }
}

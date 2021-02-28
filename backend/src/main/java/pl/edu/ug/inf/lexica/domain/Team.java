package pl.edu.ug.inf.lexica.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode
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
    @JsonIgnoreProperties(value = "progress")
    private User leader;

    @ManyToMany
    @EqualsAndHashCode.Exclude
    private Set<User> members = new HashSet<>();

    @JsonIgnoreProperties(value = "examples")
    @OneToMany(cascade = { CascadeType.ALL, CascadeType.REMOVE })
    private List<Task> tasks = new ArrayList<>();

    @NonNull
    private String description;

    @NonNull
    private String color;

    public Set<User> getMembersWithLeader() {
        return Stream.concat(members.stream(), Stream.of(leader)).collect(Collectors.toSet());
    }

    public Team withSomeInfo() {
        Team team = new Team();

        team.setId(this.id);
        team.setName(this.name);
        team.setLeader(this.leader);
        team.setDescription(this.description);
        team.setColor(this.color);

        return team;
    }

    public Team withMoreInfo() {
        Team team = this.withSomeInfo();
        Collections.reverse(this.tasks);
        team.setTasks(this.tasks);

        Set<User> members = this.members.stream()
                .map(user -> user.withTeamProgress(this))
                .collect(Collectors.toSet());
        team.setMembers(members);

        return team;
    }
}

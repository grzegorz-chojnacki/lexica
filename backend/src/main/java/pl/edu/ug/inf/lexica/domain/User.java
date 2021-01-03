package pl.edu.ug.inf.lexica.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode
@Entity
@Table(name = "lexicauser")
public class User {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @NonNull
    private String firstname;

    @NonNull
    private String surname;

    @NonNull
    private String email;

    @NonNull
    @JsonIgnore
    private String password;

    @ManyToMany(mappedBy = "members")
    @JsonIgnore
    @EqualsAndHashCode.Exclude
    public Set<Team> teams;

    @JsonIgnore
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "leader")
    public Set<Team> leading;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Progress> progress = new HashSet<>();

    public User withSomeInfo() {
        User user = new User();

        user.setId(this.id);
        user.setFirstname(this.firstname);
        user.setSurname(this.surname);
        user.setEmail(this.email);

        return user;
    }

    public User withProgress() {
        User user = this.withSomeInfo();
        user.setProgress(progress);

        return user;
    }

    public User withTeamProgress(Team team) {
        User user = this.withSomeInfo();

        Set<Progress> progress = this.progress.stream()
                .filter(p -> team.getTasks().contains(p.getTask()))
                .collect(Collectors.toSet());
        user.setProgress(progress);

        return user;
    }

    public Set<Progress> getProgressInTeam(Team team) {
        Set<UUID> teamTaskIds = team.getTasks().stream().map(Task::getId).collect(Collectors.toSet());
        return progress.stream()
                .filter(progress -> teamTaskIds.contains(progress.getTask().getId()))
                .collect(Collectors.toSet());
    }
}

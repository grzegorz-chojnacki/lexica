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

    @OneToMany(mappedBy = "leader")
    @JsonIgnore
    @EqualsAndHashCode.Exclude
    public Set<Team> leading;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Progress> progress = new HashSet<>();

    public User withSomeInfo() {
        User user = new User();

        user.setId(this.id);
        user.setFirstname(this.firstname);
        user.setSurname(this.surname);

        return user;
    }

    public User withMoreInfo() {
        User user = new User();

        user.setId(this.id);
        user.setFirstname(this.firstname);
        user.setEmail(this.email);
        user.setSurname(this.surname);

        Set<Progress> progress = this.progress.stream()
                .map(Progress::withSomeInfo)
                .collect(Collectors.toSet());
        user.setProgress(progress);

        return user;
    }
}

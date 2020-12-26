package pl.edu.ug.inf.lexica.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    public List<Team> teams;

    @OneToMany(mappedBy = "leader")
    @JsonIgnore
    public List<Team> leading;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Progress> progress = new ArrayList<>();

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

        List<Progress> progress = this.progress.stream()
                .map(Progress::withSomeInfo)
                .collect(Collectors.toList());
        user.setProgress(progress);

        return user;
    }
}

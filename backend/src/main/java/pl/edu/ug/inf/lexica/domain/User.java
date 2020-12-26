package pl.edu.ug.inf.lexica.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "lexicauser")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NonNull
    private String firstname;

    @NonNull
    private String surname;

    @NonNull
    private String email;

    @NonNull
    private String password;

    @ManyToMany(mappedBy = "members")
    public List<Team> teams = new ArrayList<>();

    @OneToMany(mappedBy = "leader")
    public List<Team> leading = new ArrayList<>();

    // ToDo: @OneToMany
    @ManyToMany(cascade = CascadeType.ALL)
    @LazyCollection(LazyCollectionOption.FALSE)
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

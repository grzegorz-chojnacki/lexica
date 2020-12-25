package pl.edu.ug.inf.lexica.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@Entity
@Table(name = "lexicauser")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String firstname;

    private String surname;

    private String email;

    private String password;

    @ManyToMany(mappedBy = "members")
    public List<Team> teams;

    @OneToMany(mappedBy = "leader")
    public List<Team> leading;

    // ToDo: @OneToMany
    @ManyToMany(cascade = CascadeType.ALL)
    private List<Progress> progress;

    public User(int id, String firstname, String surname, String email, String password, List<Progress> progress) {
        this.id = id;
        this.firstname = firstname;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.progress = progress;
    }


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
        user.setSurname(this.surname);

        List<Progress> progress = this.progress.stream()
                .map(Progress::withSomeInfo)
                .collect(Collectors.toList());
        user.setProgress(progress);

        return user;
    }
}

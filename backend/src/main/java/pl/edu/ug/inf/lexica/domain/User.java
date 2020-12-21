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
@Table(name = "lexicauser")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String firstname;

    private String surname;

    private String email;

    private String password;

    // ToDo: @OneToMany
    @ManyToMany(cascade = CascadeType.ALL)
    private List<Progress> progress;

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

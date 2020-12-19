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
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String firstname;

    private String surname;

    private String email;

    private String password;

    @OneToMany(mappedBy = "id")
    private List<Progress> progress;

    public User withPlainInfo() {
        User plainUser = new User();

        plainUser.setId(this.getId());
        plainUser.setFirstname(this.firstname);
        plainUser.setSurname(this.surname);

        return plainUser;
    }

    public User withSomeInfo() {
        User plainUser = new User();
        List<Progress> plainProgress = this.progress.stream()
                .map(Progress::withPlainInfo)
                .collect(Collectors.toList());

        plainUser.setId(this.getId());
        plainUser.setFirstname(this.firstname);
        plainUser.setSurname(this.surname);
        plainUser.setProgress(plainProgress);

        return plainUser;
    }

}

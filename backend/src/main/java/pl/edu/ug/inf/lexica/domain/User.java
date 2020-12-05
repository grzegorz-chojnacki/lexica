package pl.edu.ug.inf.lexica.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class User extends Entity<User> {
    private String firstname;
    private String surname;
    private String email;
    private String password;
    private List<Progress> progresses;

    public User withPlainInfo() {
        User plainUser = new User();

        plainUser.setId(this.getId());
        plainUser.setFirstname(this.firstname);
        plainUser.setSurname(this.surname);

        return plainUser;
    }

    public User withSomeInfo() {
        User plainUser = new User();
        List<Progress> plainProgresses = this.progresses.stream()
                .map(Progress::withPlainInfo)
                .collect(Collectors.toList());

        plainUser.setId(this.getId());
        plainUser.setFirstname(this.firstname);
        plainUser.setSurname(this.surname);
        plainUser.setProgresses(plainProgresses);

        return plainUser;
    }

    @Override
    public User patch(User that) {
        this.firstname = that.getFirstname();
        this.surname = that.getSurname();
        this.email = that.getEmail();
        this.password = that.getPassword();
        this.progresses = that.getProgresses();
        return this;
    }
}

package pl.edu.ug.inf.lexica.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class User extends Entity<User> {
    private String firstname;
    private String surname;
    private String email;
    private String password;
    private List<Progress<SimpleCard>> progresses;

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

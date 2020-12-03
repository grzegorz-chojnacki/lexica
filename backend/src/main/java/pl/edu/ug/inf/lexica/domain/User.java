package pl.edu.ug.inf.lexica.domain;


import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class User extends Identifiable<User> {
    private String firstname;
    private String surname;
    private String email;
    private String password;

    private List<String> progressIds;

    @Override
    public User patch(User that) {
        this.firstname = that.getFirstname();
        this.surname = that.getSurname();
        this.email = that.getEmail();
        this.password = that.getPassword();
        return this;
    }
}

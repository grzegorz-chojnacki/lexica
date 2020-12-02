package pl.edu.ug.inf.lexica.domain;


import lombok.Data;

import java.util.List;

@Data
public class User extends Identifiable{

    private String firstname;
    private String surname;
    private String email;
    private String password;

    private List<String> progressIds;
}

package pl.edu.ug.inf.lexica.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class UserTest {
    private User user;

    @BeforeEach
    void setup() {
        user = new User("Anna", "Nowak", "anowak", "jxodRBo", "#8FBE8D");
        user.setId(UUID.fromString("c81d4e2e-bcf2-11e6-869b-7df92533d2db"));
    }

    @Test
    void getId() {
        assertThat(user.getId().equals(UUID.fromString("c81d4e2e-bcf2-11e6-869b-7df92533d2db")));
    }

    @Test
    void getFirstname() {
        assertThat(user.getFirstname().equals("Anna"));
    }

    @Test
    void getSurname() {
        assertThat(user.getSurname().equals("Nowak"));
    }

    @Test
    void getUsername() {
        assertThat(user.getUsername().equals("anowak"));
    }

    @Test
    void getPassword() {
        assertThat(user.getPassword().equals("jxodRBo"));
    }

    @Test
    void getColor() {
        assertThat(user.getColor().equals("#8FBE8D"));
    }
}
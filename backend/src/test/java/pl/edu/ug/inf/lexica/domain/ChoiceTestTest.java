package pl.edu.ug.inf.lexica.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Set;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class ChoiceTestTest {
    private ChoiceTest choiceTest;

    @BeforeEach
    void setup() {
        choiceTest = new ChoiceTest("Question?", "Answer", Set.of("ans1", "ans2"));
        choiceTest.setId(UUID.fromString("c81d4e2e-bcf2-11e6-869b-7df92533d2db"));
    }

    @Test
    void getId() {
        assertThat(choiceTest.getId().equals(UUID.fromString("c81d4e2e-bcf2-11e6-869b-7df92533d2db")));
    }

    @Test
    void getQuestion() {
        assertThat(choiceTest.getQuestion().equals("Question?"));
    }

    @Test
    void getAnswer() {
        assertThat(choiceTest.getAnswer().equals("Answer"));
    }

    @Test
    void getDecoys() {
        assertThat(choiceTest.getDecoys().equals(Set.of("ans1", "ans2")));
    }

    @Test
    void getDecoysSize() {
        assertThat(choiceTest.getDecoys().size() == 2);
    }

    @Test
    void setId() {
        choiceTest.setId(UUID.fromString("123e4567-e89b-12d3-a456-426614174000"));
        assertThat(choiceTest.getId().equals(UUID.fromString("123e4567-e89b-12d3-a456-426614174000")));
    }

    @Test
    void shouldNotSetId() {
        assertThrows(IllegalArgumentException.class, () -> choiceTest.setId(UUID.fromString("abc")));
    }

    @Test
    void setQuestion() {
        choiceTest.setQuestion("Queston2?");
        assertThat(choiceTest.getQuestion().equals("Question2?"));
    }

    @Test
    void setAnswer() {
        choiceTest.setAnswer("Answer2");
        assertThat(choiceTest.getAnswer().equals("Answer2"));
    }

    @Test
    void shouldNetNullDecoys() {

        assertThrows(NullPointerException.class, () -> choiceTest.setDecoys(null));
    }

    @Test
    void setDecoys() {
        choiceTest.setDecoys(Set.of("new decoy"));
        assertThat(choiceTest.getDecoys().equals(Set.of("new decoy")));
    }
}
package pl.edu.ug.inf.lexica.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Set;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class MultiTestTest {
    private MultiTest multiTest;

    @BeforeEach
    void setup() {
        multiTest = new MultiTest("Question?", Set.of("Answer"), Set.of("ans1", "ans2"));
        multiTest.setId(UUID.fromString("c81d4e2e-bcf2-11e6-869b-7df92533d2db"));
    }

    @Test
    void getId() {
        assertThat(multiTest.getId().equals(UUID.fromString("c81d4e2e-bcf2-11e6-869b-7df92533d2db")));
    }

    @Test
    void getQuestion() {
        assertThat(multiTest.getQuestion().equals("Question?"));
    }

    @Test
    void getAnswers() {
        assertThat(multiTest.getAnswers().equals(Set.of("Answer")));
    }

    @Test
    void getAnswersSize() {
        assertThat(multiTest.getAnswers().size() == 1);
    }

    @Test
    void getDecoys() {
        assertThat(multiTest.getDecoys().equals(Set.of("ans1", "ans2")));
    }

    @Test
    void getDecoysSize() {
        assertThat(multiTest.getDecoys().size() == 2);
    }

    @Test
    void setId() {
        multiTest.setId(UUID.fromString("123e4567-e89b-12d3-a456-426614174000"));
        assertThat(multiTest.getId().equals(UUID.fromString("123e4567-e89b-12d3-a456-426614174000")));
    }

    @Test
    void shouldNotSetId() {
        assertThrows(IllegalArgumentException.class, () -> multiTest.setId(UUID.fromString("abc")));
    }

    @Test
    void setQuestion() {
        multiTest.setQuestion("Queston2?");
        assertThat(multiTest.getQuestion().equals("Question2?"));
    }

    @Test
    void setAnswers() {
        multiTest.setAnswers(Set.of("Answer2", "Answer3"));
        assertThat(multiTest.getAnswers().equals(Set.of("Answer2", "Answer3")));
    }

    @Test
    void shouldSetNullAnswers() {

        assertThrows(NullPointerException.class, () -> multiTest.setAnswers(null));
    }

    @Test
    void shouldSetNullDecoys() {

        assertThrows(NullPointerException.class, () -> multiTest.setDecoys(null));
    }

    @Test
    void setDecoys() {
        multiTest.setDecoys(Set.of("new decoy"));
        assertThat(multiTest.getDecoys().equals(Set.of("new decoy")));
    }


}
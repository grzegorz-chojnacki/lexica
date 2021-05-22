package pl.edu.ug.inf.lexica.domain;

import org.junit.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import pl.edu.ug.inf.lexica.service.EntityService;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@RunWith(MockitoJUnitRunner.class)
class SimpleCardTest {
    @Mock
    private SimpleCard simpleCard;
    @InjectMocks
    private EntityService entityService;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @BeforeEach
    void setUp() {
        simpleCard = new SimpleCard("Kwiat", "flower");
        simpleCard.setId(UUID.fromString("c81d4e2e-bcf2-11e6-869b-7df92533d2db"));
    }

    @Test
    void getId() {
        assertThat(simpleCard.getId().equals(UUID.fromString("c81d4e2e-bcf2-11e6-869b-7df92533d2db")));
    }

    @Test
    void getNativeWord() {
        assertThat(simpleCard.getNativeWord().equals("Kwiat"));
    }

    @Test
    void getForeignWord() {
        assertThat(simpleCard.getForeignWord().equals("flower"));
    }

    @Test
    void setId() {
        simpleCard.setId(UUID.fromString("123e4567-e89b-12d3-a456-426614174000"));
        assertThat(simpleCard.getId().equals(UUID.fromString("123e4567-e89b-12d3-a456-426614174000")));
    }

    @Test
    void shouldNotSetId() {
        assertThrows(IllegalArgumentException.class, () -> simpleCard.setId(UUID.fromString("abc")));
    }

    @Test
    void setNativeWord() {
        simpleCard.setNativeWord("Kwiat2");
        assertThat(simpleCard.getNativeWord().equals("Kwiat2"));
    }

    @Test
    void setForeignWord() {
        simpleCard.setForeignWord("flower2");
        assertThat(simpleCard.getForeignWord().equals("flower2"));
    }

}
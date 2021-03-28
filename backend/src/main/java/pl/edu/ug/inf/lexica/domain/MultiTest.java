package pl.edu.ug.inf.lexica.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@RequiredArgsConstructor
@JsonDeserialize(as=MultiTest.class)
public class MultiTest extends Example {
    @JsonIgnore
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @NonNull
    private String question;

    @NonNull
    @ElementCollection(targetClass=String.class)
    private Set<String> answers;

    @NonNull
    @ElementCollection(targetClass=String.class)
    private Set<String> decoys;
}

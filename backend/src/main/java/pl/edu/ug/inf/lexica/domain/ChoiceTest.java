package pl.edu.ug.inf.lexica.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@RequiredArgsConstructor
public class ChoiceTest extends Example {
    @JsonIgnore
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @NonNull
    private String question;

    @NonNull
    private String answer;

    @NonNull
    @ElementCollection(targetClass=String.class)
    private Set<String> decoys;
}

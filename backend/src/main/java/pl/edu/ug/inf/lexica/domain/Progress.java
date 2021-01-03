package pl.edu.ug.inf.lexica.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Data
@RequiredArgsConstructor
@NoArgsConstructor
@Entity
public class Progress {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @JsonIgnore
    private UUID id;

    @NonNull
    @ManyToOne
    @JsonIgnoreProperties(value = {"name", "example", "description", "type", "active", "examples"})
    private Task task;

    @JsonIgnore
    @EqualsAndHashCode.Exclude
    @ManyToOne
    private User user;

    @NonNull
    private int completion;
}

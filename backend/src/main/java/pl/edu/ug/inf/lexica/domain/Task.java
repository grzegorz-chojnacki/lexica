package pl.edu.ug.inf.lexica.domain;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
public class Task {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @NonNull
    private String name;

    @NonNull
    @OneToMany(cascade = CascadeType.ALL)
    private List<Example> examples; //tu będzie musiało być List<Example>

    @NonNull
    private boolean isActive;

    @NonNull
    private String description;

    @NonNull
    @ManyToOne
    private TaskType type;
}
